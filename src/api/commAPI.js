import request from './request';

const BASE_URL = '/community'; // 공통 경로

export const createCommunityPost = async (title, content, files = []) => {
  try {
    const requestBody = new FormData();

    const communityData = JSON.stringify({ title, content });
    requestBody.append('community', new Blob([communityData], { type: 'application/json' }));

    // ✅ 파일이 있을 경우에만 추가
    if (files && files.length > 0) {
      files.forEach(file => {
        requestBody.append('files', file);
      });
    }

    console.log('📦 FormData 내용:', Array.from(requestBody.entries()));

    const response = await request.post({
      url: `/community`,
      data: requestBody,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ 글 생성 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCommunityPost = async (communityId, title, content, remainImgId = [], files = []) => {
  try {
    const formData = new FormData();

    const requestDto = { title, content, remainImgId };

    const jsonBlob = new Blob([JSON.stringify(requestDto)], {
      type: "application/json",
    });
    formData.append("community", jsonBlob); // @RequestPart("community")

    if (files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    // 디버깅 출력
    for (let [key, value] of formData.entries()) {
      console.log("🧾 FormData Entry:", key, value);
    }

    const response = await request.put({
      url: `${BASE_URL}/${communityId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error.response?.data || error.message);
    throw error;
  }
};



export const deleteCommunityPost = async (communityId) => {
  try {
    console.log(`게시물 삭제 요청 시작: /community/${communityId}`);

    // 게시물 삭제 요청
    const response = await request.del({
      url: `${BASE_URL}/${communityId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    console.log('게시글 삭제 완료:', response.data);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};


export const getCommunityPost = async (communityId) => {
  try {
    const response = await request.get({ url: `${BASE_URL}/${communityId}` });
    return response.data;
  } catch (error) {
    console.error('게시글 조회 중 오류 발생:', error);
    throw error;
  }
};

// 커뮤니티 검색
export const searchCommunityPosts = async (page = 1, size = 10, sort = 'desc', searchQuery = '') => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/search`,  // 템플릿 리터럴로 수정
      params: { page, size, sort, searchTitle: searchQuery }, // 검색어 추가
    });
    
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('게시글 검색 중 오류 발생:', error);
    throw error;
  }
};

export const getAllCommunityPosts = async (page = 1, size = 10, sort = 'desc') => {
    try {
        console.log(`API Request params - Page: ${page}, Size: ${size}, Sort: ${sort}`); // 디버깅용 로그
        const response = await request.get({
            url: `${BASE_URL}/communityList`,
            params: { page, size, sort },
        });
        console.log('API Response Data:', response.data); // 디버깅용 로그
        return response.data;
    } catch (error) {
        console.error('게시물 조회 중 오류 발생:', error);
        throw error;
    }
};

// 조회수 TOP10개 가져오기
export const getTopCommunityPosts = async () => {
  try {
    const response = await request.get({ url: `${BASE_URL}/top` });
    return response.data;
  } catch (error) {
    console.error("Top 커뮤니티 조회 실패:", error);
    throw error;
  }
};

