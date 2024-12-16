import request from './request';
import { getCartItems } from './cartAPI';

const BASE_URL = '/orders';  // 주문 관련 API URL

export const createTempOrder = async (address = {}) => {
  try {
    // 장바구니 상품 조회
    const cartItems = await getCartItems(); // API를 호출하여 장바구니 아이템 가져오기
    console.log("장바구니 상품 데이터:", cartItems);

    if (!cartItems || cartItems.length === 0) {
      throw new Error('장바구니에 상품이 없습니다.');
    }

    const orders = cartItems.map(item => ({
      itemId: item.item?.itemId,
      itemCount: item.itemCount,
      itemName: item.item?.itemName,
    }));

    const requestBody = {
      orders: orders,
      address: {
        memberAddr: address.memberAddr,
        memberAddrDetail: address.memberAddrDetail,
        memberZipCode: address.memberZipCode
      }
    };       
    
    // 4. 디버깅 로그
    console.log('임시 주문 요청 데이터:', JSON.stringify(requestBody));

    // 5. 임시 주문 요청
    const response = await request.post({
      url: `${BASE_URL}/tempOrder`,
      data: requestBody,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.data?.orderId) {
      throw new Error('임시 주문 생성에 실패했습니다.');
    }

    console.log('서버 응답:', response);
    console.log('Request body for temp order:', requestBody);
    console.log('임시 주문 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('임시 주문 생성 오류:', error);
    throw error;
  }
};

// 내 주문 조회
export const getMyOrders = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/my-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('내 주문 조회 오류:', error);
    throw error;
  }
};

// 모든 주문 조회
export const getAllOrders = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('모든 주문 조회 오류:', error);
    throw error;
  }
};

// 내 주문 수 조회
export const getMyOrderCount = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/count-my-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('내 주문 수 조회 오류:', error);
    throw error;
  }
};

// 모든 주문 수 조회
export const getAllOrderCount = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/count-order`,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('모든 주문 수 조회 오류:', error);
    throw error;
  }
};
