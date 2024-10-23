import request from './request'; // 공용 Axios 인스턴스 가져오기

const BASE_URL = 'http://meettify.store/api/v1'; // 공용 URL 설정

// 댓글 생성 (POST)
export const createComment = async (communityId, commentContent, commentParentId = null) => {
    try {
        const url = `${BASE_URL}/${communityId}/comment`; // 동적 URL 생성
        console.log(`댓글 생성 요청 URL: ${url}`);

        const response = await request.post(url, {
            comment: commentContent,
            commentParentId: commentParentId,
        });

        console.log('댓글 생성 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('댓글 생성 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};

// 댓글 목록 조회 (GET)
export const getComments = async (communityId, page = 1, size = 10) => {
    try {
        const url = `${BASE_URL}/${communityId}/comment/commentList`; // 동적 URL 생성
        console.log(`댓글 목록 조회 요청 URL: ${url}`);

        const response = await request.get(url, {
            params: { page, size },
        });

        console.log('댓글 목록:', response.data);
        return response.data;
    } catch (error) {
        console.error('댓글 목록 조회 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};

// 댓글 삭제 (DELETE)
export const deleteComment = async (communityId, commentId) => {
    try {
        const url = `${BASE_URL}/${communityId}/comment/${commentId}`; // 동적 URL 생성
        console.log(`댓글 삭제 요청 URL: ${url}`);

        const response = await request.delete(url);

        console.log('댓글 삭제 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('댓글 삭제 중 오류 발생:', error.response?.data || error.message);
        throw error;
    }
};
