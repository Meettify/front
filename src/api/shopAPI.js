import request from "./request"; // request.js에서 Axios 인스턴스 가져오기

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // 환경 변수에서 API 기본 URL 가져오기

// 상품 상세 정보 가져오기
export const fetchItemDetails = async (itemId) => {
    try {
        const response = await request.get(`${BASE_URL}/api/v1/items/${itemId}`);
        return response.data; // 데이터 반환
    } catch (error) {
        console.error("상품 상세 정보를 가져오는 데 오류가 발생했습니다:", error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    }
};

// 상품 목록 가져오기
export const fetchItems = async (page = 1, limit = 10) => {
    try {
        const response = await request.get(`${BASE_URL}/api/v1/items`, {
            params: { page, limit },
        });
        return response.data; // 데이터 반환
    } catch (error) {
        console.error("상품 목록을 가져오는 데 오류가 발생했습니다:", error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록
    }
};
