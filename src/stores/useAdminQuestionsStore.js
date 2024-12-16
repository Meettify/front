// useAdminQuestions.js
import { create } from 'zustand';
import {
  getAdminQuestions,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from '../api/adminQuestionsAPI'; // adminAPI 경로 조정

const useAdminQuestionsStore = create((set) => ({
  questions: [],
  totalPages: 0,
  loading: false,
  error: null,

  // 문의글 목록 조회
  fetchQuestions: async (page = 0, size = 10, sort = 'desc') => {
    set({ loading: true, questions: [] }); // 초기화
    try {
      const response = await getAdminQuestions(page, size, sort);
      const { questions, totalPages } = response;

      set({
        questions,
        totalPages,
        loading: false,
      });

      return totalPages;
    } catch (error) {
      console.error('문의글 목록 조회 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 추가
  addAnswer: async (questionId, comment) => {
    set({ loading: true });
    try {
      await addAnswer(questionId, comment);
      set({ loading: false });
    } catch (error) {
      console.error('답변 추가 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 수정
  updateAnswer: async (questionId, answerId, comment) => {
    set({ loading: true });
    try {
      await updateAnswer(questionId, answerId, comment);
      set({ loading: false });
    } catch (error) {
      console.error('답변 수정 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 삭제
  deleteAnswer: async (questionId, answerId) => {
    set({ loading: true });
    try {
      await deleteAnswer(questionId, answerId);
      set({ loading: false });
    } catch (error) {
      console.error('답변 삭제 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },
}));

export default useAdminQuestionsStore;
