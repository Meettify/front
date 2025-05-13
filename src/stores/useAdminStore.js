import { create } from 'zustand';
import { getItemList, createItem, deleteItem, getItemDetail, getTopItems } from '../api/adminAPI';
import axios from 'axios';

const useAdminStore = create((set) => ({
    itemList: [],
    memberList: [], // 초기값을 빈 배열로 설정
    topItems: [],
    loading: false,
    error: null,

    fetchItemList: async (page = 1, size = 10, sort = 'desc', sortBy = 'itemId') => {
        set({ loading: true });
        try {
            const items = await getItemList(page, size);
            console.log('Fetched items:', items); // Debugging console log
    
            const sellItems = items.filter(item => item.itemStatus === 'SELL' && item.itemCount > 0);
            console.log('Filtered SELL items with available stock:', sellItems); // Debugging console log
    
            const sortedItems = [...sellItems].sort((a, b) => {
                if (sortBy === 'itemId') {
                    return sort === 'desc' ? b.itemId - a.itemId : a.itemId - b.itemId;
                } else if (sortBy === 'createdAt') {
                    return sort === 'desc'
                        ? new Date(b.createdAt) - new Date(a.createdAt)
                        : new Date(a.createdAt) - new Date(b.createdAt);
                }
            });
            console.log('Sorted items:', sortedItems); // Debugging console log
    
            set({ itemList: sortedItems, loading: false });
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

    fetchSearchList: async (page = 1, size = 10, sort = 'desc', searchQuery = '') => {
    set({ loading: true });
    try {
        // 검색어가 있을 때만 실행
        if (searchQuery.trim() !== '') {
            // 아이템 목록 가져오기
            const items = await getItemList(page, size, sort);

            // 검색어 필터링: 검색어가 있을 때만 필터링
            const filteredItems = items.filter(
                (item) =>
                    item.itemStatus === 'SELL' && // 판매중인 아이템만
                    item.itemCount > 0 && // 재고가 있는 아이템만
                    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) // 이름에 검색어가 포함된 아이템만
            );

            console.log('Filtered items:', filteredItems);

            // 클라이언트 정렬 처리
            const sortedItems = [...filteredItems].sort((a, b) =>
                sort === 'desc' // 최신순 (내림차순)
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : new Date(a.createdAt) - new Date(b.createdAt) // 오래된순 (오름차순)
            );

            console.log('Filtered and sorted items:', sortedItems);

            set({ itemList: sortedItems, loading: false });
        } else {
            // 검색어가 없으면 아이템 목록 비우기
            set({ itemList: [], loading: false });
        }
    } catch (error) {
        console.error('Error fetching search list:', error);
        set({ error: error.message, loading: false });
    }
    },
    
    // 상품 TOP 10
    fetchTopItems: async () => {
        try {
            const items = await getTopItems();
            
            const sellItems = items.filter(item => item.itemStatus === 'SELL' && item.itemCount > 0);
            console.log('Filtered SELL items with available stock:', sellItems); // Debugging console log

            // 원하는 정렬이 있다면 추가 (옵션)
            const sortedItems = sellItems; // 혹은 sort 적용
            console.log('Sorted items:', sortedItems); // Debugging console log
    
            set({ topItems: sortedItems });
        } catch (error) {
            console.error("인기 상품 조회 실패:", error);
            set({ error: error.message, loading: false });
        }
    }
}));

export default useAdminStore;
