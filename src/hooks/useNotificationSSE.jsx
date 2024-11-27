import { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuth } from "./useAuth";

const BASE_URL = 'https://meettify.store/api/v1';

const useNotificationSSE = () => {
  const { user } = useAuth(); // 사용자 인증 정보 가져오기
  const [notifications, setNotifications] = useState([]); // 알림 상태
  const [connected, setConnected] = useState(false); // SSE 연결 상태

  const sseRef = useRef(null); // SSE 인스턴스 관리

  const connectToSSE = () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 토큰 가져오기
    console.log("[SSE] connectToSSE 호출됨.");
    console.log("[SSE] Access Token:", accessToken);

    if (!accessToken) {
      console.error("[SSE] 액세스 토큰이 없습니다. SSE 연결 중단.");
      return;
    }

    console.log("[SSE] SSE 연결 시도 중...");
    sseRef.current = new EventSourcePolyfill(`${BASE_URL}/notify/subscribe`, {
      headers: {
        "Content-Type": "text/event-stream",
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      fetchOptions: {
        mode: "cors", // CORS 모드
        credentials: "include", // 쿠키 기반 인증 활성화
        withCredentials: true,
      },
    });

    // SSE 연결 성공
    sseRef.current.onopen = () => {
      console.log("[SSE] 연결 성공!");
      setConnected(true);
    };

    // 서버에서 데이터 수신
    sseRef.current.onmessage = (event) => {
      console.log("[SSE] 데이터 수신 중...");
      console.log("[SSE] Raw Event:", event);

      try {
        const data = JSON.parse(event.data);
        console.log("[SSE] 수신 데이터(JSON):", data);

        // 알림 상태에 추가
        setNotifications((prev) => [...prev, data]);
      } catch (parseError) {
        console.error("[SSE] 데이터 파싱 오류:", parseError);
        console.error("[SSE] 원본 데이터:", event.data);
      }
    };

    // SSE 연결 오류 처리
    sseRef.current.onerror = (error) => {
      console.error("[SSE] 연결 오류 발생:", error);

      // 연결 종료 처리
      if (sseRef.current) {
        console.log("[SSE] 연결을 닫습니다.");
        sseRef.current.close();
        setConnected(false);
      }
    };
  };

  useEffect(() => {
    console.log("[SSE] useEffect 호출됨.");
    console.log("[SSE] 사용자 정보:", user);

    if (user && user.memberEmail) {
      console.log("[SSE] SSE 연결 시작. 사용자 이메일:", user.memberEmail);
      connectToSSE();
    }

    return () => {
      console.log("[SSE] useEffect 정리 함수 호출됨.");
      if (sseRef.current) {
        console.log("[SSE] 기존 SSE 연결 닫기 시도 중...");
        sseRef.current.close();
        sseRef.current = null; // 연결 객체 초기화
      } else {
        console.log("[SSE] 닫을 SSE 연결이 없습니다.");
      }
      setConnected(false);
    };
  }, [user]);

  return { notifications, connected };
};

export default useNotificationSSE;
