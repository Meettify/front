import { create } from 'zustand';
import { getMyQuestions, createQuestion, countQuestions, countMyQuestions } from '../api/questionsAPI';

const useQuestionsStore = create((set) => ({
  questions: [],
  totalQuestionsCount: 0,  // 모든 문의글 수
  myQuestionsCount: 0,      // 내 문의글 수
  loading: false,
  error: null,

  fetchMyQuestions: async (page = 0, size = 10, sort) => {
    set({ loading: true, error: null });
    try {
      const data = await getMyQuestions(page, size, sort);  // getMyQuestions 호출
      console.log('내 문의 목록 데이터:', data); // 응답 데이터 확인
      if (data && data.contents) {
        set({ questions: data.contents, loading: false });
        console.log('질문 목록:', data.contents); // 갱신된 질문 목록 확인
      } else {
        set({ questions: [], loading: false });
        console.log('응답 데이터에 contents가 없거나 비어 있습니다.');
      }
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
      console.error('내 문의 조회 중 오류 발생:', error);  // 오류 로그 추가
    }
  },
  
  // 문의 작성
  createQuestion: async (title, content) => {
    set({ loading: true });
    try {
      await createQuestion(title, content);
      set({ loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
    }
  },

  // 모든 문의글 수 조회
  fetchTotalQuestionsCount: async () => {
    set({ loading: true, error: null });
    try {
      const count = await countQuestions();
      set({ totalQuestionsCount: count, loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
    }
  },

  // 내 문의글 수 조회
  fetchMyQuestionsCount: async () => {
    set({ loading: true, error: null });
    try {
      const count = await countMyQuestions();
      set({ myQuestionsCount: count, loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
    }
  },
}));

export default useQuestionsStore;
