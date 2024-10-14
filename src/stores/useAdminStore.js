import { create } from 'zustand';
import adminAPI from '../api/adminAPI';

const useAdminStore = create((set) => ({
  itemList: [],  // 상품 목록 상태
  loading: false,
  error: null,

  // 상태 업데이트 함수
  setItemList: (newItemList) => set({ itemList: newItemList }),

  // 모든 상품의 상세 정보 가져오기
  fetchAllItemsWithDetails: async () => {
    set({ loading: true });
    try {
      // 모든 상품의 정보를 가져옴
      const items = await adminAPI.getAllItems();  // getAllItems 함수 호출
      // 상태 업데이트
      set({ itemList: items, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  // 상품 등록
  addItem: async (itemData) => {
    await adminAPI.createItem(itemData);
    set((state) => ({ itemList: [...state.itemList, itemData] }));
  },

  // 상품 수정
  updateItem: async (itemId, updatedData) => {
    await adminAPI.updateItem(itemId, updatedData);
  },

  // 상품 삭제
  deleteItem: async (itemId) => {
    await adminAPI.deleteItem(itemId);
    set((state) => ({ itemList: state.itemList.filter(item => item.itemId !== itemId) }));
  }
}));

export default useAdminStore;
