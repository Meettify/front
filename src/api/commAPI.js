import request from './request';
import axios from 'axios';

const BASE_URL = '/community'; // 공통 경로
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const createCommunityPost = async (title, content, files = []) => {
  try {
    const requestBody = new FormData();
    const communityData = JSON.stringify({ title, content });
    requestBody.append('community', new Blob([communityData], { type: 'application/json' }));

    if (files.length > 0) {
      files.forEach(file => requestBody.append('files', file));
    } else {
      requestBody.append('files', new Blob([]));
    }

    console.log('FormData 내용:', Array.from(requestBody.entries()));

    const response = await request.post({
      url: `/community`,
      data: requestBody,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('글 생성 중 오류 발생:', error);
    throw error;
  }
};


export const updateCommunityPost = async (communityId, title, content, remainImgId = [], files = []) => {
  try {
    const requestBody = new FormData();

    // JSON 데이터를 Blob으로 감싸 전달
    const communityData = JSON.stringify({ title, content, remainImgId });
    requestBody.append('community', new Blob([communityData], { type: 'application/json' }));

    // 파일 처리
    files.forEach(file => requestBody.append('files', file));
    requestBody.append('remainImgId', JSON.stringify(remainImgId));

    const response = await request.put(`${BASE_URL}/${communityId}`, requestBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};


// 게시물 삭제 API 호출 (댓글과 무관하게 삭제)
export const deleteCommunityPost = async (communityId) => {
  try {
    console.log(`삭제 요청 시작: /community/${communityId}`);
    
    const response = await axios.delete(`${API_BASE_URL}/community/${communityId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });

    console.log('게시글 삭제 완료:', response.data);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error.response || error);
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

export const searchCommunityPosts = async (page = 1, size = 10, sort = []) => {
  try {
    const response = await request.get({ url: `${BASE_URL}/search`, params: { page, size, sort } });
    return response.data;
  } catch (error) {
    console.error('게시글 검색 중 오류 발생:', error);
    throw error;
  }
};

export const getAllCommunityPosts = async (page = 1, size = 10) => {
  try {
    const response = await request.get({ url: `${BASE_URL}/communityList`, params: { page, size } });
    return response.data;
  } catch (error) {
    console.error('게시물 조회 중 오류 발생:', error);
    throw error;
  }
};

export const increasePostViewCount = async (communityId) => {
  try {
    await updateViewCountAPI(communityId);
    await fetchPosts();
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
};