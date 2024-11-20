import request from './request'; // Axios 인스턴스

const BASE_URL = '/carts';

export const addItemToCart = async (memberEmail, itemId, itemCount = 1) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token이 없습니다.');
        }

        const requestData = { memberEmail, itemId, itemCount };
        console.log('장바구니 추가 요청 데이터:', requestData);

        const response = await request.post({
            url: BASE_URL,
            data: requestData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        
        console.log('장바구니에 상품 추가 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니에 상품 추가 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};


// **장바구니 조회 (GET)**
export const getCartById = async (cartId) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken'); // 토큰 가져오기
        if (!accessToken) {
            throw new Error('Access token이 없습니다.');
        }

        console.log('장바구니 조회 요청:', `${BASE_URL}/${cartId}`);

        const response = await request.get(`${BASE_URL}/${cartId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // 인증 토큰 설정
            },
        });
        console.log('장바구니 조회 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 조회 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};

// **장바구니 상품 수정 (PUT)**
export const updateCartItems = async (cartId, items) => {
    try {
        console.log('장바구니 수정 요청 데이터:', { cartId, items });

        const response = await request.put(`${BASE_URL}/${cartId}`, items, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('장바구니 수정 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 상품 수정 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};

// **장바구니 상품 삭제 (DELETE)**
export const removeCartItem = async (cartItemId) => {
    try {
        console.log('장바구니에서 상품 삭제 요청 ID:', cartItemId);

        const response = await request.delete(`${BASE_URL}/${cartItemId}`);
        console.log('장바구니에서 상품 삭제 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('장바구니 상품 삭제 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};
