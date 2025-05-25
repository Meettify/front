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

// **상품 목록 조회 (GET)** - 무한 스크롤 방식
export const getItemList = async ({
  lastItemId = null,
  size = 12,
  sort = "itemId,DESC",
  title,
  minPrice = 0,
  maxPrice = 0,
  category,
  status = "SELL", // ✅ 기본값 SELL로 명시
}) => {
  try {
    const params = {
      size,
      sort,
      status, // ✅ 항상 status=SELL 포함
    };

    // 조건이 있을 경우에만 파라미터에 추가
    if (lastItemId !== null) params.lastItemId = lastItemId;
    if (title) params.title = title;
    if (minPrice > 0) params.minPrice = minPrice;
    if (maxPrice > 0) params.maxPrice = maxPrice;
    if (category && category !== "all") params.category = category;

    const response = await request.get({
      url: `${BASE_URL}/search`,
      params,
    });

    return response.data;
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);
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

  // **대기 중인 상품 목록 조회 (GET)** - 무한 스크롤 방식
export const getPendingItems = async (lastItemId, size, sort) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/item-list`,
      params: { size, sort },
    });
      
    
    if (lastItemId !== null) {
        params.lastItemId = lastItemId;
      }

  return {
    items: response.data.items,
    hasNextPage: response.data.hasNextPage,
  };
  } catch (error) {
    console.error('대기 중인 상품 목록 조회 중 오류 발생:', error);
    throw error;
  }
};



// 상품 수정
export const updateItem = async (itemId, itemData, remainImgId = [], files = []) => {
  try {
    if (parseInt(itemData.itemCount, 10) <= 0) {
      throw new Error("상품 수량은 1개 이상이어야 합니다.");
    }

    const formData = new FormData();
    const itemBlob = new Blob([JSON.stringify(itemData)], { type: "application/json" });
    formData.append("item", itemBlob);

    // ✅ 이미지 ID는 반드시 반복문으로 추가
    console.log("remainImgId : ", re)
    remainImgId.forEach((id) => formData.append("remainImgId", id));

    // ✅ 새 파일이 있을 때만 추가
    if (files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    console.log("FormData 내용:", Array.from(formData.entries())); // 디버깅

    const response = await request.put({
      url: `${BASE_URL}/${itemId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error.response?.data || error.message);
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

// 상품 TOP 10 조회
export const getTopItems = async () => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/top`
    });
        // 로그로 실제 응답 확인
    console.log("TOP 아이템 응답 데이터:", response.data);

    // items가 없으면 빈 배열 반환
    return Array.isArray(response.data.items) ? response.data.items : [];
  } catch (error) {
    console.error("상품 TOP 10 조회중 오류 발생 : ", error)
    throw error;
    }
  }