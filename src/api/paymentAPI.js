import request from './request';
import { getCartItems } from './cartAPI';
import { getMember } from './memberAPI';
import { createTempOrder } from './orderAPI';

const BASE_URL = '/payment';
const TOSS_SECRET_KEY = import.meta.env.VITE_TOSS_SECRET_KEY;

const paymentAPI = {
  // Toss 결제 확인
  tossPayConfirm: async (data) => {
    console.log('Received data:', data);

    try {
      // 임시 주문 생성
      const tempOrder = await createTempOrder(data.orders, data.address);
      console.log('Temporary Order Created:', tempOrder);

      // Toss 결제 요청 데이터 구성
      const paymentData = {
        orderId: tempOrder.orderId,
        amount: data.amount,
        paymentKey: data.paymentKey,
        requestedAt: data.requestedAt,
        approvedAt: data.approvedAt,
        orderUid: data.orderUid,
        orders: data.orders.map((order) => ({
          itemId: order.itemId,
          itemCount: order.itemCount,
          itemName: order.itemName,
        })),
        address: {
          memberAddr: data.address.memberAddr,
          memberAddrDetail: data.address.memberAddrDetail,
          memberZipCode: data.address.memberZipCode,
        },
      };

      const response = await request.post({
        url: `${BASE_URL}/toss/confirm`,
        data: paymentData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${TOSS_SECRET_KEY}`,
        },
      });

      console.log('Payment Confirmation Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Toss 결제 확인 API 오류:', error.response?.data || error.message);
      throw error;
    }
  },

  // Toss 결제 취소
  tossPayCancel: async (data) => {
    console.log('Toss 취소 API 요청 데이터:', data);

    try {
      const response = await request.post({
        url: `${BASE_URL}/toss/cancel`,
        data: {
          paymentKey: data.paymentKey,
          orderUid: data.orderUid,
          amount: data.amount,
          cancelReason: data.cancelReason,
        },
      });

      console.log('Toss 취소 API 응답 데이터:', response.data);
      return response.data;
    } catch (error) {
      console.error('Toss 취소 API 오류:', error.response?.data || error.message);
      throw error;
    }
  },

  // Toss 결제 상태 조회
  tossPayStatus: async (orderUid) => {
    console.log('Toss 결제 상태 조회 요청:', orderUid);

    try {
      if (!orderUid) {
        throw new Error('주문 ID가 필요합니다.');
      }

      const response = await request.get({
        url: `${BASE_URL}/toss/${orderUid}`,
      });

      if (response.data.code !== 200) {
        throw new Error(`Toss 결제 상태 조회 오류: ${response.data.message}`);
      }

      console.log('Toss 결제 상태 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('Toss 결제 상태 조회 API 오류:', error.response?.data || error.message);
      throw error;
    }
  },

  // 아임포트 결제 확인
  confirmPayment: async (paymentData) => {
    try {
      const response = await request.post(`${BASE_URL}/iamport/confirm`, paymentData);
      return response.data;
    } catch (error) {
      console.error('결제 확인 중 오류 발생:', error);
      throw error;
    }
  },

  // 아임포트 결제 취소
  cancelPayment: async (cancelData) => {
    try {
      const response = await request.post(`${BASE_URL}/iamport/cancel`, cancelData);
      return response.data;
    } catch (error) {
      console.error('결제 취소 중 오류 발생:', error);
      throw error;
    }
  },

  // 아임포트 결제 조회
  getPayment: async (orderUid) => {
    try {
      const response = await request.get(`${BASE_URL}/iamport/${orderUid}`);
      return response.data;
    } catch (error) {
      console.error('결제 조회 중 오류 발생:', error);
      throw error;
    }
  },
};

// 장바구니에서 결제 처리
export const processPayment = async () => {
  try {
    // 1. 장바구니 데이터 가져오기
    const cartItems = await getCartItems();

    // 2. 사용자 정보 가져오기
    const memberData = await getMember();

    // 3. 임시 주문 생성
    const tempOrder = await createTempOrder({
      items: cartItems,
      member: memberData,
    });

    // 4. 결제 데이터 생성
    const paymentData = {
      itemCount: tempOrder.itemCount,
      impUid: '',
      orderUid: tempOrder.orderUid,
      payMethod: 'card',
      payPrice: tempOrder.totalPrice,
      orders: tempOrder.orders,
      address: {
        memberAddr: memberData.address,
        memberAddrDetail: memberData.addressDetail,
        memberZipCode: memberData.zipCode,
      },
    };

    // 5. 결제 진행
    const paymentResult = await paymentAPI.confirmPayment(paymentData);
    console.log('결제 성공:', paymentResult);

    return paymentResult;
  } catch (error) {
    console.error('결제 처리 중 오류 발생:', error);
    throw error;
  }
};

export default paymentAPI;
