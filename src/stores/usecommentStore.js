import { create } from 'zustand';
import * as commentAPI from '../api/commentAPI'; // 댓글 API 가져오기

const useCommentStore = create((set) => ({
  comments: [],

  fetchComments: async (communityId) => {
    try {
      const response = await commentAPI.getComments(communityId);
      set({ comments: response.content });
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    }
  },

  addComment: async (communityId, comment, parentId = null) => {
    try {
      const newComment = await commentAPI.createComment(communityId, comment, parentId);
      set((state) => ({ comments: [...state.comments, newComment] }));
    } catch (error) {
      console.error('댓글 생성 실패:', error);
    }
  },

  deleteComment: async (communityId, commentId) => {
    try {
      await commentAPI.deleteComment(communityId, commentId);
      set((state) => ({
        comments: state.comments.filter((c) => c.commentId !== commentId),
      }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  },
}));

export default useCommentStore;
