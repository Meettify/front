// commAPI.js - 기존 코드 유지, commentAPI 추가

import request from './request'; // Axios 인스턴스 가져오기
import axios from 'axios';

const BASE_URL = '/community'; // 공통 경로
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 커뮤니티 게시물 관련 함수들

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


// commAPI.js - 댓글 생성 API
export const addCommentAPI = async (communityId, comment, nickName) => {
  try {
    const url = `${API_BASE_URL}/${communityId}/comment`;

    const response = await request.post(url, 
      { 
        comment, 
        nickName 
      }, 
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken') || ''}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('댓글 생성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 생성 실패:', error.response?.data || error.message);
    throw error;
  }
};



//댓글조회
export const getComments = async (communityId, page = 1, size = 10) => {
  try {
    const response = await request.get({
      url: `${API_BASE_URL}/${communityId}/comment/commentList`,
      params: { page, size },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken') || ''}`,
      },
    });

    console.log('댓글 목록:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      '댓글 목록 조회 중 오류 발생:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteComment = async (communityId, commentId) => {
  try {
    const url = `${API_BASE_URL}/${communityId}/comment/${commentId}`;
    console.log(`댓글 삭제 요청 URL: ${url}`);

    const response = await request.delete(url);

    console.log('댓글 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 기존 게시물 관련 함수들 유지

export const updateCommunityPost = async (communityId, title, content, remainImgId = [], files = []) => {
  try {
    const requestBody = new FormData();
    requestBody.append('community', new Blob([JSON.stringify({ title, content, remainImgId })], { type: 'application/json' }));

    files.forEach(file => requestBody.append('files', file));
    requestBody.append('remainImgId', JSON.stringify(remainImgId));

    const response = await request.put({
      url: `${BASE_URL}/${communityId}`,
      data: requestBody,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error);
    throw error;
  }
};

export const deleteCommunityPost = async (communityId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/community/${communityId}`, { params: { communityId } });
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error);
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

// export const getRedisViewCount = async (communityId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/community/${communityId}`);
//     return response.data.viewCount;
//   } catch (error) {
//     console.error('Redis 조회수 가져오기 실패:', error);
//     return 0;
//   }
// };
