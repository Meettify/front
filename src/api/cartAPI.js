import request from './request';
import { getItemDetail } from './adminAPI';

const BASE_URL = '/carts';

// 장바구니 ID를 가져오는 함수 (예시)
export const getCartId = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/id`,
    });
    const cartId = response.data; // 응답 데이터에서 cartId 추출
    console.log("장바구니 ID:", cartId);
    return cartId;
  } catch (error) {
    console.error("장바구니 ID를 가져오는 데 실패했습니다.", error);
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
      // getItemDetail을 사용하여 상품의 상세 정보를 가져옴
      const itemDetailResponse = await getItemDetail(itemId); // itemDetailResponse.itemCount는 getItemDetail의 반환값에 따라 달라질 수 있음
      
      const availableStock = itemDetailResponse.itemCount; // 상품의 재고 수량
  
      // 요청한 수량이 재고 수량을 초과할 경우 자동으로 조정
      if (itemCount > availableStock) {
          console.log(`요청한 수량 ${itemCount}개는 재고 수량(${availableStock})을 초과하여 ${availableStock}개로 자동 조정됩니다.`);
          itemCount = availableStock; // 수량을 재고 수량으로 자동 조정
      }
  
      // 장바구니에 상품을 추가할 때, 장바구니 ID를 별도로 지정할 필요가 없음
      const requestBody = { itemId, itemCount }; // 서버 요구 형식
      console.log('장바구니 추가 요청 데이터:', JSON.stringify(requestBody));
  
      const response = await request.post({
          url: `${BASE_URL}`, // 장바구니에 상품을 추가하는 엔드포인트
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
  
  // cartId가 유효하지 않으면 요청을 보내지 않음
  if (!cartId) {
    console.error("장바구니 ID가 유효하지 않습니다.");
    return;
  }

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

    console.log("장바구니 업데이트 성공:", response.data);
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("장바구니 업데이트 실패:", error);
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

