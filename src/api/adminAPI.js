import request from './request'; // Axios 인스턴스 가져오기

const BASE_URL = '/items'; // 상품 관련 공통 경로

// 상품 생성 (POST)
export const createItem = async (itemData, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('item', new Blob([JSON.stringify(itemData)], { type: 'application/json' }));

        // 파일 추가
        files.forEach(file => {
            requestBody.append('files', file);
        });

        const response = await request.post({
            url: `${BASE_URL}`,
            data: requestBody,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // 성공 시 응답 반환
    } catch (error) {
        console.error('상품 생성 중 오류 발생:', error);
        throw error; // 오류 발생 시 다시 던짐
    }
};

// 전체 상품 조회 (GET)
export const getAllItems = async (page = 1, size = 10) => {
  try {
      const response = await request.get({
          url: `${BASE_URL}`, // 전체 상품 조회 URL
          params: { page, size }, // 페이지와 크기 파라미터
      });
      return response.data; // API에서 받은 데이터를 반환
  } catch (error) {
      console.error('전체 상품 조회 중 오류가 발생했습니다:', error);
      throw error; // 오류 던지기
  }
};

// 상품 상세 조회 (GET)
export const getItemDetail = async (itemId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/${itemId}`,
        });
        return response.data;  // 서버에서 반환된 JSON 데이터를 반환
    } catch (error) {
        console.error('상품 조회 중 오류 발생:', error);
        throw error;  // 에러 처리
    }
};
