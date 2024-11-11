import request from './request';

const BASE_URL = '/items'; // 상품 관련 공통 경로

export const createItem = async (itemName, itemPrice, itemDetails, itemCount, itemCategory, files = []) => {
    const itemStatus = 'wait'; // 기본 상태를 'wait'으로 설정
    try {
        const formData = new FormData();
        const itemData = JSON.stringify({ itemName, itemPrice, itemDetails, itemStatus, itemCount, itemCategory });
        formData.append('item', new Blob([itemData], { type: 'application/json' }));
        
        // 파일 처리
        files.forEach(file => formData.append('files', file));
        
        const response = await request.post({
            url: `${BASE_URL}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        return response.data;
    } catch (error) {
        console.error('상품 등록 중 오류 발생:', error.response?.data || error.message);
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

// **상품 상태 변경 (GET)**
export const confirmItem = async (itemId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/confirm/${itemId}`,
        });
        return response.data;
    } catch (error) {
        console.error('상품 상태 변경 중 오류 발생:', error);
        throw error;
    }
};

// **대기 중인 상품 목록 조회 (GET)**
export const getPendingItems = async (page = 0, size = 10, sort = ['']) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/item-list`,
            params: { page, size, sort },
        });
        // 'wait' 상태의 상품만 필터링하여 반환
        return response.data.items.filter(item => item.itemStatus === 'wait');
    } catch (error) {
        console.error('대기 중인 상품 목록 조회 중 오류 발생:', error);
        throw error;
    }
};

// **상품 수정 (PUT)**
export const updateItem = async (itemId, itemData, remainImgId = [], files = []) => {
    try {
        const requestBody = new FormData();
        
        // 상품 데이터를 JSON Blob으로 추가
        const itemBlob = new Blob([JSON.stringify(itemData)], { type: 'application/json' });
        requestBody.append('item', itemBlob);

        // 기존 이미지 ID 추가
        remainImgId.forEach((id) => requestBody.append('remainImgId', id));

        // 파일 추가
        files.forEach((file) => requestBody.append('files', file));

        const response = await request.put({
            url: `${BASE_URL}/${itemId}`,
            data: requestBody,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('상품 수정 중 오류 발생:', error);
        throw error;
    }
};

// **상품 삭제 (DELETE)**
export const deleteItem = async (itemId) => {
    try {
        const response = await request.del({
            url: `${BASE_URL}/${itemId}`,
        });
        return response.data;
    } catch (error) {
        console.error('상품 삭제 중 오류 발생:', error);
        throw error;
    }
};