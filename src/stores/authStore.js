import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  memberId: null,

  login: (userData) => {
    sessionStorage.setItem('accessToken', userData.accessToken); // 세션 스토리지에 엑세스 토큰 저장
    localStorage.setItem('refreshToken', userData.refreshToken); // 로컬 스토리지에 리프레시 토큰 저장
    // userData에서 memberId도 함께 상태에 저장
    set({ user: userData, isAuthenticated: true, memberId: userData.memberId });
  },
  
  logout: () => {
    sessionStorage.removeItem('accessToken'); // 세션 스토리지에서 토큰 삭제
    localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
    set({ user: null, isAuthenticated: false, memberId: null });
    window.location.href = '/';
  },
}));

export default useAuthStore;
