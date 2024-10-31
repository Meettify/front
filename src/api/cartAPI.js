import request from './request'; // Axios 인스턴스

const BASE_URL = '/carts';

// **장바구니에 상품 추가 (POST)**
export const addItemToCart = async (itemId, itemCount = 1) => {
    try {
        const response = await request.post(BASE_URL, { itemId, itemCount });
        return response.data;
    } catch (error) {
        console.error('장바구니에 상품 추가 중 오류:', error);
        throw error;
    }
};

// **장바구니 조회 (GET)**
export const getCartItems = async () => {
    try {
        const response = await request.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('장바구니 조회 중 오류:', error);
        throw error;
    }
};

// **장바구니 상품 삭제 (DELETE)**
export const removeCartItem = async (cartItemId) => {
    try {
        const response = await request.delete(`${BASE_URL}/${cartItemId}`);
        return response.data;
    } catch (error) {
        console.error('장바구니 상품 삭제 중 오류:', error);
        throw error;
    }
};
