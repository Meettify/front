import request from './request'; // Axios 인스턴스 가져오기

const BASE_URL = '/items'; // 상품 관련 공통 경로

// **상품 생성 (POST)**
export const createItem = async (itemData, files = []) => {
    try {
        const requestBody = new FormData();

        // 상품 데이터를 JSON Blob으로 추가
        const itemBlob = new Blob([JSON.stringify(itemData)], { type: 'application/json' });
        requestBody.append('item', itemBlob);

        // 파일 추가
        files.forEach((file) => requestBody.append('files', file));

        const response = await request.post({
            url: BASE_URL,
            data: requestBody,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('상품 생성 중 오류 발생:', error);
        throw error;
    }
};

// **상품 목록 조회 (GET)**
export const getItemList = async (page = 1, size = 10) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/search`,
            params: { page, size },
        });
        return response.data.items;
    } catch (error) {
        console.error('상품 목록 조회 중 오류 발생:', error);
        throw error;
    }
};

// **상품 삭제 (DELETE)**
export const deleteItem = async (itemId) => {
    try {
        const response = await request.delete({
            url: `${BASE_URL}/${itemId}`,
        });
        return response.data;
    } catch (error) {
        console.error('상품 삭제 중 오류 발생:', error);
        throw error;
    }
};

export const getItemDetail = async (itemId) => {
    try {
        console.log(`Fetching item detail for ID: ${itemId}`); // 디버깅용 로그
        const response = await request.get({
            url: `${BASE_URL}/${itemId}`,
        });
        console.log('API Response:', response.data); // 응답 로그
        return response.data;
    } catch (error) {
        console.error('상품 상세 조회 중 오류 발생:', error);
        throw error;
    }
};
