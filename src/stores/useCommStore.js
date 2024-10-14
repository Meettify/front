import { create } from 'zustand';
import {
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  getCommunityPost,
  searchCommunityPosts,
  getAllCommunityPosts, // 전체 게시글 가져오기 함수 추가
} from '../api/commAPI'; 

const useCommStore = create((set, get) => ({
  posts: [],
  selectedPost: null,

  // 커뮤니티 게시글 등록 (POST)
  createPost: async (title, content, files = []) => {
    try {
      await createCommunityPost(title, content, files);
      // 게시글 작성 후 목록 다시 불러오기
      await get().fetchPosts(); // get()을 사용하여 상태의 fetchPosts 호출
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

  // 커뮤니티 게시글 검색 (GET)
  searchPosts: async (page, size, sort = []) => {
    try {
      const data = await searchCommunityPosts(page, size, sort);
      set({ posts: data.content });
    } catch (error) {
      console.error('커뮤니티 게시글 검색 실패:', error);
    }
  },

  // 커뮤니티 게시글 조회 (GET)
  fetchPost: async (communityId) => {
    try {
      const data = await getCommunityPost(communityId);
      set({ selectedPost: data });
    } catch (error) {
      console.error('커뮤니티 게시글 조회 중 오류 발생:', error);
    }
  },

  // 커뮤니티 게시글 목록 전체 가져오기 (GET)
  fetchPosts: async () => {
    try {
      const data = await getAllCommunityPosts(); // 서버에서 전체 게시글 가져오기
      set({ posts: data }); // 상태에 게시글 목록 저장
    } catch (error) {
      console.error('게시글 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
  },
}));

export default useCommStore;
