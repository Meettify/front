import request from './request';
import { getCartItems } from './cartAPI';
import { getMember } from './memberAPI';

const BASE_URL = '/orders';  // 주문 관련 API URL

export const createTempOrder = async (memberId) => {
  try {
    // memberId를 사용하여 회원 정보를 가져옵니다.
    const member = await getMember(memberId);
    if (!member) throw new Error('회원 정보를 가져오지 못했습니다.');

    const cartItems = await getCartItems(); // 장바구니 데이터 가져오기
    console.log('장바구니 데이터:', cartItems);

    // cartItems가 배열인지 확인
    if (!Array.isArray(cartItems)) {
      throw new Error('장바구니 데이터가 올바르지 않습니다. 배열이어야 합니다.');
    }

    if (cartItems.length === 0) {
      throw new Error('장바구니에 상품이 없습니다.');
    }

    const orders = cartItems.map((item) => {
      if (!item || !item.item) {
        console.warn('잘못된 item 데이터:', item);
        return null; // 잘못된 데이터는 제외
      }
      
      return {
        itemId: item.item.itemId,  // itemId를 가져옵니다.
        itemCount: item.itemCount || 1,  // 수량
        itemName: item.item.itemName || '상품명 없음',  // itemName을 직접 가져옵니다.
      };
    }).filter(order => order !== null); // 잘못된 데이터 제외
    

    if (orders.length === 0) {
      throw new Error('유효한 주문 항목이 없습니다.');
    }

    const requestBody = {
      orders,
    };

    console.log('임시 주문 생성 요청 데이터:', JSON.stringify(requestBody));
    console.log('임시 주문 orders: ', orders);

    const response = await request.post({
      method: 'POST',
      url: `${BASE_URL}/tempOrder`,
      data: requestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response && response.data) {
      console.log('임시 주문 생성 성공:', response.data);
      
      const orders = response.data.orders || response.data.orderItems || [];
      return {
        orders, // orders를 명확히 반환
        ...response.data, // 추가적으로 필요한 다른 데이터 포함
      };

    } else {
      console.error('임시 주문 생성 실패:', response);
      throw new Error('임시 주문 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('임시 주문 생성 중 오류 발생:', error.message);
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
