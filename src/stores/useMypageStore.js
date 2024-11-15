import { create } from 'zustand';

const useMypageStore = create((set) => ({
    meetJoinList : [],

    myPostList : [],
    totalPages: 1,
    currentPage: 1,
    totalPostCount: 0,
    
    setMeetJoinList: (meets) => {
        set({ meetJoinList: meets });
    },

    setPosts: (posts) => set({ posts }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalPostCount: (totalPostCount) => set({totalPostCount}),

}));

export default useMypageStore;