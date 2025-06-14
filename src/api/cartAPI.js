import request from './request';
import { getItemDetail } from './shopAPI';

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
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    const itemDetailResponse = await getItemDetail(itemId);
    const availableStock = itemDetailResponse.itemCount;

    if (itemCount > availableStock) {
      console.warn(`요청한 수량 ${itemCount}개는 재고 수량(${availableStock})을 초과하여 자동 조정됩니다.`);
      itemCount = availableStock;
    }

    const requestBody = { itemId, itemCount };
    console.log("장바구니 추가 요청 데이터:", requestBody);

    const response = await request.post({
      url: `/carts`,
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ 토큰 포함
      },
    });

    console.log("장바구니 추가 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("장바구니 추가 중 오류 발생:", error.response?.data || error.message);
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

