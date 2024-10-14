import { create } from 'zustand';
import { fetchItems as fetchAPIItems } from '../api/shopAPI'; // 실제 API 호출 함수 가져오기

// Zustand 스토어 정의
const useShopStore = create((set, get) => ({
    products: [], // 상품 목록
    hasMore: true, // 더 불러올 데이터 여부
    useMockData: true, // 목업 데이터 사용 여부

    // 상품 데이터 불러오는 함수 (목업 또는 실제 API)
    fetchMoreProducts: async () => {
        const fetchMockItems = async (startIndex) => {
            const itemsPerPage = 4;
            const mockData = Array.from({ length: 20 }, () => ({
                item: {
                    itemName: "상품 1",
                    itemPrice: 10000,
                    itemDetails: "상품 1의 설명입니다.",
                    itemStatus: "SELL",
                    itemCount: 5,
                    itemCategory: "SPORTS",
                },
                files: [],
            }));

            const paginatedItems = mockData.slice(startIndex, startIndex + itemsPerPage);

            return {
                items: paginatedItems,
                hasMore: startIndex + itemsPerPage < mockData.length,
            };
        };

        try {
            const startIndex = get().products.length; // 현재 상품 수로 시작 인덱스 설정

            // useMockData 값에 따라 목업 데이터 또는 실제 API 호출 결정
            let data;
            if (get().useMockData) {
                data = await fetchMockItems(startIndex); // 목업 데이터 호출
            } else {
                data = await fetchAPIItems(startIndex / 4 + 1, 4); // 실제 API 호출 (페이지와 limit)
            }

            set((state) => ({
                products: [...state.products, ...data.items], // 기존 상품에 새 상품 추가
                hasMore: data.hasMore, // 더 불러올 데이터 여부 갱신
            }));
        } catch (error) {
            console.error("상품을 불러오는 데 오류가 발생했습니다:", error);
            set({ hasMore: false }); // 오류 발생 시 더 이상 불러올 데이터 없음으로 설정
        }
    },

    // 상품 초기화 함수
    clearProducts: () => set({ products: [], hasMore: true }),
}));

export default useShopStore;
