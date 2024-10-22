import { create } from 'zustand';
import { getComments, createComment, deleteComment } from '../api/commentAPI';

const useCommentStore = create((set) => ({
    comments: [],
    loading: false,
    error: null,

    // 댓글 목록 불러오기
    fetchComments: async (communityId) => {
        console.log('fetchComments 호출됨, communityId:', communityId); // 디버깅 로그
        set({ loading: true });
        try {
            const data = await getComments(communityId);
            console.log('가져온 댓글 데이터:', data); // 댓글 데이터 로그
            set({ comments: data, loading: false });
        } catch (error) {
            console.error('댓글 목록 조회 중 오류:', error); // 오류 로그
            set({ error: '댓글 조회 중 오류가 발생했습니다.', loading: false });
        }
    },

    // 댓글 추가
    addComment: async (communityId, commentContent) => {
        console.log('addComment 호출됨:', communityId, commentContent); // 디버깅 로그
        try {
            const newComment = await createComment(communityId, commentContent);
            console.log('새로운 댓글 추가 성공:', newComment); // 성공 로그
            set((state) => ({
                comments: [...state.comments, newComment],
            }));
        } catch (error) {
            console.error('댓글 추가 중 오류:', error); // 오류 로그
        }
    },

    // 댓글 삭제
    deleteCommentInStore: async (communityId, commentId) => {
        console.log('deleteCommentInStore 호출됨:', communityId, commentId); // 디버깅 로그
        try {
            await deleteComment(communityId, commentId);
            console.log(`댓글 ID ${commentId} 삭제 완료`); // 삭제 완료 로그
            set((state) => ({
                comments: state.comments.filter((c) => c.commentId !== commentId),
            }));
        } catch (error) {
            console.error('댓글 삭제 중 오류:', error); // 오류 로그
        }
    },
}));

export default useCommentStore;
