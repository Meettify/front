import request from './request';

const BASE_URL = '/questions'; // 공통 경로

// 문의 작성
export const createQuestion = async (title, content) => {
  try {
    console.log('문의 작성 요청:', { title, content }); // 디버깅 추가
    const response = await request.post({
      url: BASE_URL,
      data: { title, content },
    });
    console.log('문의 작성 응답:', response.data); // 디버깅 추가
    return response.data;
  } catch (error) {
    console.error('문의 작성 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 문의 조회
export const getQuestion = async (questionId) => {
  try {
    console.log('문의 조회 요청:', questionId); // 디버깅 추가
    const response = await request.get({
      url: `${BASE_URL}/${questionId}`,
    });
    console.log('문의 조회 응답:', response.data); // 디버깅 추가
    return response.data;
  } catch (error) {
    console.error('문의 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 문의 수정
export const updateQuestion = async (questionId, title, content) => {
  try {
    const response = await request.put({
      url: `${BASE_URL}/${questionId}`,
      data: { title, content },
    });
    return response.data;
  } catch (error) {
    console.error('문의 수정 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 문의 삭제
export const deleteQuestion = async (questionId) => {
  try {
    const response = await request.delete({
      url: `${BASE_URL}/${questionId}`,
    });
    return response.data;
  } catch (error) {
    console.error('문의 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};

// 내 문의 조회
export const getMyQuestions = async (page = 0, size = 10, sort = ['createdDate,desc']) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/my-questions`,
      params: { page, size, sort },
    });
    return response.data;
  } catch (error) {
    console.error('내 문의 조회 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};