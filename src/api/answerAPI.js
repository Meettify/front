import request from './request';

const BASE_URL = '/admin';

// 질문 목록 가져오기
export const getQuestions = async (page = 0, size = 10, sort = 'desc') => {
  try {
    console.log('[API Call] Fetching Questions:', { page, size, sort });
    const response = await request.get({
      url: `${BASE_URL}/questions`,
      headers: { 'Content-Type': 'application/json' },
      params: { page, size, sort: [sort] }, // 수정: sort를 배열로 전달
    });
    console.log('[API Response] Questions:', response.data);
    
    // 응답 데이터 검증
    if (!response.data || !Array.isArray(response.data.content)) {
      console.error('응답 데이터 형식 오류:', response.data);
      throw new Error('잘못된 데이터 형식');
    }
    return response.data;
  } catch (error) {
    console.error('[API Error] Fetch Questions:', error);
    throw error;
  }
};

// 답변 생성
export const postAnswer = async (questionId, comment) => {
  try {
    console.log('[API Call] Creating Answer:', { questionId, comment });
    const response = await request.post({
      url: `${BASE_URL}/${questionId}/answer`,
      data: { comment },
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('[API Response] Create Answer:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API Error] Create Answer:', error);
    throw error;
  }
};

// 답변 수정
export const putAnswer = async (questionId, answerId, comment) => {
  try {
    console.log('[API Call] Updating Answer:', { questionId, answerId, comment });
    const response = await request.put({
      url: `${BASE_URL}/${questionId}/answer/${answerId}`,
      data: { comment },
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('[API Response] Update Answer:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API Error] Update Answer:', error);
    throw error;
  }
};

// 답변 삭제
export const deleteAnswer = async (questionId, answerId) => {
  try {
    console.log('[API Call] Deleting Answer:', { questionId, answerId });
    const response = await request.delete({
      url: `${BASE_URL}/${questionId}/answer/${answerId}`,
    });
    console.log('[API Response] Delete Answer:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API Error] Delete Answer:', error);
    throw error;
  }
};
