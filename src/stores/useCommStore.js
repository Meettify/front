import { create } from 'zustand';
import request from '../api/request'; // request를 import

const useCommStore = create((set) => ({
  posts: JSON.parse(sessionStorage.getItem('posts')) || [
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "글 내용",
      nickName: "user1",
      regTime: "2024-10-13T10:30:00",
      views: 10, // 조회수 추가
      comments: [
        {
          id: 1,
          nickName: "commenter1",
          content: "첫 번째 댓글입니다.",
          regTime: "2024-10-13T11:00:00"
        }
      ]
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "글 내용",
      nickName: "user2",
      regTime: "2024-10-13T11:30:00",
      views: 15, // 조회수 추가
      comments: []
    },
    {
      id: 3,
      title: "세 번째 게시글",
      content: "글 내용",
      nickName: "user3",
      regTime: "2024-10-13T12:00:00",
      views: 20, // 조회수 추가
      comments: [
        {
          id: 2,
          nickName: "commenter2",
          content: "세 번째 게시글에 대한 첫 번째 댓글입니다.",
          regTime: "2024-10-13T12:30:00"
        },
        {
          id: 3,
          nickName: "commenter3",
          content: "두 번째 댓글입니다.",
          regTime: "2024-10-13T12:45:00"
        }
      ]
    },
    {
      id: 4,
      title: "네 번째 게시글",
      content: "글 내용",
      nickName: "user4",
      regTime: "2024-10-13T13:00:00",
      views: 8, // 조회수 추가
      comments: []
    },
    {
      id: 5,
      title: "다섯 번째 게시글",
      content: "글 내용",
      nickName: "user5",
      regTime: "2024-10-13T13:30:00",
      views: 12, // 조회수 추가
      comments: []
    },
    {
      id: 6,
      title: "여섯 번째 게시글",
      content: "글 내용",
      nickName: "user6",
      regTime: "2024-10-13T14:00:00",
      views: 5, // 조회수 추가
      comments: []
    },
    {
      id: 7,
      title: "일곱 번째 게시글",
      content: "글 내용",
      nickName: "user7",
      regTime: "2024-10-13T14:30:00",
      views: 9, // 조회수 추가
      comments: [
        {
          id: 4,
          nickName: "commenter4",
          content: "첫 번째 댓글입니다.",
          regTime: "2024-10-13T15:00:00"
        }
      ]
    },
    {
      id: 8,
      title: "여덟 번째 게시글",
      content: "글 내용",
      nickName: "user8",
      regTime: "2024-10-13T15:30:00",
      views: 6, // 조회수 추가
      comments: []
    },
    {
      id: 9,
      title: "아홉 번째 게시글",
      content: "글 내용",
      nickName: "user9",
      regTime: "2024-10-13T16:00:00",
      views: 4, // 조회수 추가
      comments: []
    },
    {
      id: 10,
      title: "열 번째 게시글",
      content: "글 내용",
      nickName: "user10",
      regTime: "2024-10-13T16:30:00",
      views: 14, // 조회수 추가
      comments: [
        {
          id: 5,
          nickName: "commenter5",
          content: "첫 번째 댓글입니다.",
          regTime: "2024-10-13T17:00:00"
        }
      ]
    }
  ],
  selectedPost: null,

  // 커뮤니티 게시글 등록 (POST)
  createPost: async (title, content, files = []) => {
    try {
        const requestBody = new FormData();
        requestBody.append('community', JSON.stringify({ title, content }));

        files.forEach(file => {
            requestBody.append('files', file);
        });

        const { data } = await request.post('/community', requestBody, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        set((state) => ({ posts: [...state.posts, data] }));  // 새 게시글 추가
    } catch (error) {
        console.error('커뮤니티 게시글 등록 실패:', error);
    }
},

  // 게시글 선택
  selectPost: (postId) => set((state) => ({
    selectedPost: state.posts.find((post) => post.id === postId),
  })),

  // 커뮤니티 게시글 조회 (GET)
  fetchPostById: async (communityId) => {
    try {
      const { data } = await request.get(`/community/${communityId}`); // GET 요청
      set({ selectedPost: data });
    } catch (error) {
      console.error('커뮤니티 게시글 조회 실패:', error);
    }
  },

  // 게시글 수정 (PUT)
  updatePost: async (communityId, title, content, files = []) => {
    try {
      const requestBody = new FormData();
      requestBody.append('community', new Blob([JSON.stringify({ title, content })], { type: 'application/json' }));

      files.forEach(file => {
        requestBody.append('files', file);
      });

      // request를 사용하여 PUT 요청
      const { data } = await request.put(`/community/${communityId}`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set((state) => ({
        posts: state.posts.map((post) => (post.id === communityId ? data : post)),
      }));
    } catch (error) {
      console.error('커뮤니티 게시글 수정 실패:', error);
    }
  },

  // 게시글 삭제 (DELETE)
  deletePost: async (communityId) => {
    try {
      await request.delete(`/community/${communityId}`); // DELETE 요청
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== communityId),
      }));
    } catch (error) {
      console.error('커뮤니티 게시글 삭제 실패:', error);
    }
  },

  // 게시글에 댓글 추가
  addComment: (postId, comment) => set((state) => {
    const updatedPosts = state.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), comment],
        };
      }
      return post;
    });
    return { posts: updatedPosts };
  }),
}));

export default useCommStore;
