// useCommStore.js
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

const useCommStore = create((set) => ({
  posts: [], 
  postDetail: null, 
  loading: false,
  error: null,
  
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

  // 게시물 상세 조회
  fetchPostDetail: async (communityId) => {
    set({ loading: true });
    try {
      const postDetail = await getCommunityPost(communityId); // Redis와 DB 조회수 동기화는 백엔드에서 처리
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
      console.error('게시글 수정 오류:', error);
      set({ error, loading: false });
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
