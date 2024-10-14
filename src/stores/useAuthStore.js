import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
  user: {
    memberEmail: '',
    memberName: '',
    nickName: '',
    memberAddr: '',
    memberAddrDetail: '',
    memberZipCode: ''
  },
  isAuthenticated: false,
  memberId: null,

  login: (userData) => {
    set({ user: userData, isAuthenticated: true, memberId: localStorage.getItem('memberId') });
  },
  
  logout: () => {
    sessionStorage.removeItem('accessToken'); // 세션 스토리지에서 토큰 삭제
    localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
    localStorage.removeItem('memberId');
    set({ user: null, isAuthenticated: false, memberId: null });
    localStorage.removeItem('undefined');
    window.location.href = '/';
  },
})));

export default useAuthStore;