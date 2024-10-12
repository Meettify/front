import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // BASE_URL 가져오기

export const createCommunityPost = async (title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));
        files.forEach(file => {
            requestBody.append('files', file);
        });

        const response = await request.post({
            url: `${BASE_URL}/community`,
            data: requestBody,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('서버 응답:', response);
        
        return response.data;
    } catch (error) {
        console.error('글 생성 중 오류 발생:', error);
        if (error.response) {
            console.error('Error response:', error.response.status, error.response.data);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

export const getCommunityPost = async (communityId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/community/${communityId}`, // 커뮤니티 글 조회 URL
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching community post:', error);
        throw error;
    }
};

export const updateCommunityPost = async (communityId, title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));
        files.forEach(file => {
            requestBody.append('files', file);
        });

        const response = await request.put({
            url: `${BASE_URL}/community/${communityId}`,
            data: requestBody,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('글 수정 중 오류 발생:', error);
        throw error;
    }
};

export const getCommunityPosts = async () => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/community` // 커뮤니티 글 목록 API URL
        });
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error('Error fetching community posts:', error);
        throw error;
    }
};

export const deleteCommunityPost = async (communityId) => {
    try {
        const response = await request.delete({
            url: `${BASE_URL}/community/${communityId}` // 게시물 삭제 URL
        });
        return response.data;
    } catch (error) {
        console.error('글 삭제 중 오류 발생:', error);
        throw error;
    }
};