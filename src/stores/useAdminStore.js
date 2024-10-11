import { create } from 'zustand';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../api/adminAPI';

const useAdminStore = create((set, get) => ({
    products: [], // 상품 목록 상태
    selectedProduct: null,
    loading: false,
    error: null,
    productData: {
        itemName: '',
        itemPrice: '',
        itemDetails: '',
        itemStatus: 'SELL', 
        itemCount: 1,
        itemCategory: 'SPORTS',
    },

    // 상태 업데이트
    setProductData: (name, value) => set((state) => ({
        productData: {
            ...state.productData,
            [name]: value,
        }
    })),

    // 상품 목록 조회
    fetchProduct: async () => {
        set({ loading: true });
        try {
            const response = await getProduct();
            set((state) => ({
                products: [...response], // 상품 목록으로 업데이트
                loading: false,
            }));
        } catch (error) {
            console.error('상품 조회 중 오류 발생:', error);
            set({ error: '상품 조회 중 오류 발생', loading: false });
        }
    },

    // 상품 등록
    createProduct: async () => {
        set({ loading: true, error: null });
        try {
            const { productData } = get();
            const newProduct = await createProduct(productData);

            // 상품 등록 후 products 상태에 새로 등록한 상품 추가
            set((state) => ({
                products: [...state.products, newProduct],
                loading: false,
            }));
        } catch (error) {
            set({ error: '상품 등록 실패', loading: false });
        }
    },

    // 상품 수정
    updateProduct: async (itemId, productData) => {
        set({ loading: true, error: null });
        try {
            await updateProduct(itemId, productData);
            set({ loading: false });
        } catch (error) {
            set({ error: '상품 수정 실패', loading: false });
        }
    },

    // 상품 삭제
    deleteProduct: async (itemId) => {
        set({ loading: true, error: null });
        try {
            await deleteProduct(itemId);
            set((state) => ({
                products: state.products.filter((product) => product.itemId !== itemId), // 삭제한 상품 제외
                loading: false,
            }));
        } catch (error) {
            set({ error: '상품 삭제 실패', loading: false });
        }
    }
}));

export default useAdminStore;
