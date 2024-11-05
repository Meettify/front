import { create } from 'zustand';
import {
  getAllCommunityPosts,
  getCommunityPost,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  searchCommunityPosts,
} from '../api/commAPI';
import { getComments, deleteComment } from '../api/commentAPI';

// Zustand store 정의
const useCommStore = create((set) => ({
  posts: [],  // 게시물 리스트
  postDetail: null, // 개별 게시물
  loading: false,
  error: null,

  // 조회수 증가 후 상태 동기화
  increasePostViewCount: (communityId) => {
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.boardId === communityId
          ? { ...post, viewCount: post.viewCount + 1 }
          : post
      );

      const updatedPostDetail =
        state.postDetail?.boardId === communityId
          ? { ...state.postDetail, viewCount: state.postDetail.viewCount + 1 }
          : state.postDetail;

      return { posts: updatedPosts, postDetail: updatedPostDetail };
    });
  },
  
   // 전체 게시물 조회
   fetchPosts: async (page = 1, size = 10) => {
    set({ loading: true });
    try {
      const response = await getAllCommunityPosts(page, size); // 목록 가져오기
      const { communities, totalPage } = response;

      set({
        posts: communities,
        loading: false,
      });

      return totalPage; // 총 페이지 수 반환
    } catch (error) {
      console.error('페이지 데이터 가져오기 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },

  // 게시물 상세 조회 및 조회수 동기화
  fetchPostDetail: async (communityId) => {
    set({ loading: true });
    try {
      const postDetail = await getCommunityPost(communityId); // Redis와 DB 조회수 동기화
      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.boardId === communityId
            ? { ...post, viewCount: postDetail.viewCount } // 조회수 동기화
            : post
        );

        return {
          posts: updatedPosts,
          postDetail,
          loading: false,
        };
      });
    } catch (error) {
      console.error('게시물 상세 조회 실패:', error);
      set({ error, loading: false });
      throw error;
    }
  },
  
  // 게시물 생성
  createPost: async (title, content, files = []) => {
    set({ loading: true });
    try {
      await createCommunityPost(title, content, files);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

// 게시물 수정 함수 (Zustand store 내 정의)
updatePost: async (communityId, title, content, remainImgId = [], files = []) => {
  set({ loading: true }); // 로딩 상태 설정
  try {
      // 호출된 함수에 대해 로그를 추가하여 인자 확인
      console.log('updatePost 호출:', { communityId, title, content, remainImgId, files });
      await updateCommunityPost(communityId, title, content, remainImgId, files);
      set({ loading: false }); // 로딩 완료 후 상태 초기화
  } catch (error) {
      console.error('게시글 수정 오류:', error);
      set({ error, loading: false }); // 오류 처리
  }
},
updatePost: async (communityId, title, content, remainImgId = []) => {
    set({ loading: true }); // 로딩 상태 설정
    try {
      await updateCommunityPost(communityId, title, content, remainImgId); // 업데이트 요청
      set({ loading: false }); // 로딩 완료 후 상태 초기화
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      set({ error, loading: false }); // 오류 처리
    }
  },
  
  deletePost: async (communityId) => {
    set({ loading: true });
    try {
      let page = 1;
      let hasNextPage = true;
  
      // 모든 댓글을 페이지별로 가져와 삭제
      while (hasNextPage) {
        const commentsResponse = await getComments(communityId, page);
        const comments = commentsResponse.comments || [];
        const isLastPage = commentsResponse.isLastPage;
  
        // 현재 페이지의 댓글 삭제
        await Promise.all(
          comments.map((comment) =>
            deleteComment(communityId, comment.commentId).then(() =>
              console.log(`댓글 ID ${comment.commentId} 삭제 완료`)
            )
          )
        );
  
        // 다음 페이지로 이동
        hasNextPage = !isLastPage;
        page++;
      }
  
      // 모든 댓글 삭제 후 게시물 삭제
      await deleteCommunityPost(communityId);
  
      // 상태에서 게시물 제거
      set((state) => ({
        posts: state.posts.filter((post) => post.boardId !== communityId),
        loading: false,
      }));
  
      console.log('게시물 및 모든 댓글 삭제 완료');
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error);
      set({ error, loading: false });
    }
  },  

  // 게시물 검색
  searchPosts: async (page = 1, size = 10, sort = []) => {
    set({ loading: true });
    try {
      const data = await searchCommunityPosts(page, size, sort);
      set({ posts: data.communities, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default useCommStore;
