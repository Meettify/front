import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as adminAPI from '../api/adminAPI';
import { createTempOrder } from '../api/orderAPI';

const useOrderStore = create((set) => ({
  orderData: null, // 현재 주문 데이터를 저장합니다.
  
  setOrderData: (data) => set({ orderData: data }), // 주문 데이터를 설정합니다.

  clearOrderData: () => set({ orderData: null }), // 주문 데이터를 초기화합니다.

  fetchAndSetOrderData: async (memberId) => {
    try {
      if (!memberId) {
        throw new Error('회원 ID가 필요합니다.');
      }

      // 장바구니 데이터 가져오기
      const cartItems = await cartAPI.getCartItems();

      if (!cartItems || cartItems.length === 0) {
        throw new Error('장바구니가 비어 있습니다.');
      }

      // 유효한 주문 항목으로 변환
      const orders = cartItems
        .map((item) => ({
          itemId: item.item?.itemId,
          itemCount: item.itemCount || 1,
          itemName: item.item?.itemName || '상품명 없음',
        }))
        .filter((order) => order.itemId);

      if (orders.length === 0) {
        throw new Error('유효한 상품이 없습니다.');
      }

      // 임시 주문 생성
      const tempOrder = await createTempOrder(memberId);

      set({
        orderData: {
          tempOrder,
          orders,
        },
      });

      console.log("useOrderStore_orderData: ", orderData);
      return tempOrder;
    } catch (error) {
      console.error('주문 데이터 가져오기 중 오류:', error);
      throw error;
    }
  },
}));

export default useOrderStore;
