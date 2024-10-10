import { create } from 'zustand';


const useMeetStore = create((set) => ({

  image: '',
  tags: [],
  description: '',
  details: '',
  isMember: false,
  isHost: false,
  isAdmin: false,

  // 상태를 업데이트하는 함수들
  setImage: (image) => set({ image }),
  setTags: (tags) => set({ tags }),
  setDescription: (description) => set({ description }),
  setDetails: (details) => set({ details }),
  setIsMember: (isMember) => set({ isMember }),
  setIsHost: (isHost) => set({ isHost }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));

export default useMeetStore;
