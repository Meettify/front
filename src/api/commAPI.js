import request from './request'; // Axios 인스턴스 가져오기

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // BASE_URL 가져오기

// 커뮤니티 게시글 생성 (POST)
export const createCommunityPost = async (title, content, files = []) => {
    try {
        const requestBody = new FormData();

        requestBody.append('community', JSON.stringify({ title, content }));

        files.forEach(file => {
            requestBody.append('files', file);
        });

        // 수정된 부분: data 대신 requestBody 사용
        const response = await request.post(`${BASE_URL}/community`, requestBody, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
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
        // 템플릿 리터럴에 백틱(``) 사용
        const response = await request.get(`${BASE_URL}/community/${communityId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching community post:', error);
        throw error;
    }
};

// 커뮤니티 게시글 수정 (PUT)
export const updateCommunityPost = async (communityId, title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));
        files.forEach(file => {
            requestBody.append('files', file);
        });

        // 템플릿 리터럴에 백틱(``) 사용
        const response = await request.put(`${BASE_URL}/community/${communityId}`, requestBody, {
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

// 커뮤니티 게시글 삭제 (DELETE)
export const deleteCommunityPost = async (communityId) => {
    try {
        // 템플릿 리터럴에 백틱(``) 사용
        const response = await request.delete(`${BASE_URL}/community/${communityId}`);
        return response.data;
    } catch (error) {
        console.error('글 삭제 중 오류 발생:', error);
        throw error;
    }
};
