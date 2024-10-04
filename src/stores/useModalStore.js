import { create } from 'zustand';

const useModalStore = create((set) => ({
  modals: {
    info : false,
  },
  
  openModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: true }
  })),
  
  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false }
  })),
}));

export default useModalStore;
