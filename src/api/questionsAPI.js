import request from './request';

const BASE_URL = '/questions'; // API 경로

// 문의글 생성
export const createQuestion = async (title, content) => {
  try {
    const formData = new FormData();
    const questionData = JSON.stringify({ title, content });

    formData.append('question', new Blob([questionData], { type: 'application/json' }));

    const response = await request.post({
      url: BASE_URL, // commAPI 방식대로 URL 설정
      data: formData, // 요청 본문 데이터 설정
      headers: { 'Content-Type': 'multipart/form-data' }, // 파일 전송을 위한 Content-Type
    });
    return response.data;
  } catch (error) {
    console.error('문의글 생성 중 오류 발생:', error);
    throw error;
  }
};

// 문의글 수정
export const updateQuestion = async (questionId, title, content) => {
  try {
    const formData = new FormData();
    const questionData = JSON.stringify({ title, content });

    formData.append('question', new Blob([questionData], { type: 'application/json' }));

    const response = await request.put({
      url: `${BASE_URL}/${questionId}`, // 수정된 URL
      data: formData, // 요청 본문 데이터 설정
      headers: { 'Content-Type': 'multipart/form-data' }, // 파일 전송을 위한 Content-Type
    });
    return response.data;
  } catch (error) {
    console.error('문의글 수정 중 오류 발생:', error);
    throw error;
  }
};

// 문의글 삭제
export const deleteQuestion = async (questionId) => {
  try {
    const response = await request.del({
      url: `${BASE_URL}/${questionId}`, // 삭제 URL
      headers: { 'Content-Type': 'application/json' }, // 헤더 설정
    });
    return response.data;
  } catch (error) {
    console.error('문의글 삭제 중 오류 발생:', error);
    throw error;
  }
};

// 문의글 조회
export const getQuestion = async (questionId) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}/${questionId}`, // 조회 URL
    });
    return response.data;
  } catch (error) {
    console.error('문의글 조회 중 오류 발생:', error);
    throw error;
  }
};

// 관리자용: 모든 유저의 문의글 조회
export const getAllQuestions = async (page = 1, pageSize = 10) => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/my-questions`, // 모든 유저의 문의글 조회 API
        params: { page, pageSize }, // 페이지네이션 처리
      });
      return response.data;
    } catch (error) {
      console.error('모든 문의글 조회 중 오류 발생:', error);
      throw error;
    }
  };
  
  // 모든 문의글 수 조회
  export const countQuestions = async () => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/count-questions`, // 문의글 수 조회 URL
      });
      return response.data;
    } catch (error) {
      console.error('문의글 수 조회 중 오류 발생:', error);
      throw error;
    }
  };
  
  // 내 문의글 조회
  export const getMyQuestions = async (page = 1, pageSize = 10) => {
    try {
        const response = await request.get({
          url: '/api/v1/questions/my-questions', // 내 문의 조회 API
          params: { page, pageSize }, // 페이지네이션을 위한 쿼리 파라미터
        });
        return response.data;
      } catch (error) {
        console.error('내 문의 조회 중 오류 발생:', error);
        throw error;
      }
  };
  
  // 내 문의글 수 조회
  export const countMyQuestions = async () => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/count-my-questions`, // 내 문의글 수 조회 API
      });
      return response.data;
    } catch (error) {
      console.error('내 문의글 수 조회 중 오류 발생:', error);
      throw error;
    }
  };