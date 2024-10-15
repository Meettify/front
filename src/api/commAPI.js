import request from './request'; // Axios 인스턴스 가져오기
import axios from 'axios';

const BASE_URL = '/community'; // 공통 경로
const DEL_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 커뮤니티 게시물 생성 (POST)
export const createCommunityPost = async (title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));

        // 파일이 없을 경우에도 빈 파일 필드를 전송
        if (files && files.length > 0) {
            files.forEach(file => {
                requestBody.append('files', file); // 파일 추가
            });
        } else {
            requestBody.append('files', new Blob()); // 빈 Blob 추가
        }

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

        // 파일이 있을 경우 추가
        if (files.length > 0) {
            files.forEach(file => requestBody.append('files', file));
        } else {
            // 비어 있는 files 배열을 추가
            requestBody.append('files', new Blob()); // 빈 Blob 추가
        }

        // remainImgId가 비어 있어도 포함
        requestBody.append('remainImgId', JSON.stringify(remainImgId));

        const accessToken = sessionStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);

        const response = await request.put({
            url: `${BASE_URL}/${communityId}`,
            data: requestBody,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        console.error('커뮤니티 게시글 수정 중 오류 발생:', error);
        throw error;
    }
};


export const deleteCommunityPost = async (communityId) => {
    console.log("삭제 요청 커뮤니티 ID:", communityId);  // ID 값 확인
    try {
        const response = await axios.delete(`${DEL_URL}/community/${communityId}`, {
            params: {
                communityId: communityId,  // query 파라미터로 전달
            }
        });
        return response.data;
    } catch (error) {
        console.error('커뮤니티 게시글 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// 커뮤니티 게시물 조회 (GET)
export const getCommunityPost = async (communityId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/${communityId}`,
        });
        return response.data;  // 서버에서 반환된 JSON 데이터를 반환
    } catch (error) {
        console.error('커뮤니티 게시글 조회 중 오류 발생:', error);
        throw error;  // 에러 처리
    }
};

// 커뮤니티 게시물 검색 (GET)
export const searchCommunityPosts = async (page = 0, size = 10, sort = []) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/search`,
            params: { page, size, sort },
        });
        return response.data;
    } catch (error) {
        console.error('커뮤니티 게시글 검색 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 게시물 전체 조회 (GET)
export const getAllCommunityPosts = async (page = 1, size = 10) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/communityList`,
            params: { page, size }, // 페이징 처리 파라미터
        });
        return response.data; // API에서 받은 데이터를 반환
    } catch (error) {
        console.error('게시물 전체 조회 중 오류가 발생했습니다:', error);
        throw error;
    }
};
