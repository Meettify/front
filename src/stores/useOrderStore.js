import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';
import * as adminAPI from '../api/adminAPI';
import { createTempOrder } from '../api/orderAPI';  // API 함수 이름 수정

const useOrderStore = create((set, get) => ({
  orderData: null,  // 주문 데이터 상태

  // 주문 생성 함수
  createOrder: async (address = {}) => {
    try {
      console.log("Starting createOrder with address:", address); // 주문 생성 시작 시 address 확인
      const cartItems = await cartAPI.getCartItems();
      console.log("Fetched cart items:", cartItems); // 장바구니 아이템 확인

      if (!cartItems || cartItems.length === 0) {
        throw new Error('장바구니가 비어 있습니다.');
      }

      // 주문 구성
      const orders = await Promise.all(
        cartItems.map(async (item) => {
          if (!item.itemId || !item.itemCount) {
            throw new Error(`아이템 ID 또는 수량이 부족한 항목이 있습니다. itemId: ${item.itemId}, itemCount: ${item.itemCount}`);
          }
          const itemDetail = await adminAPI.getItemDetail(item.itemId);
          console.log("Fetched item details:", itemDetail); // 아이템 상세 정보 확인
          const validCount = Math.min(item.itemCount, itemDetail.itemCount);
          return {
            itemId: item.itemId,
            itemCount: validCount,
            itemPrice: itemDetail.itemPrice,
            itemName: itemDetail.itemName,
          };
        })
      );

      console.log("Processed orders:", orders); // 주문 데이터 확인

      // 주소가 없는 경우 기본값 설정
      if (!address.memberAddr || !address.memberAddrDetail || !address.memberZipCode) {
        const firstCartItem = cartItems[0];
        if (!firstCartItem) {
          throw new Error('장바구니에 아이템이 없습니다. 주소 정보를 입력해주세요.');
        }
        address = {
          memberAddr: firstCartItem?.address || '',
          memberAddrDetail: firstCartItem?.addressDetail || '',
          memberZipCode: firstCartItem?.zipCode || '',
        };
      }
      console.log("Final address for order:", address); // 최종 주소 정보 확인

      // 임시 주문 생성
      const orderResult = await createTempOrder(address);
      console.log("createTempOrder 결과:", orderResult);  // 여기서 반환되는 결과를 확인

      // 상태 업데이트
      console.log("orderData 상태를 다음 값으로 설정:", orderResult);
      set({ orderData: orderResult });

      return orderResult;
    } catch (error) {
      console.error('임시 주문 생성 오류:', error); // 오류 출력
      throw error;
    }
  },

  // 주문 데이터 조회
  fetchOrderData: async (orderId) => {
    try {
      console.log("Fetching order data for orderId:", orderId); // 주문 ID 확인
      const orderData = await cartAPI.getCartById(orderId);
      console.log("Fetched order data:", orderData); // 받은 주문 데이터 확인
      set({ orderData });
      return orderData;
    } catch (error) {
      console.error('주문 데이터 로드 실패:', error); // 오류 출력
      throw error;
    }
  },

}));

export default useOrderStore;
