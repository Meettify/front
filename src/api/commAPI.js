import request from './request'; // Axios 인스턴스 가져오기
import axios from 'axios';

const BASE_URL = '/community'; // 공통 경로
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 커뮤니티 게시물
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

// 게시물 삭제 API 호출 (댓글 유무와 무관하게 삭제)
export const deleteCommunityPost = async (communityId) => {
  try {
    const response = await request.del({
      url: `${API_BASE_URL}/community/${communityId}`,
    });
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