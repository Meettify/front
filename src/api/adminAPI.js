import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const createItem = async (itemData) => {
  const response = await request.post({
    url: `${BASE_URL}/items`,
    data: itemData,
  });
  return response.data;
};

// 상품 목록을 1번부터 10번까지 개별적으로 가져오기
const getAllItems = async () => {
  try {
    const itemPromises = []; // 1번부터 10번까지의 상품을 가져오는 Promise 배열

    for (let itemId = 1; itemId <= 10; itemId++) {
      itemPromises.push(request.get({
        url: `${BASE_URL}/items/${itemId}`,
        headers: {
          "Content-Type": "application/json",
        }
      }));
    }

    // 모든 상품 정보를 한꺼번에 가져옴
    const responses = await Promise.all(itemPromises);
    const items = responses.map(response => response.data); // 각 응답에서 data 추출
    return items; // 모든 상품 목록 반환
  } catch (error) {
    console.error('상품 목록 조회 오류:', error);
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const getItemDetail = async (itemId) => {
  const response = await request.get({
    url: `${BASE_URL}/items/${itemId}`,
  });
  return response.data;
};

const updateItem = async (itemId, updatedData) => {
  const response = await request.put({
    url: `${BASE_URL}/items/${itemId}`,
    data: updatedData,
  });
  return response.data;
};

const deleteItem = async (itemId) => {
  const response = await request.del({
    url: `${BASE_URL}/items/${itemId}`,
  });
  return response.data;
};

export default {
  createItem,
  getAllItems, // 1번부터 10번까지 상품 목록 조회 함수
  getItemDetail,
  updateItem,
  deleteItem,
};
