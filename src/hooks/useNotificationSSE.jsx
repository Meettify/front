import { useEffect } from 'react';
import useNotificationStore from '../stores/useNotificationStore';
import { useAuth } from './useAuth';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

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

    console.log('SSE 연결을 시작합니다. 사용자 이메일:', user.memberEmail);
    console.log('SSE 연결을 위한 토큰:', token);

    // 토큰과 이메일을 URL 매개변수로 전달
    // const eventSource = new EventSource(`${BASE_URL}/notification/subscribe?token=${token}&email=${user.memberEmail}`);
    const eventSource = new EventSource(`${BASE_URL}/notification/subscribe`);

    eventSource.onopen = () => {
      console.log('SSE 연결이 성공적으로 열렸습니다.');
    };

    eventSource.onmessage = (event) => {
      console.log('SSE 알림 수신 (raw data):', event.data);
      try {
        const notificationData = JSON.parse(event.data);
        console.log('SSE 알림 수신 (parsed):', notificationData);

        addNotification(notificationData); // 알림을 상태에 추가
        console.log('알림이 상태에 추가되었습니다:', notificationData);
      } catch (err) {
        console.error('알림 JSON 파싱 중 오류 발생:', err);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 오류 발생:', error);
      fetch(`${BASE_URL}/notification/subscribe`)
        .then(response => response.text())
        .then(text => console.log('응답 본문:', text))
        .catch(err => console.error('Fetch 에러:', err));
      eventSource.close();
    };


    return () => {
      console.log('SSE 연결이 해제되었습니다.');
      eventSource.close();
    };
  }, [user, addNotification]);

  return null;
};

export default useNotificationSSE;
