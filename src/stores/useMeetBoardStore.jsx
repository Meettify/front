import { create } from 'zustand';
import {
    MeetBoardList,
    getMeetBoardDetail,
    postMeetBoardInsert,
    updateMeetBoard,
    deleteMeetBoard
} from '../api/meetAPI';
import { deleteComment } from '../api/meetCommentAPI';

const useMeetBoardStore = create((set) => ({
  posts: [], 
  postDetail: null, 
  loading: false,
  error: null,
  meetId: null,
  setMeetId: (id) => set({ meetId: id }),

  fetchPosts: async (page = 0, size = 1, sort = 'desc', meetId) => {
    set({ loading: true, posts: [] }); // 이전 상태 초기화
    try {
        console.log(`Fetching posts from API - Page: ${page}, Size: ${size}, Sort: ${sort}`);
        
        // MeetBoardList 호출하여 데이터를 받아옴
        const response = await MeetBoardList(meetId, page, size, sort);
        
        // API 응답을 'content'와 'totalPages' 형식으로 변환
        const content = response.meetBoards || [];  // meetBoards를 content로
        const totalPages = response.totalPage || 0; // totalPage를 totalPages로
        
        console.log('API Response:', response);
        
        // 상태 업데이트
        set({
            posts: content,    // content (게시글 목록)
            loading: false,
        });

        // 'content'와 'totalPages'를 반환
        return {
            content,
            totalPages
        };
    } catch (error) {
        console.error('페이지 데이터 가져오기 실패:', error);
        set({ error, loading: false });
        throw error;
    }
},

// 게시물 상세 조회
fetchPostDetail: async (meetBoardId) => {
  set({ loading: true });
  try {
    const postDetail = await getMeetBoardDetail(meetBoardId); // Redis와 DB 조회수 동기화는 백엔드에서 처리
    
    // images가 없거나 비어 있으면 빈 배열로 설정
    postDetail.images = postDetail.images || [];

    set({
      postDetail,
      loading: false,
    });
  } catch (error) {
    console.error('게시물 상세 조회 실패:', error);
    set({ error, loading: false });
    throw error;
  }
},
  
  // 게시물 생성
  createPost: async (formData) => {
    try {
        const response = await postMeetBoardInsert(formData);  // `postMeetBoardInsert` 호출
        return response;  // 응답 반환
    } catch (error) {
        console.error('게시글 작성 오류:', error);
        throw error;
    }
  },


  // 게시물 수정
  updatePost: async (meetBoardId, title, content, images, remainImgId = [], files = []) => {
    set({ loading: true });
    try {
      await updateMeetBoard(formData);
      set({ loading: false });
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      set({ error, loading: false });
    }
  },
  

  deletePost: async (meetBoardId) => {
    set({ loading: true });
    try {
      const { postDetail } = get(); // 상태에서 게시물 디테일 가져오기
      const comments = postDetail?.comments || []; // 댓글 목록 가져오기

      // 댓글 삭제
      await Promise.all(
        comments.map((comment) =>
          deleteComment(comment.commentId).then(() =>
            console.log(`댓글 ID ${comment.commentId} 삭제 완료`)
          )
        )
      );

      // 게시물 삭제
      await deleteMeetBoard(meetBoardId);

      // 상태에서 게시물 제거
      set((state) => ({
        posts: state.posts.filter((post) => post.boardId !== meetBoardId),
        loading: false,
      }));

      console.log('게시물 및 모든 댓글 삭제 완료');
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error);
      set({ error, loading: false });
    }
  },


}));

export default useMeetBoardStore;
