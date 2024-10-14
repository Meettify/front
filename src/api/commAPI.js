import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 커뮤니티 게시글 생성 (POST)
// export const createCommunityPost = async (title, content, files = []) => {
//     try {
//         const requestBody = new FormData();

//         // Blob을 사용하지 않고 JSON 데이터를 직접 추가
//         requestBody.append('community', JSON.stringify({ title, content }));

//         // 파일을 추가
//         files.forEach(file => {
//             requestBody.append('files', file);
//         });

//         const response = await axios.post(`${BASE_URL}/community`, requestBody, {
//             headers: {
//                 'Content-Type': 'multipart/form-data', // 반드시 multipart로 지정
//             },
//         });

//         return response.data;
//     } catch (error) {
//         console.error('글 생성 중 오류 발생:', error);
//         throw error;
//     }
// };
// commAPI.js
export const createCommunityPost = async (title, content, files = []) => {
    try {
        const formData = new FormData();
        const community = {
            title: title,
            content: content,
        };
        // JSON 데이터를 Blob으로 변환하여 FormData에 추가
        formData.append('community', new Blob([JSON.stringify(community)], { type: 'application/json' }));

        // 선택된 파일들을 FormData에 추가
        files.forEach((file) => {
            formData.append('files', file);
        });

        const response = await axios.post(`${BASE_URL}/community`, formData, {
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

// 커뮤니티 게시글 수정 (PUT)
export const updateCommunityPost = async (communityId, title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', JSON.stringify({ title, content }));
        files.forEach(file => {
            requestBody.append('files', file);
        });

        const response = await request.put(`${BASE_URL}/community/${communityId}`, requestBody, {
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

// 커뮤니티 게시글 삭제 (DELETE)
export const deleteCommunityPost = async (communityId) => {
    try {
        const response = await request.delete(`${BASE_URL}/community/${communityId}`);
        return response.data;
    } catch (error) {
        console.error('커뮤니티 게시글 삭제 중 오류 발생:', error);
        throw error;
    }
};

// 커뮤니티 게시글 전체 목록 조회 (페이지네이션 없이 모든 게시글 가져오기)
export const getAllCommunityPosts = async () => {
    try {
        const response = await request.get(`${BASE_URL}/community`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response.data;  // 서버에서 모든 게시글 데이터를 반환
    } catch (error) {
        console.error('커뮤니티 게시글 전체 목록을 불러오는 중 오류가 발생했습니다:', error);
        throw error;
    }
};

// 커뮤니티 게시글 조회 (GET)
export const getCommunityPost = async (communityId) => {
    try {
        const response = await request.get(`${BASE_URL}/community/${communityId}`);
        return response.data;  // 서버에서 반환된 JSON 데이터를 반환
    } catch (error) {
        console.error('커뮤니티 게시글 조회 중 오류 발생:', error);
        throw error;  // 에러 처리
    }
};

// 커뮤니티 게시글 검색 (GET)
export const searchCommunityPosts = async (page, size, sort = []) => {
    try {
        const response = await request.get(`${BASE_URL}/community/search`, {
            params: { page, size, sort },
        });
        return response.data;
    } catch (error) {
        console.error('커뮤니티 게시글 검색 중 오류 발생:', error);
        throw error;
    }
};
