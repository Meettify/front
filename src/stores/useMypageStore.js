import { create } from 'zustand';

const useMypageStore = create((set) => ({
    meetJoinList : [],

    posts : [],
    totalPages: 1,
    currentPage: 1,
    totalPostCount: 0,
    
    inquirys: [],
    inquiryTotalPages: 1,
    inquiryCurrentPage: 1,
    totalInquiryCount: 0,
    totalInquiryOkCount: 0,

    setMeetJoinList: (meets) => {set({ meetJoinList: meets });},

    setPosts: (posts) => set({ posts }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalPostCount: (totalPostCount) => set({totalPostCount}),

    setInquirys: (inquirys) => set({inquirys}),
    setInquiryTotalPages: (inquiryTotalPages) => set({inquiryTotalPages}),
    setInquiryCurrentPage: (inquiryCurrentPage) => set({inquiryCurrentPage}),
    setTotalInquiryCount: (totalInquiryCount) => set({totalInquiryCount}),
    setTotalInquiryOkCount: (totalInquiryOkCount) => set({totalInquiryOkCount}),

}));

export default useMypageStore;