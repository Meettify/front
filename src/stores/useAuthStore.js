import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(persist((set) => ({
  user: {
    id: '',
    email: '',
    nickName: '',
    role: '', 
    createdAt: '',
    memberName: '',
    memberAddr: {
      memberZipCode: '',
      memberAddr: '',
      memberAddrDetail: '',
    }
  },
  isAuthenticated: false,
  id: null,

  login: (userData) => {
    console.log('Logging in with userData:', userData);  // 데이터 확인
    set({
      user: { 
      id: userData.id || userData.memberId, 
      email: userData.email,
      nickName: userData.nickName,
      role: userData.role || 'USER',
      createdAt: userData.createdAt,
      memberName: userData.memberName,
      memberAddr: {
        memberZipCode: userData.memberZipCode,
        memberAddr: userData.memberAddr,
        memberAddrDetail: userData.memberAddrDetail,
        }
      },
      isAuthenticated: true, 
      id: userData.id || localStorage.getItem('memberId')
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