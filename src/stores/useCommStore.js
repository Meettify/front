import create from 'zustand';
import { createCommunityPost, updateCommunityPost, deleteCommunityPost, getCommunityPost, searchCommunityPosts } from '../api/commAPI';

const useCommStore = create((set) => ({
  posts: [],
  selectedPost: null,

  // 커뮤니티 게시글 등록 (POST)
  createPost: async (title, content, files = []) => {
    try {
      const data = await createCommunityPost(title, content, files);
      set((state) => ({ posts: [...state.posts, data] }));
    } catch (error) {
      console.error('커뮤니티 게시글 등록 실패:', error);
    }
  },

  // 커뮤니티 게시글 수정 (PUT)
  updatePost: async (communityId, title, content, files = []) => {
    try {
      const data = await updateCommunityPost(communityId, title, content, files);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === communityId ? data : post)),
      }));
    } catch (error) {
      console.error('커뮤니티 게시글 수정 실패:', error);
    }
  },

  // 커뮤니티 게시글 삭제 (DELETE)
  deletePost: async (communityId) => {
    try {
      await deleteCommunityPost(communityId);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== communityId),
      }));
    } catch (error) {
      console.error('커뮤니티 게시글 삭제 실패:', error);
    }
  },

  // 커뮤니티 게시글 조회 (GET)
  fetchPost: async (communityId) => {
    try {
      const data = await getCommunityPost(communityId);
      set({ selectedPost: data });
    } catch (error) {
      console.error('커뮤니티 게시글 조회 실패:', error);
    }
  },

  // 커뮤니티 게시글 검색 (GET)
  searchPosts: async (page, size, sort = []) => {
    try {
      const data = await searchCommunityPosts(page, size, sort);
      set({ posts: data.content });
    } catch (error) {
      console.error('커뮤니티 게시글 검색 실패:', error);
    }
  },
}));

export default useCommStore;
