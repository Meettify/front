import { create } from 'zustand';
import { getItemList, createItem, deleteItem, getItemDetail } from '../api/adminAPI';
import { getMember } from '../api/memberAPI';

const useAdminStore = create((set) => ({
    itemList: [],
    memberList: [], // 초기값을 빈 배열로 설정
    loading: false,
    error: null,

    // 회원 목록 조회
    fetchMemberList: async () => {
        set({ loading: true });
        try {
            const members = await getMember(); // 서버에서 회원 목록 가져오기
            console.log('Member List:', members); // 콘솔로 응답 확인
            set({ memberList: members || [], loading: false }); // 결과가 없으면 빈 배열 설정
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },    

    // // **상품 목록 조회 함수**
    // fetchItemList: async (page = 1, size = 10) => {
    //     set({ loading: true });
    //     try {
    //         const items = await getItemList(page, size);
    //         set({ itemList: items, loading: false });
    //     } catch (error) {
    //         set({ error: error.message, loading: false });
    //     }
    // },

    fetchItemList: async (page = 1, size = 10) => {
        set({ loading: true });
        try {
            const items = await getItemList(page, size);
            const sellItems = items.filter(item => item.itemStatus === 'SELL'); // SELL 상태의 상품만 필터링
            set({ itemList: sellItems, loading: false });
        } catch (error) {
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
