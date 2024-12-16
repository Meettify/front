import { create } from 'zustand';
import { getItemList, createItem, deleteItem, getItemDetail } from '../api/adminAPI';

const useAdminStore = create((set) => ({
    itemList: [],
    memberList: [], // 초기값을 빈 배열로 설정
    loading: false,
    error: null,

// 상품 목록 조회 함수
fetchItemList: async (page = 1, size = 10) => {
    set({ loading: true });
    try {
        const items = await getItemList(page, size);
        console.log('Fetched items:', items); // 디버깅용 콘솔
        // 재고 수량이 0 이상인 상품만 필터링
        const sellItems = items.filter(item => item.itemStatus === 'SELL' && item.itemCount > 0);
        console.log('Filtered SELL items with available stock:', sellItems); // 디버깅용 콘솔
        set({ itemList: sellItems, loading: false });
    } catch (error) {
        console.error('Error fetching item list:', error);
        set({ error: error.message, loading: false });
    }
},
    
    // 상품 상세 조회 함수
     fetchItemDetail: async (itemId) => {
        set({ loading: true, itemDetail: null }); // 초기화 및 로딩 시작
        try {
            const detail = await getItemDetail(itemId);
            set({ itemDetail: detail, loading: false });
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
