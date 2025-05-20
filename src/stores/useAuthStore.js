import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { postLogout } from '../api/memberAPI'; // 🔁 logout API import


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
  
logout: async () => {
  try {
    await postLogout(); // ✅ 서버에 블랙리스트 등록 요청
  } catch (e) {
    console.warn('백엔드 로그아웃 실패 (이미 만료되었을 수 있음)', e);
  }

  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('memberId');

  set({ user: null, isAuthenticated: false, id: null });
  window.location.href = '/';
}
})));

export default useAuthStore;