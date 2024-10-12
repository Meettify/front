// adminAPI.js

import request from './request/index';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 상품 조회 (GET)
export const getProduct = async (itemId) => {
    try {
        const url = itemId ? `${BASE_URL}/items/${itemId}` : `${BASE_URL}/items`; // 전체 목록일 때는 itemId 없이 호출
        const response = await request.get({
            url
        });
        return response.data;
    } catch (error) {
        console.error('상품 조회 중 오류 발생:', error);
        throw error;
    }
};


// 나머지 API 요청 함수는 동일
export const createProduct = async (productData) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/items`,
            data: productData
        });
        return response.data;
    } catch (error) {
        console.error('상품 등록 중 오류 발생:', error);
        throw error;
    }
};

export const updateProduct = async (itemId, productData) => {
    try {
        const response = await request.put({
            url: `${BASE_URL}/items/${itemId}`,
            data: productData
        });
        return response.data;
    } catch (error) {
        console.error('상품 수정 중 오류 발생:', error);
        throw error;
    }
};

export const deleteProduct = async (itemId) => {
    try {
        const response = await request.delete({
            url: `${BASE_URL}/items/${itemId}`
        });
        return response.data;
    } catch (error) {
        console.error('상품 삭제 중 오류 발생:', error);
        throw error;
    }
};

