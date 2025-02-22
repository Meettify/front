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
    console.log('Logging in with userData:', userData);  // 데이터 확인
    set({
      user: { 
        ...userData, 
        memberRole: userData.memberRole || 'USER'
      },
      isAuthenticated: true, 
      memberId: userData.memberId || localStorage.getItem('memberId')
    });
    localStorage.removeItem('undefined');
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