import useAuthStore from '../stores/authStore';
import { useEffect } from 'react';
import { getMember } from '../api/memberAPI';

export const useAuth = () => {
  const { user, isAuthenticated, memberId, login, logout } = useAuthStore();

  // 새로고침 시 세션 스토리지에서 토큰을 확인
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const storedMemberId = localStorage.getItem('memberId');

    if (token) {
      // 토큰이 있으면 로그인 상태를 복구
      const fetchData = async () => {
        const userData = await getMember(storedMemberId);
        
        if(userData){
          login(userData);
        }
      };
      fetchData();
    }
    
  }, [login]);

  return { user, isAuthenticated, memberId, login, logout };
};