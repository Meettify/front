import { create } from 'zustand';
import * as meetCommentAPI from '../api/meetCommentAPI'; // 모든 named export 가져오기

const useMeetCommentStore = create((set) => ({
    comments: [], // 댓글 배열
    error: null,  // 에러 상태

    //댓글 등록 
    addComment: async (meetId, meetBoardId, commentContent) => {
        try {
            const token = getAuthToken(); // 인증 토큰 가져오기
            const response = await axios.post(
                `${BASE_URL}/meetBoardComments/meets/${meetId}/boards/${meetBoardId}/comments`, 
                { content: commentContent },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response.data; // 성공 시 서버 응답 데이터 반환
        } catch (error) {
            console.error("댓글 추가 오류:", error);
            throw error; // 에러 발생 시 에러 던지기
        }
    },
      
    
  // 댓글 수정
  updateComment: async (meetBoardId, commentId, newContent) => {
    try {
      await meetCommentAPI.updateComment(meetBoardId, commentId, newContent); // 댓글 수정 API 호출
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
  deleteComment: async (meetBoardId, commentId) => {
    try {
      await meetCommentAPI.deleteComment(meetBoardId, commentId); // 댓글 삭제 API 호출
      set((state) => ({
        comments: state.comments.filter((c) => c.commentId !== commentId), // 삭제된 댓글 제거
      }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      set({ error });
    }
  },
}));

export default useMeetCommentStore;
