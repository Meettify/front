import request from './request';

const BASE_URL = '/carts';

export const getCartId = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/id`,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 전파
  }
};

export const getCartById = async (cartId) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/${cartId}`,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 전파
  }
};

// **장바구니 상품 조회 (GET)**: 전체 장바구니 상품 목록 조회
export const getCartItems = async () => {
    try {
      console.log(`장바구니 상품 조회 요청: ${BASE_URL}/cart-items`);
  
      const response = await request.get({
        url: `${BASE_URL}/cart-items`,
      });
  
      console.log('장바구니 상품 조회 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('장바구니 상품 조회 중 오류 발생:', error.response?.data || error.message);
      throw error;
    }
  };

  export const addItemToCart = async (itemId, itemCount = 1) => {
    try {
        const requestBody = { itemId, itemCount }; // 서버 요구 형식
        console.log('장바구니 추가 요청 데이터:', JSON.stringify(requestBody));

        const response = await request.post({
            url: '/carts',
            data: requestBody,
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('장바구니 추가 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 추가 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};
  
export const updateCartItems = async (cartId, items) => {
  try {
    const updatedItems = items.map(item => ({
      itemId: item.itemId,
      itemCount: item.itemCount, // 서버에서 요구하는 'itemCount'로 변경
    }));

    const response = await request.put({
      url: `${BASE_URL}/${cartId}`, // cartId를 URL에 포함시킴
      data: updatedItems, // 수정된 아이템들 전송
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 전파
  }
};

export const removeCartItem = async (cartItemId) => {
  try {
    const response = await request.del({
      url: `${BASE_URL}/${cartItemId}`,
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    throw error; // 오류 전파
  }
};

