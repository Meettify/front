import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (userData) => {
  
    sessionStorage.setItem('accessToken', userData.accessToken); // 세션 스토리지에 엑세스 토큰 저장
    localStorage.setItem('refreshToken', userData.refreshToken); // 로컬 스토리지에 리프레시 토큰 저장

    set({ user: userData, isAuthenticated: true });
  },
  
  logout: () => {
    sessionStorage.removeItem('accessToken'); // 세션 스토리지에서 토큰 삭제
    localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
