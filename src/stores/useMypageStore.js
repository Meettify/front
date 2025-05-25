import { create } from 'zustand';

const useMypageStore = create((set) => ({
    // 마이페이지 모임
    meetJoinList: [],
    hasNextMeetPage: true,
    meetJoinPage: 1,
    setHasNextMeetPage: (value) => set({ hasNextMeetPage: value }),
    setMeetJoinPage: (page) => set({ meetJoinPage: page }),

    // 마이페이지 커뮤니티
    posts : [],
    totalPages: 1,
    currentPage: 1,
    totalPostCount: 0,
    
    // 마이페이지 문의
    inquirys: [],
    inquiryTotalPages: 1,
    inquiryCurrentPage: 1,
    totalInquiryCount: 0,
    totalInquiryOkCount: 0,

    // 마이페이지 상품
    myOrderList : [],
    myOrdertotalPages: 1,
    myOrderCurrentPage: 1,
    myOrderListCount: 0,

    setMeetJoinList: (updater) =>
  set((state) => ({
    meetJoinList:
      typeof updater === 'function'
        ? updater(state.meetJoinList)
        : Array.isArray(updater)
        ? updater
        : [],
  })),

    setPosts: (posts) => set({ posts }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setCurrentPage: (currentPage) => set({ currentPage }),
    setTotalPostCount: (totalPostCount) => set({totalPostCount}),

    setInquirys: (inquirys) => set({inquirys}),
    setInquiryTotalPages: (inquiryTotalPages) => set({inquiryTotalPages}),
    setInquiryCurrentPage: (inquiryCurrentPage) => set({inquiryCurrentPage}),
    setTotalInquiryCount: (totalInquiryCount) => set({totalInquiryCount}),
    setTotalInquiryOkCount: (totalInquiryOkCount) => set({totalInquiryOkCount}),

    setMyOrderList: (updater) =>
  set((state) => ({
    myOrderList:
      typeof updater === 'function'
        ? updater(state.myOrderList)
        : Array.isArray(updater)
        ? updater
        : [],
  })),
    setMyOrdertotalPages: (myOrdertotalPages) => set({myOrdertotalPages}),
    setMyOrderCurrentPage: (myOrderCurrentPage) => set({myOrderCurrentPage}),
    setMyOrderListCount: (myOrderListCount) => set({myOrderListCount}),

}));

export default useMypageStore;