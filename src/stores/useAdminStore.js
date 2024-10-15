import { create } from 'zustand';
import { createItem, getAllItems, getItemDetail } from '../api/adminAPI';

const useAdminStore = create((set) => ({
    itemList: [],  // 상품 목록 상태
    loading: false,
    error: null,

    // 전체 상품 조회 함수
    fetchAllItemsWithDetails: async () => {
      set({ loading: true }); // 로딩 상태 설정
      try {
          const response = await getAllItems(); // 모든 상품 조회 API 호출
          console.log('Fetched items:', response); // API 응답 확인
          set({ itemList: response.items, loading: false }); // 상품 목록 업데이트
      } catch (error) {
          set({ error: error.message, loading: false }); // 에러 처리
          console.error('상품 목록 조회 중 오류:', error);
      }
  },  

    // 상품 상세 조회
    fetchItemDetail: async (itemId) => {
        set({ loading: true });
        try {
            const item = await getItemDetail(itemId);
            return item;
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // 상품 추가 함수
    addItem: async (itemData, files) => {
        set({ loading: true }); // 로딩 상태 설정
        try {
            const newItem = await createItem(itemData, files); // API 호출
            set((state) => ({
                itemList: [...state.itemList, newItem], // 새 상품 추가
                loading: false, // 로딩 완료
            }));
        } catch (error) {
            set({ error: error.message, loading: false }); // 에러 처리
            console.error('상품 추가 중 오류:', error);
        }
    },

    // 상품 삭제
    deleteItem: async (itemId) => {
        await deleteItem(itemId);
        set((state) => ({
            itemList: state.itemList.filter(item => item.itemId !== itemId),
        }));
    },
}));

export default useAdminStore;
