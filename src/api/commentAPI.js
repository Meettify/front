import request from './request'; // Axios 인스턴스 가져오기

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 댓글 생성
export const createComment = async (communityId, comment, parentId = null) => {
  try {
    const response = await request.post({
      url: `${BASE_URL}/${communityId}/comment`,
      data: { comment, commentParentId: parentId },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 생성 중 오류 발생:', error);
    throw error;
  }
};


// 댓글 목록 조회
export const getComments = async (communityId, page = 0, size = 10) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/${communityId}/comment/commentList`,
      params: { page, size },
    });
    console.log('댓글 목록 응답:', response);
    return response.data;
  } catch (error) {
    console.error('게시물 조회 중 오류 발생:', error);
    throw error;
  }
};


// 댓글 수정
export const updateComment = async (communityId, commentId, newContent) => {
  try {
    const response = await request.put({
      url: `${BASE_URL}/${communityId}/comment/${commentId}`,
      data: { comment: newContent },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (communityId, commentId) => {
  try {
    const response = await request.del({
      url: `${BASE_URL}/${communityId}/comment/${commentId}`,
    });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
    throw error;
  }
};

