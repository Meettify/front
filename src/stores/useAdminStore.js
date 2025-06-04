import { create } from 'zustand';
import { getItemList, createItem, deleteItem, getItemDetail, getTopItems, updateItem as updateItemAPI  } from '../api/shopAPI';
import axios from 'axios';
import { getRecommendedItems } from "../api/meetAPI";


const useAdminStore = create((set) => ({
    itemList: [],
    topItems: [],
  setItemList: [],
    recommendedItems: [],
    loading: false,
    error: null,
  setItemList: (items) => set({ itemList: items }),

   fetchItemList: async (page = 1, size = 10, sort = 'desc', sortBy = 'itemId') => {
  set({ loading: true });
  try {
    const response = await getItemList(page, size);
    console.log('Fetched items:', response);

    // 🟡 실제 배열만 추출
    const rawItems = response.items || response.data?.items || []; // 안전하게 추출

    const sellItems = rawItems.filter(item => item.itemStatus === 'SELL' && item.itemCount > 0);

    const sortedItems = [...sellItems].sort((a, b) => {
      if (sortBy === 'itemId') {
        return sort === 'desc' ? b.itemId - a.itemId : a.itemId - b.itemId;
      } else if (sortBy === 'createdAt') {
        return sort === 'desc'
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

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
            console.log("상품 상세 페이지 : ", detail)
          set({ itemDetail: detail, loading: false });
          console.log("데이터 체크 : ", get().itemDetail.images)
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

    // 상품 수정
  updateItem: async (itemId, formData) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateItemAPI(itemId, formData);
      set({ itemDetail: updated, loading: false });
      return updated;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
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

    // 상품 검색
fetchSearchList: async (
  lastItemId = null,
  size = 12,
  sort = "itemId,DESC",
  searchQuery = ""
) => {
  set({ loading: true });

  try {
    if (searchQuery.trim() !== "") {
      const response = await getItemList({
        lastItemId,
        size,
        sort,
        title: searchQuery,
        status: "SELL", // 판매중만
      });

      const fetchedItems = response.items || [];

      // 재고(itemCount > 0) 추가 필터링 (프론트 필터링 필요)
      const filteredItems = fetchedItems.filter((item) => item.itemCount > 0);

      set((prev) => ({
        itemList: lastItemId ? [...prev.itemList, ...filteredItems] : filteredItems,
        hasMore: response.hasNextPage,
        lastItemId:
          filteredItems.length > 0
            ? filteredItems[filteredItems.length - 1].itemId
            : null,
        loading: false,
      }));
    } else {
      // 검색어가 없으면 초기화
      set({
        itemList: [],
        hasMore: false,
        lastItemId: null,
        loading: false,
      });
    }
  } catch (error) {
    console.error("Error fetching search list:", error);
    set({ error: error.message, loading: false });
  }
  },

  // 상품 추천
    fetchRecommendedItems: async () => {
    set({ loading: true });
    try {
      const items = await getRecommendedItems(); // ✅ 실제 추천 API 호출
      // 🔍 1. SELL 상태 + 재고 있음 필터링
      const sellItems = items.filter(item => item.itemStatus === 'SELL' && item.itemCount > 0);
      // 🔁 2. itemId 기준 중복 제거
      const uniqueItems = Array.from(
        new Map(sellItems.map(item => [item.itemId, item])).values()
      );

      // ✅ 3. 상태 업데이트
      set({
        recommendedItems: uniqueItems,
        loading: false,
      });
    } catch (error) {
      console.error('추천 상품 가져오기 실패:', error);
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
