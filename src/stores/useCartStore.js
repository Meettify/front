import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as shopAPI from '../api/adminAPI';

const useCartStore = create((set, get) => ({
  shopItems: [], // 상점 상품 데이터
  cartItems: [], // 장바구니 데이터
  

  // **상점 상품 로드**
  fetchShopItems: async () => {
    try {
      const items = await shopAPI.getItemList();
      const confirmedItems = items.filter(item => item.itemStatus === 'SELL');
      set({ shopItems: confirmedItems });
    } catch (error) {
      console.error('상품 데이터 로드 실패:', error);
    }
  },

  fetchCartById: async (cartId) => {
    try {
      const cartData = await cartAPI.getCartById(cartId);
      console.log('개별 장바구니 데이터:', cartData);
  
      // cartItems 데이터 검증 및 매핑
      set({
        cartItems: (cartData.cartItems || []).map(item => ({
          cartItemId: item.cartItemId || null,
          itemId: item.item?.itemId || null,  // item 내부에 중첩된 itemId
          quantity: item.itemCount || 0,      // 기본값 0
          cartId: cartData.cartId || null,    // cartId를 개별 항목에 추가
        })),
      });
  
      console.log('매핑된 cartItems:', get().cartItems);
    } catch (error) {
      console.error('개별 장바구니 조회 실패:', error);
    }
  },
  

  // **전체 장바구니 상품 조회**
  fetchAllCartItems: async () => {
    try {
      const cartData = await cartAPI.getCartItems();
      console.log('전체 장바구니 데이터:', cartData);

      set({
        cartItems: cartData.map(item => ({
          cartItemId: item.cartItemId || null,
          itemId: item.item?.itemId || null,
          quantity: item.itemCount || 0,
          cartId: item.cart?.cartId || null,
        })),
      });
    } catch (error) {
      console.error('장바구니 데이터 로드 실패:', error);
    }
  },

  // **장바구니에 상품 추가**
  addToCart: async (itemId, quantity = 1) => {
    try {
      await cartAPI.addItemToCart(itemId, quantity);
      await get().fetchAllCartItems(); // 최신 장바구니 데이터 로드
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  },

  updateCartItemQuantity: async (cartItemId, newQuantity) => {
    try {
        const { cartItems } = get();
        const targetItem = cartItems.find(item => item.cartItemId === cartItemId);

        if (!targetItem) {
            throw new Error('유효한 장바구니 항목을 찾을 수 없습니다.');
        }

        const updatedItems = cartItems.map(item =>
            item.cartItemId === cartItemId
                ? { ...item, quantity: newQuantity }  // 수량만 수정
                : item
        );

        // API 호출
        const response = await cartAPI.updateCartItems(targetItem.cartId, updatedItems);
        set({
            cartItems: updatedItems,  // 수정된 항목으로 상태 업데이트
        });

    } catch (error) {
        console.error('장바구니 수량 수정 실패:', error);
    }
},
  
  // **장바구니에서 상품 제거**
  removeFromCart: async (cartItemId) => {
    try {
      await cartAPI.removeCartItem(cartItemId);
      set(state => ({
        cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId),
      }));
    } catch (error) {
      console.error('장바구니 상품 제거 실패:', error);
    }
  },

  // **상품 즐겨찾기 확인**
  isFavorite: (itemId) => {
    const { cartItems } = get();
    return cartItems.some(item => item.itemId === itemId);
  },
}));

export default useCartStore;
