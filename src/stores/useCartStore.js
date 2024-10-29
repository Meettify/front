import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    cartItems: [], // 장바구니 항목
    favoriteItems: [], // 즐겨찾기(별표) 된 상품 ID 목록

    // 장바구니에 상품 추가
    addToCart: (item) => {
        set((state) => {
            const existingItem = state.cartItems.find((i) => i.itemId === item.itemId);
            const newCartItems = existingItem
                ? state.cartItems.map((i) =>
                      i.itemId === item.itemId
                          ? { ...i, quantity: i.quantity + 1 }
                          : i
                  )
                : [...state.cartItems, { ...item, quantity: 1 }];

            return {
                cartItems: newCartItems,
                favoriteItems: [...state.favoriteItems, item.itemId], // 별표 상태 추가
            };
        });
    },

    // 장바구니에서 상품 제거 및 별표 상태 해제
    removeFromCart: (itemId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.itemId !== itemId),
            favoriteItems: state.favoriteItems.filter((id) => id !== itemId), // 별표 해제
        }));
    },

    // 상품 수량 업데이트
    updateCartItemQuantity: (itemId, newQuantity) => {
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.itemId === itemId ? { ...item, quantity: newQuantity } : item
            ),
        }));
    },

    // 상품이 즐겨찾기(별표)된 상태인지 확인
    isFavorite: (itemId) => get().favoriteItems.includes(itemId),
}));

export default useCartStore;
