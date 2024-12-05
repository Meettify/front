import { create } from 'zustand';

const useShopStore = create((set) => ({
    cartItems: [], // 장바구니 아이템들
    shopItems: [], // 쇼핑몰에 있는 상품들
    addToCart: (item) => set((state) => ({ cartItems: [...state.cartItems, item] })),
    removeFromCart: (itemId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.itemId !== itemId),
    })),
    updateCartItemQuantity: (itemId, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.itemId === itemId ? { ...item, quantity } : item
        ),
    })),
    fetchShopItems: async () => {
        // 쇼핑몰 상품 API 호출 후 데이터 받아오기
        const data = await fetch('/api/shop').then(res => res.json());
        set({ shopItems: data });
    },
    fetchCartItems: async () => {
        // 장바구니 API 호출 후 데이터 받아오기
        const data = await fetch('/api/cart').then(res => res.json());
        set({ cartItems: data });
    },
}));

export default useShopStore;
