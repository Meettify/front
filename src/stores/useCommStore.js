import { create } from 'zustand';
import { getAllCommunityPosts, getCommunityPost, createCommunityPost, updateCommunityPost, deleteCommunityPost, searchCommunityPosts } from '../api/commAPI';

const useCommStore = create((set) => ({
  posts: [], // 게시물 리스트
  postDetail: null, // 개별 게시물
  loading: false,
  error: null,

  // 전체 게시물 불러오기
  fetchPosts: async (page = 1, size = 10) => {
    set({ loading: true });
    try {
      const data = await getAllCommunityPosts(page, size); // 페이지와 사이즈로 API 호출
      set({ posts: data.communities, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 개별 게시물 불러오기
  fetchPostDetail: async (communityId) => {
    set({ loading: true });
    try {
      const data = await getCommunityPost(communityId);
      console.log("게시글 데이터:", data); // 서버 응답 확인
      set({ postDetail: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 게시물 생성
  createPost: async (title, content, files) => {
    set({ loading: true });
    try {
      await createCommunityPost(title, content, files);
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 게시물 수정
  updatePost: async (communityId, title, content, remainImgId, files) => {
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
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 게시물 검색
  searchPosts: async (page, size, sort) => {
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
