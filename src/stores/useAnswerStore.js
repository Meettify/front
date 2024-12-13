// useAnswerStore.js
import { create } from 'zustand';
import {
  getQuestions,
  postAnswer,
  putAnswer,
  deleteAnswer,
} from '../api/answerAPI';

const useAnswerStore = create((set) => ({
    questions: [], // 질문 목록의 초기값을 빈 배열로 설정
    loading: false,
    error: null,

  // 질문 목록 가져오기
  fetchQuestions: async (page = 0, size = 10, sort = 'desc') => {
    set({ loading: true, questions: [] });
    try {
      const data = await getQuestions(page, size, sort);
      set({ questions: data.content, loading: false });
      return data.totalPages;
    } catch (error) {
      console.error('질문 목록 가져오기 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 생성
  createAnswer: async (questionId, comment) => {
    set({ loading: true });
    try {
      await postAnswer(questionId, comment);
      set({ loading: false });
    } catch (error) {
      console.error('답변 생성 오류:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 수정
  updateAnswer: async (questionId, answerId, comment) => {
    set({ loading: true });
    try {
      await putAnswer(questionId, answerId, comment);
      set({ loading: false });
    } catch (error) {
      console.error('답변 수정 오류:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 답변 삭제
  deleteAnswer: async (questionId, answerId) => {
    set({ loading: true });
    try {
      await deleteAnswer(questionId, answerId);
      set((state) => ({
        questions: state.questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                answers: question.answers.filter((answer) => answer.id !== answerId),
              }
            : question
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('답변 삭제 오류:', error);
      set({ error, loading: false });
      throw error;
    }
  },
}));

export default useAnswerStore;
