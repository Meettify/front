import request from './request';

const BASE_URL = '/items'; // 공통 경로

// 상품 등록 함수
export const createItem = async (itemName, itemPrice, itemDetails, itemStatus, itemCount, itemCategory, files = []) => {
  try {
    const formData = new FormData();
    const itemData = JSON.stringify({ itemName, itemPrice, itemDetails, itemStatus, itemCount, itemCategory });
    formData.append('item', new Blob([itemData], { type: 'application/json' }));

    // 파일이 있을 경우 처리
    if (files.length > 0) {
      files.forEach(file => formData.append('files', file));
    } else {
      formData.append('files', new Blob([]));
    }

    console.log('FormData 내용:', Array.from(formData.entries())); // 디버깅용 로그

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