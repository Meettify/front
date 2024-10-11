import { create } from 'zustand';
import request from '../api/request';

const useCommStore = create((set) => ({
    posts: JSON.parse(sessionStorage.getItem('posts')) || [
        { id: 1, title: "첫 번째 글", author: "사용자1", date: "2024. 10. 01", views: 25, replies: 4 },
        { id: 2, title: "두 번째 글", author: "사용자2", date: "2024. 10. 02", views: 30, replies: 5 },
    ],
    setPosts: (newPosts) => {
        sessionStorage.setItem('posts', JSON.stringify(newPosts));
        set({ posts: newPosts });
    },
    addPost: (newPost) => set((state) => {
        const updatedPosts = [...state.posts, { ...newPost, id: state.posts.length + 1 }];
        sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
        return { posts: updatedPosts };
    }),
    title: sessionStorage.getItem('title') || '',
    setTitle: (newTitle) => {
        sessionStorage.setItem('title', newTitle);
        set({ title: newTitle });
    },
    content: sessionStorage.getItem('content') || '',
    setContent: (newContent) => {
        sessionStorage.setItem('content', newContent);
        set({ content: newContent });
    },
    resetEditor: () => {
        sessionStorage.removeItem('title');
        sessionStorage.removeItem('content');
        set({ title: '', content: '' });
    },
    files: [], // 파일 상태 추가
    setFiles: (newFiles) => set({ files: newFiles }), // 파일 설정 함수 추가
}));

export default useCommStore;
