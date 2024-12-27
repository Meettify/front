import request from './request';

const BASE_URL = '/items'; // 상품 관련 공통 경로

export const createItem = async (itemName, itemPrice, itemDetails, itemCount, itemCategory, files = []) => {
  const itemStatus = 'WAIT'; 
  try {
      const formData = new FormData();
      const itemData = JSON.stringify({
          itemName,
          itemPrice,
          itemDetails,
          itemStatus,
          itemCount: parseInt(itemCount, 10),
          itemCategory
      });

      console.log('JSON으로 변환된 itemData:', itemData);
      formData.append('item', new Blob([itemData], { type: 'application/json' }));

      if (Array.isArray(files) && files.length > 0) {
          files.forEach((file, index) => {
              console.log(`FormData에 추가된 파일 [${index}]:`, file);
              formData.append('files', file);
          });
      }

      console.log('FormData 내용:', Array.from(formData.entries()));

      const response = await request.post({
          url: '/items',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('서버 응답:', response.data);
      return response.data;
  } catch (error) {
      console.error('상품 등록 중 오류 발생:', error.response?.data || error.message);
      console.error('에러 응답:', error.response);
      throw error;
  }
};

// **상품 목록 조회 (GET)**
export const getItemList = async (page = 1, size = 10, sort = 'desc') => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/search`,
            params: { page, size, sort },
        });
        return response.data.items;
    } catch (error) {
        console.error('상품 목록 조회 중 오류 발생:', error);
        throw error;
    }
};

export const getItemDetail = async (itemId) => {
  try {
      console.log(`Fetching item detail for ID: ${itemId}`); // 디버깅용 로그: itemId 확인
      if (!itemId) {
          console.error('아이템 ID가 전달되지 않았습니다.'); // itemId가 없을 경우 경고
          return;
      }

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


// 상품 상태 변경 (컨펌)
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
  export const getPendingItems = async (page = 0, size = 10, sort = []) => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/item-list`,
        params: { page, size, sort },
      });
      // 'wait' 상태의 상품만 필터링하여 반환
      return response.data.items.filter(item => item.itemStatus === 'WAIT');
    } catch (error) {
      console.error('대기 중인 상품 목록 조회 중 오류 발생:', error);
      throw error;
    }
  };
  
  export const updateItem = async (itemId, itemData, remainImgId = [], files = []) => {
    try {
        // 재고 수량(itemCount) 검증: 0 이하일 경우 오류 발생
        if (parseInt(itemData.itemCount, 10) <= 0) {
            throw new Error('상품 수량은 1개 이상이어야 합니다.');
        }

        const formData = new FormData();

        // 상품 데이터를 JSON Blob으로 추가
        const itemBlob = new Blob([JSON.stringify(itemData)], { type: 'application/json' });
        formData.append('item', itemBlob);

        // 기존 이미지 ID 추가
        remainImgId.forEach((id) => formData.append('remainImgId', id));

        // 파일 추가
        if (files.length > 0) {
            files.forEach((file) => formData.append('files', file));
        } else {
            formData.append('files', new Blob([]));
        }

        console.log('FormData 내용:', Array.from(formData.entries())); // 디버깅용 로그

        const response = await request.put({
            url: `${BASE_URL}/${itemId}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('상품 수정 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};
  
  // **상품 삭제 (DELETE)**
  export const deleteItem = async (itemId) => {
    try {
      console.log(`상품 삭제 요청 시작: ${BASE_URL}/${itemId}`);
  
      const response = await request.del({
        url: `${BASE_URL}/${itemId}`,
      });
  
      console.log('상품 삭제 완료:', response.data);
      return response.data;
    } catch (error) {
      console.error('상품 삭제 중 오류 발생:', error.response?.data || error.message);
      throw error;
    }
  };

  // 상품 목록 검색 및 정렬 API
  export const searchItems = async (page = 1, size = 10, sort = 'desc', searchQuery = '') => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/search`,
            params: { page, size, sort, searchTitle: searchQuery },
        });
        return response.data.items;
    } catch (error) {
        console.error('상품 목록 검색 중 오류 발생:', error);
        throw error;
    }
  };