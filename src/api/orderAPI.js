import request from './request';

const BASE_URL = '/orders';

export const createTempOrder = async (orders, address) => {
  try {
    const requestBody = {
      orders: orders.map(order => ({
        itemId: order.itemId, // 상품 ID
        itemCount: order.itemCount, // 상품 수량
      })),
      address: {
        memberAddr: address.memberAddr, // 주소
        memberAddrDetail: address.memberAddrDetail, // 상세 주소
        memberZipCode: address.memberZipCode, // 우편번호
      },
    };

    console.log('임시 주문 요청 데이터:', requestBody);

    const response = await request.post({
      url: `${BASE_URL}/tempOrder`, // 임시 주문 엔드포인트
      data: requestBody,
    });

    console.log('임시 주문 생성 완료:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '임시 주문 생성 중 오류 발생:',
      error.response?.data || error.message,
    );
    throw error;
  }
};


// 모든 주문 조회
export const getAllOrders = async (page = 0, size = 10, sort = ['desc']) => {
  try {
    console.log(`모든 주문 조회 요청 - Page: ${page}, Size: ${size}, Sort: ${sort}`);

    const response = await request.get({
      url: `${BASE_URL}`,
      params: { page, size, sort },
    });

    console.log('모든 주문 조회 결과:', response.data);
    return response.data;
  } catch (error) {
    console.error('모든 주문 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 내 주문 조회
export const getMyOrders = async (page = 0, size = 10, sort = ['desc']) => {
  try {
    console.log(`내 주문 조회 요청 - Page: ${page}, Size: ${size}, Sort: ${sort}`);

    const response = await request.get({
      url: `${BASE_URL}/my-order`,
      params: { page, size, sort },
    });

    console.log('내 주문 조회 결과:', response.data);
    return response.data;
  } catch (error) {
    console.error('내 주문 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 모든 주문 수 조회
export const getOrderCount = async () => {
  try {
    console.log('모든 주문 수 조회 요청');

    const response = await request.get({
      url: `${BASE_URL}/count-order`,
    });

    console.log('모든 주문 수:', response.data);
    return response.data;
  } catch (error) {
    console.error('모든 주문 수 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 내 주문 수 조회
export const getMyOrderCount = async () => {
  try {
    console.log('내 주문 수 조회 요청');

    const response = await request.get({
      url: `${BASE_URL}/count-my-order`,
    });

    console.log('내 주문 수:', response.data);
    return response.data;
  } catch (error) {
    console.error('내 주문 수 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};
