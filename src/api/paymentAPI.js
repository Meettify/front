import request from './request';
import { createTempOrder } from './orderAPI';

const BASE_URL = '/payment';
const TOSS_SECRET_KEY = import.meta.env.VITE_TOSS_SECRET_KEY;

const paymentAPI = {
  tossPayConfirm: async (data) => {
    console.log('Received data:', data);

    // 임시 주문 생성 (주소 데이터도 함께 처리)
    const tempOrder = await createTempOrder(data.orders, data.address); // address를 넘겨줍니다.
    console.log('Temporary Order Created:', tempOrder);

    // 요청 데이터 구조 수정 (스웨거 문서에 맞게)
    const paymentData = {
      orderId: tempOrder.orderId,
      amount: data.amount,
      paymentKey: data.paymentKey,
      requestedAt: data.requestedAt,
      approvedAt: data.approvedAt,
      orderUid: data.orderUid, // 추가된 필드 (예시로 제공된 주문 고유 ID)
      orders: data.orders.map((order) => ({
        itemId: order.itemId,
        itemCount: order.itemCount,
        itemName: order.itemName,
      })),
      address: {
        memberAddr: data.address.memberAddr,
        memberAddrDetail: data.address.memberAddrDetail,
        memberZipCode: data.address.memberZipCode,
      }
    };

    try {
      // 결제 확인 API 호출
      const response = await request.post({
        url: `${BASE_URL}/toss/confirm`,  // URL 수정
        data: paymentData,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${TOSS_SECRET_KEY}`, // Authorization 헤더에 비밀 키 추가
        },
      });

      console.log('Payment Confirmation Response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Toss 결제 확인 API 오류:', error.response?.data || error.message);
      throw error;
    }
  },

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
        return response;
      } catch (error) {
        console.error('Toss 취소 API 오류:', error.response?.data || error.message);
        throw error;
      }
    },
  
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
        return response;
      } catch (error) {
        console.error('Toss 결제 상태 조회 API 오류:', error.response?.data || error.message);
        throw error;
      }
    },
  };
  
export default paymentAPI;
