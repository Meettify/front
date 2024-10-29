import { create } from 'zustand';
import {
  getAllCommunityPosts,
  getCommunityPost,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  searchCommunityPosts,
} from '../api/commAPI';

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

// 게시물 수정
updatePost: async (communityId, title, content, remainImgId = [], files = []) => {
  set({ loading: true });
  try {
    await updateCommunityPost(communityId, title, content, remainImgId, files);
    set({ loading: false });
  } catch (error) {
    set({ error, loading: false });
  }
},

// 게시물 삭제
deletePost: async (communityId) => {
  set({ loading: true });
  try {
    await deleteCommunityPost(communityId);
    set((state) => ({
      posts: state.posts.filter((post) => post.boardId !== communityId),
      loading: false,
    }));
  } catch (error) {
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
