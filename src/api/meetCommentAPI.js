import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 댓글 생성 API
export const createComment = async (meetId, meetBoardId, commentData) => {
  try {
    // meetId와 meetBoardId가 없으면 오류를 발생시킴
    if (!meetId || !meetBoardId) {
      throw new Error('meetId 또는 meetBoardId가 누락되었습니다.');
    }

    // 세션에서 토큰 가져오기
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      throw new Error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
    }

    // 댓글 생성 API 호출
    const response = await request.post({
      url: `${BASE_URL}/meetBoardComments/meets/${meetId}/boards/${meetBoardId}/comments`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // JWT 토큰 추가
      },
      data: commentData,  // 댓글 데이터
    });

    return response.data;  // 성공적으로 생성된 댓글 데이터 반환
  } catch (error) {
    console.error('댓글 생성 중 오류 발생:', error);
    throw error;  // 오류 발생 시 호출한 곳에서 처리하도록 던짐
  }
};

// 댓글 수정 API
export const updateComment = async (meetBoardCommentId, newCommentContent) => {
  try {
    // 요청할 데이터 준비
    const data = {
      content: newCommentContent,  // 수정된 댓글 내용
    };

    // 댓글 수정 API 호출
    const response = await request.put({
      url: `${BASE_URL}/meetBoardComments/${meetBoardCommentId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,  // JWT 토큰 추가
      },
      data,  // 수정할 댓글 데이터
    });

    return response.data;  // 수정된 댓글 데이터 반환
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error);
    throw error;  // 오류 발생 시 호출한 곳에서 처리하도록 던짐
  }
};

// 댓글 삭제 API
export const deleteComment = async (meetBoardCommentId) => {
  try {
    // 토큰이 있는지 확인
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('로그인 상태가 아닙니다. 토큰이 없습니다.');
    }

    // 댓글 삭제 API 호출
    const response = await request.del({
      url: `${BASE_URL}/meetBoardComments/${meetBoardCommentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,  // JWT 토큰 추가
      },
    });

    console.log('댓글 삭제 완료:', response.data);
    return response.data;  // 삭제된 댓글 정보 반환
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response || error);
    throw error;  // 오류 발생 시 호출한 곳에서 처리하도록 던짐
  }
};
