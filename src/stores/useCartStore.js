import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as shopAPI from '../api/shopAPI';

const useCartStore = create((set, get) => ({
  shopItems: [], // 상점 상품 데이터
  cartItems: [], // 장바구니 데이터
  cartId: null,  // cartId 추가

  // **장바구니 ID 가져오기 및 설정**
  fetchCartId: async () => {
    try {
      const cartId = await cartAPI.getCartId();
      console.log('cartId:', cartId);
      return cartId;
    } catch (error) {
      console.error('장바구니 ID 로드 실패:', error);  // 오류 로그를 추가하여 문제를 파악
      throw error;
    }    
  },

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

  

  // **장바구니 데이터 로드**
  fetchCartById: async (cartId) => {
    try {
      const cartData = await cartAPI.getCartById(cartId);
      console.log('장바구니 데이터:', cartData);
      set({
        cartItems: (cartData.cartItems || []).map(item => ({
          cartItemId: item.cartItemId || null,
          itemId: item.item?.itemId || null,
          itemCount: item.itemCount || 0,  // itemCount 사용
          cartId: cartData.cartId || null,
        })),
      });
    } catch (error) {
      console.error('장바구니 데이터 로드 실패:', error);
    }
  },

  // **장바구니 상품 조회**
  fetchAllCartItems: async () => {
    try {
      const cartData = await cartAPI.getCartItems();
      console.log('전체 장바구니 데이터:', cartData);
      set({
        cartItems: cartData.map(item => ({
          cartItemId: item.cartItemId || null,
          itemId: item.item?.itemId || null,
          itemCount: item.itemCount || 0,  // itemCount 사용
          cartId: item.cart?.cartId || null,
        })),
      });
    } catch (error) {
      console.error('장바구니 상품 조회 실패:', error);
    }
  },

  // **장바구니에 상품 추가**
  addToCart: async (itemId, itemCount = 1) => {
    try {
      await cartAPI.addItemToCart(itemId, itemCount);
      await get().fetchAllCartItems();
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  },

  // **장바구니 아이템 수량 업데이트**
  updateCartItemQuantity: async (cartItemId, newItemCount) => {
    try {
      const { cartItems, shopItems } = get();
      const targetCartItem = cartItems.find(item => item.cartItemId === cartItemId);
      const targetShopItem = shopItems.find(item => item.itemId === targetCartItem.itemId);

      if (!targetCartItem || !targetShopItem) {
        throw new Error('유효한 장바구니 항목 또는 상품 데이터를 찾을 수 없습니다.');
      }

      // 재고 확인
      if (newItemCount > targetShopItem.itemCount) {
        alert(`재고를 초과할 수 없습니다. 현재 재고: ${targetShopItem.itemCount}`);
        return;
      }

      if (newItemCount < 1) {
        alert('수량은 최소 1개 이상이어야 합니다.');
        return;
      }

      // API 호출
      await cartAPI.updateCartItems(targetCartItem.cartId, [
        { itemId: targetShopItem.itemId, itemCount: newItemCount }, // itemCount로 수량 업데이트
      ]);

      await get().fetchAllCartItems();
    } catch (error) {
      console.error('장바구니 수량 업데이트 실패:', error);
      alert('장바구니 수량 업데이트 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  },

  // **장바구니 상품 삭제**
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