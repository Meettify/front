import request from './request';

const BASE_URL = '/admin'; // 관리자 문의 API 경로

export const getAdminQuestions = async (page = 1, size = 10, sort = 'desc', replyStatus) => {
  try {
    console.log('관리자 문의 조회 요청:', { page, size, sort, replyStatus }); // 디버깅 추가
    const response = await request.get({
      url: `${BASE_URL}/questions`,
      params: { page, size, sort, replyStatus },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });
    console.log('관리자 문의 조회 응답:', response.data); // 디버깅 추가
    return response.data;
  } catch (error) {
    console.error('관리자 문의 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};
  
// 문의글 답변 달기
export const addAnswer = async (questionId, comment) => {
  try {
    console.log('Posting comment for questionId:', questionId);
    console.log('Comment:', comment);

    const response = await request.post({
      url: `${BASE_URL}/${questionId}/answer`,  // 질문 ID에 대한 답변을 달기
      data: { comment },  // 댓글 내용
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('문의글 답변 추가 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 문의글 답변 수정
export const updateAnswer = async (questionId, answerId, comment) => {
  try {
    const response = await request.put({
      url: `${BASE_URL}/${questionId}/answer/${answerId}`, // 문의글 답변 수정 경로
      data: { comment }, // 수정할 답변 내용
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('문의글 답변 수정 중 오류 발생:', error.response?.data || error.message); // 에러 상세 출력
    throw error;
  }
};

// 문의글 답변 삭제
export const deleteAnswer = async (questionId, answerId) => {
  try {
    const response = await request.del({
      url: `${BASE_URL}/${questionId}/answer/${answerId}`, // 문의글 답변 삭제 경로
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('문의글 답변 삭제 중 오류 발생:', error.response?.data || error.message); // 에러 상세 출력
    throw error;
  }
};
