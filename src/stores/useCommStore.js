import { create } from 'zustand';
import { 
  getAllCommunityPosts, 
  getCommunityPost, 
  createCommunityPost, 
  updateCommunityPost, 
  deleteCommunityPost, 
  searchCommunityPosts 
} from '../api/commAPI';

const useCommStore = create((set) => ({
  posts: [], // 게시물 리스트
  postDetail: null, // 개별 게시물
  loading: false,
  error: null,

  // 전체 게시물 불러오기
  fetchPosts: async (page = 1, size = 10) => {
    set({ loading: true });
    try {
        const data = await getAllCommunityPosts(page, size);
        console.log('API 응답:', data); // 응답 데이터 확인
        const { communities = [], totalPage = 1 } = data;
        set({ posts: communities, loading: false });
        return totalPage; // 전체 페이지 수 반환
    } catch (error) {
        set({ error, loading: false });
        throw error; // 에러를 상위에서 처리하도록 던지기
    }
},

  // 개별 게시물 불러오기
  fetchPostDetail: async (communityId) => {
    set({ loading: true });
    try {
      const data = await getCommunityPost(communityId);
      set({ postDetail: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
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
      set({ loading: false });
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
