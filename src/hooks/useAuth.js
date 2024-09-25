import useAuthStore from '../store/authStore';
import { useEffect } from 'react';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  // 새로고침 시 세션 스토리지에서 토큰을 확인
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 로그인 상태를 복구
      const userData = { token };
      login(userData);
    }
  }, [login]);

  return { user, isAuthenticated, login, logout };
};
