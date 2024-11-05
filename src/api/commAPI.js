import request from './request';
import { deleteComment, getComments } from './commentAPI';
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

export const updateCommunityPost = async (
  communityId, 
  title, 
  content, 
  remainImgId = [], 
  files = []
) => {
  try {
    const formData = new FormData();

    // JSON 데이터를 Blob으로 감싸서 FormData에 추가
    const communityData = JSON.stringify({ title, content, remainImgId });
    formData.append('community', new Blob([communityData], { type: 'application/json' }));

    // remainImgId 배열 개별 추가
    remainImgId.forEach(id => formData.append('remainImgId', id));

    // 파일 처리
    if (files.length > 0) {
      files.forEach(file => requestBody.append('files', file));
    } else {
      formData.append('files', new Blob([]));
    }

    const response = await request.put({
      url: `${BASE_URL}/${communityId}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error.response?.data || error.message);
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
