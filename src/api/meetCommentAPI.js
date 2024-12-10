import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 댓글 생성
export const createComment = async (meetId, meetBoardId, comment, parentComment = null) => {
    try {
      const postDate = new Date().toISOString(); // 현재 시간으로 postDate 설정
      const response = await request.post({
        url: `${BASE_URL}/meetBoardComments/meets/${meetId}/boards/${meetBoardId}/comments`,
        headers: {
             'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
        },
        data: {
          parentComment: parentComment,  // 부모 댓글 ID
          content: comment,              // 댓글 내용
          postDate: postDate,            // 댓글 작성 시간 (현재 시간)
        },
      });
      return response.data;  // 성공적으로 데이터를 반환
    } catch (error) {
      console.error('댓글 생성 중 오류 발생:', error);
      throw error;  // 오류 발생 시 다시 던져서 호출하는 곳에서 처리
    }
  };
  

// 댓글 수정
export const updateComment = async (meetBoardCommentId, newCommentContent) => {
    console.log("meetBoardCommentId:", meetBoardCommentId);
    console.log("commentId:", commentId);
    console.log("newContent:", newContent);
    try {
      const response = await request.put({
        url: `${BASE_URL}/meetBoardComments/${meetBoardCommentId}`,
        headers: {
             'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
        },
        data: {
          comment: {
            comment: newCommentContent, // 수정할 댓글 내용
          },
        },
      });
      return response.data; // 성공적으로 데이터를 반환
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
      throw error; // 오류 발생 시 다시 던져서 호출하는 곳에서 처리
    }
  };

// 댓글 삭제
export const deleteComment = async (meetBoardCommentId) => {
  try {
    console.log(`삭제 요청 시작: /meetBoardComments/${meetBoardCommentId}`);
    // JWT 토큰 가져오기
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('로그인 상태가 아닙니다. 토큰이 없습니다.');
    }
    const response = await request.del({
      url: `${BASE_URL}/meetBoardComments/${meetBoardCommentId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`, // JWT 토큰 추가
      },
    });
    console.log('댓글 삭제 완료:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response || error);
    throw error;
  }
};
