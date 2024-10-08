import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  memberId: null,

  login: (userData) => {
    console.log(`StoreUserData : ${userData}`);
    set({ user: userData, isAuthenticated: true, memberId: localStorage.getItem('memberId') });
  },
  
  logout: () => {
    sessionStorage.removeItem('accessToken'); // 세션 스토리지에서 토큰 삭제
    localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
    localStorage.removeItem('memberId');
    set({ user: null, isAuthenticated: false, memberId: null });
    window.location.href = '/';
  },
}));

export default useAuthStore;
