import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as shopAPI from '../api/adminAPI';

const useCartStore = create((set, get) => ({
  shopItems: [], // 상점 상품 데이터
  cartItems: [], // 장바구니 데이터
  cartId: null,
  

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
        const { cartItems, shopItems } = get(); // 현재 상태에서 데이터 가져오기
        const targetCartItem = cartItems.find(item => item.cartItemId === cartItemId);
        const targetShopItem = shopItems.find(item => item.itemId === targetCartItem.itemId);

        if (!targetCartItem || !targetShopItem) {
            throw new Error('유효한 장바구니 항목 또는 상품 데이터를 찾을 수 없습니다.');
        }

        // 재고 확인 로직
        if (newQuantity > targetShopItem.itemCount) {
            alert(`재고를 초과할 수 없습니다. 현재 재고: ${targetShopItem.itemCount}`);
            return;
        }

        if (newQuantity < 1) {
            alert('수량은 최소 1개 이상이어야 합니다.');
            return;
        }

        // API 호출
        await cartAPI.updateCartItems(targetCartItem.cartId, [
            { itemId: targetShopItem.itemId, itemCount: newQuantity },
        ]);

        // 상태 업데이트 및 최신 데이터 가져오기
        await get().fetchAllCartItems();
        await get().fetchShopItems(); // 최신 상품 데이터 동기화
    } catch (error) {
        console.error('장바구니 수량 업데이트 실패:', error);
        alert('장바구니 수량 업데이트 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
},
  
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
