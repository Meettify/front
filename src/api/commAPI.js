import request from './request'; // Axios 인스턴스 가져오기

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // .env에서 BASE_URL 가져오기

// 커뮤니티 게시글 생성 (POST)
export const createCommunityPost = async (title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', JSON.stringify({ title, content }));
        files.forEach(file => requestBody.append('files', file));

        const response = await request.post(`${BASE_URL}/community`, requestBody, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error('글 생성 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 게시글 조회 (GET)
export const getCommunityPost = async (communityId) => {
    try {
        const response = await request.get(`${BASE_URL}/community/${communityId}`);
        return response.data;
    } catch (error) {
        console.error('커뮤니티 게시글 조회 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 게시글 수정 (PUT)
export const updateCommunityPost = async (communityId, title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));
        files.forEach(file => requestBody.append('files', file));

        const response = await request.put(`${BASE_URL}/community/${communityId}`, requestBody, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    } catch (error) {
        console.error('글 수정 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 게시글 삭제 (DELETE)
export const deleteCommunityPost = async (communityId) => {
    try {
        const response = await request.delete(`${BASE_URL}/community/${communityId}`);
        return response.data;
    } catch (error) {
        console.error('글 삭제 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 제목 검색 (GET)
export const searchCommunityPosts = async (page, size, sort = []) => {
    try {
        const response = await request.get(`${BASE_URL}/community/search`, {
            params: { page, size, sort },
        });
        return response.data;
    } catch (error) {
        console.error('커뮤니티 검색 중 오류 발생:', error);
        throw error;
    }
};
