import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  
  logout: () => {
    sessionStorage.removeItem('token'); // 세션 스토리지에서 토큰 삭제
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
