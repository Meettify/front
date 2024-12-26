import { create } from 'zustand';
import { getMyQuestions, createQuestion, countQuestions, countMyQuestions } from '../api/questionsAPI';

const useQuestionsStore = create((set) => ({
  questions: [],
  totalQuestionsCount: 0,  // 모든 문의글 수
  myQuestionsCount: 0,      // 내 문의글 수
  loading: false,
  error: null,

  // 내 문의 조회
  fetchMyQuestions: async (page = 0, size = 10, sort = ['createdDate,desc'], id = null) => {
    set({ loading: true, error: null });
    try {
      const data = await getMyQuestions(page, size, sort);
      const questions = data.content || [];
      
      if (id) {
        // id가 제공되면 해당 문의글 찾기
        const questionData = questions.find((q) => q.boardId === parseInt(id));
        if (questionData) {
          set({ questions: [questionData], loading: false }); // 해당 질문만 상태에 저장
        } else {
          set({ error: '해당 ID의 문의글을 찾을 수 없습니다.', loading: false });
        }
      } else {
        set({ questions, loading: false }); // id가 없으면 전체 문의글 상태 저장
      }
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
