import { create } from 'zustand';
import { getItemList } from '../api/adminAPI'; // adminAPI에서 상품 정보 가져오기

const useCartStore = create((set) => ({
    cartItems: [],

    fetchCartItems: async () => {
        const items = await getItemList(); // 상품 목록 가져오기
        set({ cartItems: items });
    },

    addToCart: (item) => {
        set((state) => ({
            cartItems: [...state.cartItems, item], // 상품 추가
        }));
    },

    removeFromCart: (itemId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.itemId !== itemId),
        }));
    },
}));

export default useCartStore;
