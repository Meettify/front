import { create } from 'zustand';

const useAdminMainStore = create((set) => ({
    // 관리자 모든 회원
    allMemberLists : [],
    allMembersCount : 0,
    todayMemberCount: 0,
    totalMemberListsPage: 0,

    // 관리자 모든 문의글
    allQuestionLists : [],
    totalQuestions : 0,
    completedReplies : 0,
    pendingReplies : 0,

    // 관리자 모든 커뮤니티글
    allCommunityPostsCount : 0,
    todayPostsCount : 0,

    // 관리자 모든 주문
    allOrdersCount : 0,

    //관리자 모든 상품 수
    allItemsCount : 0,

    setAllMemberLists: (allMemberLists) => {set({allMemberLists: allMemberLists})},
    setAllMembersCount: (allMembersCount) => {set({allMembersCount: allMembersCount})},
    setTodayMemberCount: (todayMemberCount) => {set({todayMemberCount: todayMemberCount})},
    setTotalMemberListsPage: (totalMemberListsPage) => {set({totalMemberListsPage: totalMemberListsPage})},

    setAllQuestionLists: (allQuestionLists) => {set({allQuestionLists: allQuestionLists})},
    setTotalQuestions: (totalQuestions) => {set({totalQuestions: totalQuestions})},
    setCompletedReplies: (completedReplies) => {set({completedReplies: completedReplies})},
    setPendingReplies: (pendingReplies) => {set({pendingReplies: pendingReplies})},

    setAllCommunityPostsCount: (allCommunityPostsCount) => {set({allCommunityPostsCount: allCommunityPostsCount})},
    setTodayPostsCount: (todayPostsCount) => {set({todayPostsCount: todayPostsCount})},

    setAllOrdersCount: (allOrdersCount) => {set({allOrdersCount: allOrdersCount})},

    setAllItemsCount: (allItemsCount) => {set({allItemsCount: allItemsCount})},

}));

export default useAdminMainStore;