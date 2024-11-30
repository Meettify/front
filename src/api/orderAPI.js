import request from './request';

const BASE_URL = '/orders';

// 임시 주문 생성
export const createTempOrder = async (orders, address) => {
  try {
    const requestBody = {
      orders,
      address,
    };

    console.log('임시 주문 요청 데이터:', requestBody);

    const response = await request.post({
      url: `${BASE_URL}/tempOrder`,
      data: requestBody,
    });

    console.log('임시 주문 생성 완료:', response.data);
    return response.data;
  } catch (error) {
    console.error('임시 주문 생성 중 오류 발생:', error.response?.data || error.message);
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
