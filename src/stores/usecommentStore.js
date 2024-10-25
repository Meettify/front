// src/stores/useCommentStore.js
import { create } from 'zustand';
import { addCommentAPI, getComments, deleteComment as deleteCommentAPI } from '../api/commAPI'; // API 함수 가져오기

const useCommentStore = create((set) => ({
  comments: [],

  // 댓글 목록 가져오기
  fetchComments: async (communityId, page = 1, size = 10) => {
    try {
      const response = await getComments(communityId, page, size); // 올바른 API 호출
      console.log('불러온 댓글:', response.comments); // 상태 확인용 로그
      set({ comments: response.comments || [] }); // Zustand 상태 갱신
    } catch (error) {
      console.error('댓글 목록 불러오기 실패:', error);
    }
  },

  // 댓글 생성
  addComment: async (communityId, commentContent, nickName) => {
    try {
      const newComment = await addCommentAPI(communityId, commentContent, nickName);
      console.log('댓글 등록 성공:', newComment); // 로그 확인
      set((state) => ({
        comments: [...state.comments, newComment], // 상태 갱신
      }));
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
  },

  // 댓글 삭제
  deleteComment: async (communityId, commentId) => {
    try {
      await deleteCommentAPI(communityId, commentId); // 삭제 API 호출
      set((state) => ({
        comments: state.comments.filter((comment) => comment.commentId !== commentId),
      }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  },
}));

export default useCommentStore;
