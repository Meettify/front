import useAuthStore from '../stores/useAuthStore';
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
        console.log("userData : ", userData)
        
        if(userData){
            login({
              id: userData?.memberId,
              email: userData?.memberEmail,
              nickName: userData?.nickName,
              role: userData?.memberRole, 
              createdAt: userData?.createdAt,
              memberName: userData?.memberName,
              memberZipCode: userData?.memberAddr?.memberZipCode,
              memberAddrInfo: userData?.memberAddr?.memberAddr,
              memberAddrDetail: userData?.memberAddr?.memberAddrDetail,
          });
        }
      };
      fetchData();
    }
    
  }, [login]);

  return { user, isAuthenticated, memberId, login, logout };
};