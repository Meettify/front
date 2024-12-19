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
        console.log(`Fetching posts from API - Page: ${page}, Size: ${size}, Sort: ${sort}, meetId : ${meetId}`);
        
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
  
  // 게시글 생성
//   createPost: async (formData, meetId) => {
//     try {
//       console.log("게시글 생성 시 meetId:", meetId);  // meetId 값 확인
//       const response = await postMeetBoardInsert(formData); 
//       set({ posts: [...response], loading: false });  // 새로운 게시글 리스트로 상태 업데이트
//   } catch (error) {
//       console.error('게시글 작성 오류:', error);
//       set({ error, loading: false });  // 오류 상태 업데이트
//   }
// },
createPost: async (formData, meetId) => {
  set({ loading: true });
  try {
      // API 호출: 게시글 작성
      const response = await postMeetBoardInsert(formData, meetId);

      // 서버로부터 받은 JSON 데이터 처리
      if (response && response.success) {
          // 성공적으로 게시글을 작성했으면, 로컬 상태 업데이트
          set({ posts: [...posts, response.post] });  // 예시: 서버에서 받은 'post' 객체 추가
          return response;  // API 응답 데이터 반환
      } else {
          throw new Error(response.message || '게시글 작성에 실패했습니다.');
      }
  } catch (error) {
      set({ error: error.message });
      console.error('게시글 작성 오류:', error.message);
      throw error; // 외부에서 에러를 처리할 수 있도록 던짐
  } finally {
      set({ loading: false });
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
