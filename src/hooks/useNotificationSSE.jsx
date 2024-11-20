import { useEffect } from 'react';
import useNotificationStore from '../stores/useNotificationStore';
import { useAuth } from './useAuth';
import axios from 'axios';

const BASE_URL = 'https://meettify.store/api/v1';

const useNotificationSSE = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.memberEmail) {
      console.warn('SSE 구독을 위해 사용자 정보가 필요합니다.');
      return;
    }

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      console.warn('SSE 구독을 위한 토큰이 없습니다.');
      return;
    }

    // JWT 유효성 검사
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken.exp * 1000 < Date.now()) {
      console.error('토큰이 만료되었습니다.');
      return;
    }

    console.log('SSE 연결을 시작합니다. 사용자 이메일:', user.memberEmail);

    // SSE 연결을 위한 프록시 엔드포인트
    axios
      .get(`${BASE_URL}/notification/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text',
      })
      .then(() => {
        console.log('SSE 인증이 완료되었습니다. SSE 연결 시작.');

        // EventSource 초기화 (별도의 인증 없이 서버에서 인증됨)
        const eventSource = new EventSource(`${BASE_URL}/notification/subscribe`);

        eventSource.onopen = () => {
          console.log('SSE 연결이 성공적으로 열렸습니다.');
        };

        eventSource.onmessage = (event) => {
          console.log('SSE 알림 수신 (raw data):', event.data);
          try {
            const notificationData = JSON.parse(event.data);
            addNotification(notificationData);
          } catch (err) {
            console.error('알림 JSON 파싱 중 오류 발생:', err);
          }
        };

        eventSource.onerror = (error) => {
          console.error('SSE 오류 발생:', error);
          eventSource.close();
        };

        return () => {
          console.log('SSE 연결 종료.');
          eventSource.close();
        };
      })
      .catch((error) => {
        console.error('SSE 인증 요청 실패:', error);
      });
  }, [user, addNotification]);

  return null;
};

export default useNotificationSSE;
