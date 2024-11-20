import { create } from 'zustand';
import * as cartAPI from '../api/cartAPI';

const useCartStore = create((set, get) => ({
    cartItems: [], // 장바구니 항목

    // 서버에서 장바구니 항목 불러오기
    fetchCartItems: async (cartId) => {
        try {
            console.log('장바구니 항목 불러오기 요청:', cartId);

            const cartItems = await cartAPI.getCartById(cartId); // 백엔드 API 호출
            console.log('장바구니 항목 불러오기 응답:', cartItems);

            set({ cartItems }); // 상태를 업데이트
        } catch (error) {
            console.error('장바구니 항목 불러오기 실패:', error);
        }
    },
    
    // 장바구니에 상품 추가
    addToCart: async (memberEmail, item) => {
        if (!memberEmail) {
            console.error('사용자 정보가 없습니다.');
            return;
        }

        // 프론트엔드에서 중복 확인
        const existingItem = get().cartItems.find((i) => i.itemId === item.itemId);
        if (existingItem) {
            console.log('이미 장바구니에 추가된 상품입니다.');
            return; // 중복 추가 방지
        }

        try {
            console.log('장바구니에 상품 추가 시도:', { memberEmail, item });

            await cartAPI.addItemToCart(memberEmail, item.itemId, 1);
            console.log('장바구니에 상품 추가 완료:', item);

            set((state) => {
                const newCartItems = [...state.cartItems, { ...item, quantity: 1 }];
                return { cartItems: newCartItems };
            });
        } catch (error) {
            if (error.response?.status === 400 && error.response?.data?.message.includes('기존에 장바구니에 담았습니다')) {
                console.error('이미 장바구니에 추가된 상품입니다.');
            } else {
                console.error('장바구니에 상품 추가 중 오류 발생:', error);
            }
        }
    },

    // 장바구니에서 상품 제거
    removeFromCart: async (itemId) => {
        try {
            console.log('장바구니에서 상품 제거 시도:', itemId);

            await cartAPI.removeCartItem(itemId);
            console.log('장바구니에서 상품 제거 완료:', itemId);

            set((state) => ({
                cartItems: state.cartItems.filter((item) => item.itemId !== itemId),
            }));
        } catch (error) {
            console.error('장바구니에서 상품 제거 중 오류 발생:', error);
        }
    },

    // 상품이 장바구니에 있는지 확인하여 별표 상태 관리
    isFavorite: (itemId) => {
        return get().cartItems.some((item) => item.itemId === itemId);
    },
}));

export default useCartStore;