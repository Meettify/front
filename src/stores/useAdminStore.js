import { create } from 'zustand';
import { getItemList, createItem, deleteItem } from '../api/adminAPI';

const useAdminStore = create((set) => ({
    itemList: [],
    loading: false,
    error: null,

    // **상품 목록 조회 함수**
    fetchItemList: async (page = 1, size = 10) => {
        set({ loading: true });
        try {
            const items = await getItemList(page, size);
            set({ itemList: items, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // **상품 생성 함수**
    addItem: async (itemData, files) => {
        set({ loading: true });
        try {
            const newItem = await createItem(itemData, files);
            set((state) => ({
                itemList: [...state.itemList, newItem],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // **상품 삭제 함수**
    removeItem: async (itemId) => {
        set({ loading: true });
        try {
            await deleteItem(itemId);
            set((state) => ({
                itemList: state.itemList.filter((item) => item.itemId !== itemId),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useAdminStore;
