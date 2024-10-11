import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCommStore = create(
    persist(
        (set) => ({
            posts: [
                { id: 1, title: "첫 번째 글", author: "사용자1", date: "2024. 10. 01", views: 25, replies: 4 },
                { id: 2, title: "두 번째 글", author: "사용자2", date: "2024. 10. 02", views: 30, replies: 5 },
                { id: 3, title: "세 번째 글", author: "사용자3", date: "2024. 10. 03", views: 10, replies: 2 },
                { id: 4, title: "네 번째 글", author: "사용자4", date: "2024. 10. 04", views: 15, replies: 3 },
                { id: 5, title: "다섯 번째 글", author: "사용자5", date: "2024. 10. 05", views: 20, replies: 1 },
            ],
            addPost: (newPost) => set((state) => ({
                posts: [...state.posts, { ...newPost, id: state.posts.length + 1 }]
            })),
            title: '',
            setTitle: (newTitle) => set({ title: newTitle }),
            content: '',
            setContent: (newContent) => set({ content: newContent }),
            titlePlaceholder: '제목을 입력하세요',
            setTitlePlaceholder: (newPlaceholder) => set({ titlePlaceholder: newPlaceholder }),
            editorFocused: false,
            setEditorFocused: (isFocused) => set({ editorFocused: isFocused }),
            resetEditor: () => set({ title: '', content: '', titlePlaceholder: '제목을 입력하세요' }),
        }),
        {
            name: 'comm-storage', // 로컬 스토리지에 저장될 키
            getStorage: () => localStorage, // 로컬 스토리지 사용
        }
    )
);

export default useCommStore;
