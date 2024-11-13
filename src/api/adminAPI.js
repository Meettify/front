import request from './request';

const BASE_URL = '/items'; // 상품 관련 공통 경로

// export const createItem = async (itemName, itemPrice, itemDetails, itemCount, itemCategory, files = []) => {
//     const itemStatus = 'WAIT'; // 기본 상태를 대문자 'WAIT'으로 설정
//     try {
//         const formData = new FormData();
//         const itemData = JSON.stringify({ itemName, itemPrice, itemDetails, itemStatus, itemCount, itemCategory });
//         formData.append('item', new Blob([itemData], { type: 'application/json' }));

// // 파일 처리
// if (Array.isArray(files) && files.length > 0) {
//     files.forEach(file => formData.append('files', file));
// } else {
//     formData.append('files', new Blob([]));
// }

//         console.log('FormData 내용:', Array.from(formData.entries())); // 디버깅용 로그

//         const response = await request.post({
//             url: `${BASE_URL}`,
//             data: formData,
//             headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         return response.data;
//     } catch (error) {
//         console.error('상품 등록 중 오류 발생:', error.response?.data || error.message);
//         throw error;
//     }
// };

// export const createItem = async (itemName, itemPrice, itemDetails, itemCount, itemCategory) => {
//   const itemStatus = 'WAIT'; // 기본 상태 설정
//   const itemData = { itemName, itemPrice, itemDetails, itemStatus, itemCount, itemCategory };

//   try {
//       const response = await request.post({
//           url: `${BASE_URL}`,
//           data: JSON.stringify(itemData), // JSON 데이터로 전송
//           headers: {
//               'Content-Type': 'application/json' // JSON 요청으로 Content-Type 설정
//           }
//       });

//       return response.data;
//   } catch (error) {
//       console.error('상품 등록 중 오류 발생:', error.response?.data || error.message);
//       throw error;
//   }
// };

export const createItem = async (itemName, itemPrice, itemDetails, itemCount, itemCategory) => {
  const itemStatus = 'WAIT'; // 기본 상태 설정
  try {
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('itemPrice', itemPrice);
      formData.append('itemDetails', itemDetails);
      formData.append('itemStatus', itemStatus);
      formData.append('itemCount', itemCount);
      formData.append('itemCategory', itemCategory);

      // 파일이 필요하지 않을 경우, 파일 처리를 생략하거나 빈 배열로 처리할 수 있습니다.
      // formData.append('files', new Blob([])); // 필요 시 사용

      const response = await request.post({
          url: `${BASE_URL}`,
          data: formData,
          headers: {
              'Content-Type': 'multipart/form-data'
          },
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
  
  // **상품 수정 (PUT)**
  export const updateItem = async (itemId, itemData, remainImgId = [], files = []) => {
    try {
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