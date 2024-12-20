import { create } from 'zustand';
import { getMyQuestions, createQuestion } from '../api/questionsAPI';

const useQuestionsStore = create((set) => ({
  questions: [],
  loading: false,
  error: null,
  
  // 내 문의 조회
  fetchMyQuestions: async (page = 0, size = 10, sort = ['createdDate,desc']) => {
    set({ loading: true, error: null });
    try {
      const data = await getMyQuestions(page, size, sort);
      set({ questions: data.content || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data || error.message, loading: false });
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
}));

export default useQuestionsStore;
