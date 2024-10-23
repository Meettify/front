import { create } from 'zustand';
import { 
  getAllCommunityPosts, 
  getCommunityPost, 
  createCommunityPost, 
  updateCommunityPost, 
  deleteCommunityPost, 
  searchCommunityPosts ,
  getRedisViewCount,
} from '../api/commAPI';

const useCommStore = create((set) => ({
  posts: [], // 게시물 리스트
  postDetail: null, // 개별 게시물
  loading: false,
  error: null,

  // 전체 게시물 불러오기
   // 전체 게시물 불러오기
   fetchPosts: async (page = 1, size = 10) => {
    set({ loading: true });
    try {
      const data = await getAllCommunityPosts(page, size);
      console.log('API 응답:', data);

      const postsWithViewCount = await Promise.all(
        data.communities.map(async (post) => {
          const redisViewCount = await getRedisViewCount(post.boardId); // Redis 조회수 불러오기
          return { ...post, viewCount: redisViewCount };
        })
      );

      set({ posts: postsWithViewCount, loading: false });
    } catch (error) {
      console.error('페이지 데이터 가져오기 실패:', error);
      set({ error, loading: false });
    }
  },
  
  fetchPostDetail: async (communityId) => {
    console.log(`fetchPostDetail 호출됨, ID: ${communityId}`); // 디버깅용 로그
    set({ loading: true });
    try {
        const data = await getCommunityPost(communityId);
        console.log(`API로부터 받아온 게시글 데이터:`, data); // API 응답 로그
        set({ postDetail: data, loading: false });
        return data; // 상세 데이터를 반환
    } catch (error) {
        console.error('게시글 불러오기 실패:', error);
        set({ error, loading: false });
        throw error;
    }
},

increasePostViewCount: (communityId) => {
  console.log(`increasePostViewCount 호출됨, ID: ${communityId}`);
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

      console.log('업데이트된 posts:', updatedPosts);
      console.log('업데이트된 postDetail:', updatedPostDetail);

      return {
          posts: updatedPosts,
          postDetail: updatedPostDetail,
      };
  });
},

// 게시물 목록 업데이트 함수
updatePostInList: (updatedPost) => {
  set((state) => ({
      posts: state.posts.map((post) =>
          post.boardId === updatedPost.boardId ? updatedPost : post
      ),
  }));
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
