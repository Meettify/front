import { create } from 'zustand';
import { createComment, getComments, updateComment,deleteComment } from '../api/commentAPI';
import * as commentAPI from '../api/commentAPI'; // 모든 named export 가져오기

const useCommentStore = create((set) => ({
  comments: [], // 초기화 시 빈 배열로 설정
  error: null,

fetchComments: async (communityId, page = 1) => {
  try {
    const response = await commentAPI.getComments(communityId, page);
    set({
      comments: response.comments || [],
      pagination: {
        totalPage: response.totalPage,
        nowPageNumber: response.nowPageNumber,
        pageSize: response.pageSize,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
        isFirstPage: response.isFirstPage,
        isLastPage: response.isLastPage,
      },
    });
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    set({ error });
  }
},


  // 댓글 추가
  addComment: async (communityId, comment, parentId = null) => {
    try {
      const newComment = await commentAPI.createComment(communityId, comment, parentId);
    } catch (error) {
      console.error('댓글 생성 실패:', error);
      set({ error });
    }
  },

  // 댓글 수정
  updateComment: async (communityId, commentId, newContent) => {
    try {
      await commentAPI.updateComment(communityId, commentId, newContent);
      set((state) => ({
        comments: state.comments.map((c) =>
          c.commentId === commentId ? { ...c, comment: newContent } : c
        ),
      }));
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      set({ error });
    }
  },

  // 댓글 삭제
  deleteComment: async (communityId, commentId) => {
    try {
      await commentAPI.deleteComment(communityId, commentId);
      set((state) => ({
        comments: state.comments.filter((c) => c.commentId !== commentId),
      }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      set({ error });
    }
  },
}));

export default useCommentStore;
