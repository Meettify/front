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
  totalPages: 0,  // totalPages 상태 추가
  loading: false,
  error: null,
  meetId: null,
  setMeetId: (id) => set({ meetId: id }),
  setMeetBoardId: (id) => set({ meetBoardId: id }),
  setPostDetail: (detail) => set({ postDetail: detail }),
  setMeetBoardPermission: (permission) => set({ meetBoardPermission: permission }),
  setLoading: (loading) => set({ loading }),

  fetchPosts: async (page = 0, size = 1, sort = 'desc', meetId) => {
      set({ loading: true, posts: [] });
      try {
          console.log(`Fetching posts from API - Page: ${page}, Size: ${size}, Sort: ${sort}, meetId : ${meetId}`);

          // MeetBoardList 호출하여 데이터를 받아옴
          const response = await MeetBoardList(meetId, page, size, sort);

          // 응답 데이터를 content와 totalPages로 분리
          const content = response.content || [];
          const totalPages = response.totalPages || 0;

          console.log('API Response:', response);

          // 상태 업데이트
          set({
              posts: content,
              totalPages: totalPages,   // totalPages 상태 업데이트
              loading: false,
          });

          // content와 totalPages 반환
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
      // getMeetBoardDetail 호출로 API 데이터 받아오기
      const { meetBoardDetailsDTO, meetBoardPermission, comments } = await getMeetBoardDetail(meetBoardId);

      // 응답에서 반환된 데이터 구조에 맞게 상태 업데이트
      // 빈 배열 처리 (댓글과 이미지)
      meetBoardDetailsDTO.images = meetBoardDetailsDTO.images || [];
      meetBoardDetailsDTO.comments = meetBoardDetailsDTO.comments || [];

      // 상태 업데이트
      set({
        postDetail: {
            ...meetBoardDetailsDTO,
            comments: comments || [],
        },
        meetBoardPermission,
        loading: false,
      });
    } catch (error) {
      console.error('게시물 상세 조회 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },


  
  //게시글 작성
  createPost: async (formData, meetId) => {
    set({ loading: true });
    try {
        const response = await postMeetBoardInsert(formData, meetId);
        console.log('API 응답:', response);  // 응답 내용 확인
        console.log('response.success:', response.success);
        console.log('response.data:', response.data);
        // 응답에서 success와 data를 정확히 확인
        if (response.success && response.data) {
            console.log('게시글 작성 성공:', response.data);
            set((state) => ({
                posts: [...state.posts, response.data]  // 새 게시글 추가
            }));
            return response;  // 정상적으로 반환
        } else {
            throw new Error('게시글 작성에 실패했습니다. 응답에 문제가 있습니다.');
        }
    } catch (error) {
        set({ error: error.message });
        console.error('게시글 작성 오류:', error.message);
        throw error;  // 에러 던지기
    } finally {
        set({ loading: false });
    }
  },

  // 게시물 수정
  updatePost: async (meetId, title, content, remainImgId = [], files = []) => {
    set({ loading: true });
    try {
      await updateMeetBoard(meetId, title, content, remainImgId, files);
      set({ loading: false });
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      set({ error, loading: false });
    }
  },  

  deletePost: async (meetBoardId, meetId) => {
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
      console.log(`meetBoardId : ${meetBoardId}   ,    meetId : ${meetId}`)
      // 게시물 삭제
      await deleteMeetBoard(meetBoardId, meetId);


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
