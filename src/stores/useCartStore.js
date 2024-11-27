import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as shopAPI from '../api/adminAPI';

const useCartStore = create((set, get) => ({
    shopItems: [], // ShopPage에서 가져오는 상품 데이터
    cartItems: [], // 장바구니 데이터

    // 상품 데이터 로드
    fetchShopItems: async () => {
        try {
            const items = await shopAPI.getItemList();
            const confirmedItems = items.filter(item => item.itemStatus === 'SELL');
            set({ shopItems: confirmedItems });
        } catch (error) {
            console.error('상품 데이터 로드 실패:', error);
        }
    },

    // 장바구니 데이터 로드
    fetchAllCartItems: async () => {
        try {
            const cartData = await cartAPI.getCartItems();
            set({
                cartItems: cartData.map(item => ({
                    cartItemId: item.cartItemId,
                    itemId: item.item.itemId,
                    quantity: item.itemCount,
                })),
            });
        } catch (error) {
            console.error('장바구니 데이터 로드 실패:', error);
        }
    },

    // 장바구니에 상품 추가
    addToCart: async (itemId, quantity = 1) => {
        try {
            await cartAPI.addItemToCart(itemId, quantity);
            await get().fetchAllCartItems(); // 장바구니 데이터 재로드
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
        }
    },

    updateCartItemQuantity: async (cartItemId, newQuantity) => {
        try {
            const { cartItems } = get();
            const cartId = cartItems.find(item => item.cartItemId === cartItemId)?.cartId; // cartId 가져오기
            if (!cartId) throw new Error('장바구니 ID를 찾을 수 없습니다.');
    
            // 수정 요청 데이터 생성
            const updatedItems = cartItems.map(item => ({
                itemId: item.itemId,
                itemCount: item.cartItemId === cartItemId ? newQuantity : item.quantity,
            }));
    
            await cartAPI.updateCartItems(cartId, updatedItems); // API 호출
            await get().fetchAllCartItems(); // 최신 장바구니 데이터 가져오기
        } catch (error) {
            console.error('수량 업데이트 실패:', error);
        }
    },    

    // 장바구니에서 상품 제거
    removeFromCart: async (cartItemId) => {
        try {
            await cartAPI.removeCartItem(cartItemId);
            set(state => ({
                cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId),
            }));
        } catch (error) {
            console.error('장바구니 제거 실패:', error);
        }
    },

    // 별표 활성 상태 확인
    isFavorite: (itemId) => {
        const { cartItems } = get();
        return cartItems.some(item => item.itemId === itemId);
    },
}));

export default useCartStore;
