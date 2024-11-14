import create from 'zustand';

const useSearchStore = create((set) => ({
    isSearchVisible: false,  // 초기에는 검색창을 숨김
    setSearchVisibility: (isVisible) => set({ isSearchVisible: isVisible }), // 토글 상태 변경 함수
}));

export default useSearchStore;