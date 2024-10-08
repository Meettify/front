import { create } from 'zustand';
import axios from '../api/axiosConfig';

const useShopStore = create((set) => ({
    products: [],   // 상품 목록
    loading: false,
    error: null,

    // 모든 상품 가져오기
    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            // 엔드포인트 경로 설정에 맞게 변경
            const response = await axios.get('/api/shop');
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
            console.error('Error fetching products:', error);
        }
    },
}));

export default useShopStore;