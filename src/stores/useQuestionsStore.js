import { create } from 'zustand';
import { getQuestion, countQuestions } from '../api/questionsAPI';

const useQuestionsStore = create((set) => ({
    questions: [], // 유저가 작성한 문의글 목록
    allQuestions: [], // 관리자가 조회한 모든 문의글 목록
    totalQuestions: 0, // 전체 문의글 수
    loading: false, // 로딩 상태
    error: null, // 에러 상태
  
    // 유저의 문의글 목록 조회
    fetchQuestions: async (page = 1, pageSize = 10) => {
      set({ loading: true, questions: [] });
      try {
        const response = await getMyQuestions(page, pageSize); // 유저의 문의글 목록
        set({ questions: response.contents || [], loading: false });
      } catch (error) {
        console.error('유저 문의글 조회 중 오류 발생:', error);
        set({ error, loading: false });
      }
    },
  
    // 관리자의 모든 문의글 조회
    fetchAllQuestions: async (page = 1, pageSize = 10) => {
      set({ loading: true, allQuestions: [] });
      try {
        const response = await getAllQuestions(page, pageSize); // 관리자가 조회하는 모든 문의글
        set({ allQuestions: response.contents || [], loading: false });
      } catch (error) {
        console.error('모든 문의글 조회 중 오류 발생:', error);
        set({ error, loading: false });
      }
    },
  
    // 전체 문의글 수 조회
    fetchTotalQuestions: async () => {
      set({ loading: true });
      try {
        const response = await countQuestions(); // 전체 문의글 수 가져오기
        set({ totalQuestions: response.total || 0, loading: false });
      } catch (error) {
        console.error('전체 문의글 수 조회 중 오류 발생:', error);
        set({ error, loading: false });
      }
    },
  }));  

export default useQuestionsStore;
