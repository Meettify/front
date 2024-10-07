// C:\project3\front\src\stores\useMeetStore.jsx
import { create } from 'zustand';

const useMeetStore = create((set) => ({
  image: '',  // 이미지 상태
  tags: [''],  // 태그 상태
  description: '',  // 모임 설명 상태
  details: '',  // 모임 세부 설명 상태
  isMember: false,
  isHost: false,

  // 상태 업데이트 함수들
  setImage: (image) => set({ image }),
  setTags: (tags) => set({ tags }),
  setDescription: (description) => set({ description }),
  setDetails: (details) => set({ details }),
  setIsMember: (isMember) => set({ isMember }),
  setIsHost: (isHost) => set({ isHost }),
}));

export default useMeetStore;
