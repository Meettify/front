import request from './request';

const BASE_URL = '/carts';

// **장바구니 조회 (GET)**: 특정 장바구니 ID로 조회
export const getCartById = async (cartId) => {
  try {
    console.log(`장바구니 조회 요청: ${BASE_URL}/${cartId}`);

    const response = await request.get({
      url: `${BASE_URL}/${cartId}`,
    });

    console.log('장바구니 조회 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('장바구니 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
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
  
  // **장바구니 상품 수정 (PUT)**
  export const updateCartItems = async (cartId, items) => {
    try {
      const requestBody = JSON.stringify(items);
      console.log('장바구니 수정 요청 데이터:', requestBody);
  
      const response = await request.put({
        url: `${BASE_URL}/${cartId}`,
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('장바구니 수정 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('장바구니 수정 중 오류 발생:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const removeCartItem = async (cartItemId) => {
    try {
        console.log(`장바구니에서 삭제 요청: /carts/${cartItemId}`);

        const response = await request.del({
            url: `/carts/${cartItemId}`,
        });

        console.log('장바구니 삭제 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 삭제 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};