import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
  user: {
    memberEmail: '',
    memberName: '',
    nickName: '',
    memberAddr: '',
    memberAddrDetail: '',
    memberZipCode: '',
    memberRole: '',
  },
  isAuthenticated: false,
  memberId: null,

  login: (userData) => {
    set({
      user: { 
        ...userData, 
        memberRole: userData.memberRole || 'USER' // memberRole이 없을 경우 기본값을 USER로 설정
      },
      isAuthenticated: true, 
      memberId: userData.memberId || localStorage.getItem('memberId') // userData에서 memberId를 가져오되, 없으면 localStorage에서 가져옴
    });
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