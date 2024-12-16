import request from './request';

const BASE_URL = '/admin'; // 관리자 문의 API 경로

// 문의글 내역 보기
export const getAdminQuestions = async (page = 0, size = 10, sort = [], replyStatus = 'ALL') => {  // 기본값을 'ALL'로 설정
    try {
      const params = { 
        page, 
        size, 
        sort, 
      };

      // replyStatus가 빈 문자열이 아닌 경우에만 추가
      if (replyStatus && replyStatus !== '') {
        params.replyStatus = replyStatus;
      }

      const response = await request.get({
        url: `${BASE_URL}/questions`, // 문의글 내역 조회 경로
        params,  // 수정된 params 사용
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
        },
      });

      return response.data;
    } catch (error) {
      console.error('관리자 문의글 조회 중 오류 발생:', error.response?.data || error.message); // 에러 상세 출력
      throw error;
    }
};
  
// 문의글 답변 달기
export const addAnswer = async (questionId, comment) => {
  try {
    const response = await request.post({
      url: `${BASE_URL}/${questionId}/answer`, // 문의글 답변 추가 경로
      data: { comment }, // 답변 내용
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('문의글 답변 추가 중 오류 발생:', error.response?.data || error.message); // 에러 상세 출력
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
