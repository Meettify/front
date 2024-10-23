import request from './request'; // Axios 인스턴스 가져오기
import axios from 'axios';

const BASE_URL = '/community'; // 공통 경로
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 커뮤니티 게시물 생성 (POST)
export const createCommunityPost = async (title, content, files = []) => {
  try {
      const requestBody = new FormData();

      // JSON 데이터를 Blob으로 추가 (커뮤니티 정보)
      const communityData = JSON.stringify({ title, content });
      requestBody.append('community', new Blob([communityData], { type: 'application/json' }));

      // 파일이 있는 경우 파일 추가
      if (files.length > 0) {
          files.forEach(file => {
              requestBody.append('files', file);
          });
      } else {
          // 서버에서 비어 있는 배열을 처리할 수 있도록 빈 Blob 추가
          requestBody.append('files', new Blob([]));
      }

      console.log('FormData 내용:', Array.from(requestBody.entries())); // 디버깅용 로그

      const response = await request.post({
          url: `/community`,
          data: requestBody,
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      return response.data;
  } catch (error) {
      console.error('글 생성 중 오류 발생:', error);
      throw error;
  }
};


// 커뮤니티 게시물 수정 (PUT)
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

// 커뮤니티 게시물 삭제 (DELETE)
export const deleteCommunityPost = async (communityId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/community/${communityId}`, {
      params: { communityId },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 삭제 중 오류 발생:', error);
    throw error;
  }
};

// 커뮤니티 게시물 조회 (GET)
export const getCommunityPost = async (communityId) => {
  try {
    const response = await request.get({ url: `${BASE_URL}/${communityId}` });
    return response.data;
  } catch (error) {
    console.error('게시글 조회 중 오류 발생:', error);
    throw error;
  }
};

// 커뮤니티 게시물 검색 (GET)
export const searchCommunityPosts = async (page = 1, size = 10, sort = []) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/search`,
      params: { page, size, sort },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 검색 중 오류 발생:', error);
    throw error;
  }
};

// 전체 커뮤니티 게시물 조회 (GET)
export const getAllCommunityPosts = async (page = 1, size = 10) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/communityList`,
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    console.error('게시물 조회 중 오류 발생:', error);
    throw error;
  }
};

export const increasePostViewCount = async (communityId) => {
  try {
    await updateViewCountAPI(communityId); // 조회수 업데이트 API 호출
    // 상태 업데이트 - fetchPosts를 호출해 목록을 다시 불러오기
    await fetchPosts(); 
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
};

export const getRedisViewCount = async (communityId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/community/viewCount/${communityId}`
    );
    return response.data.viewCount;
  } catch (error) {
    console.error('Redis 조회수 가져오기 실패:', error);
    return 0; // 오류 시 0 반환
  }
};
