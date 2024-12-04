import { create } from 'zustand';

const usePaymentStore = create((set) => ({
    isLoading: false,
    paymentResult: null,
    setLoading: (isLoading) => set({ isLoading }),
    setPaymentResult: (result) => set({ paymentResult: result }),
}));

export default usePaymentStore;
