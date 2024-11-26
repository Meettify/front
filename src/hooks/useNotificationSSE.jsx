import { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuth } from "./useAuth";

const BASE_URL = 'https://meettify.store/api/v1';

const useNotificationSSE = () => {
  const { user } = useAuth(); // 사용자 인증 정보 가져오기
  const [notifications, setNotifications] = useState([]); // 알림 상태
  const [connected, setConnected] = useState(false); // SSE 연결 상태

  const sseRef = useRef(null); // SSE 인스턴스 관리
  const retryCountRef = useRef(0); // 재연결 시도 횟수 관리

  const connectToSSE = () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 토큰 가져오기
    console.log("[SSE] connectToSSE 호출됨.");
    console.log("[SSE] Access Token:", accessToken);

    if (!accessToken) {
      console.error("[SSE] 액세스 토큰이 없습니다. SSE 연결 중단.");
      return;
    }

    if (retryCountRef.current >= 3) {
      console.error("[SSE] 최대 재연결 시도 횟수를 초과했습니다.");
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
      retryCountRef.current = 0; // 재연결 시도 횟수 초기화
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

      // `readyState`를 통해 상태 확인
      const readyState = sseRef.current?.readyState;
      console.error("[SSE] 연결 상태 (readyState):", readyState);

      // 네트워크 요청 및 응답에 대한 정보 출력
      console.error("[SSE] EventSource 오류 정보: ", error);

      // CORS 관련 추가 디버깅 로그
      console.warn(
        "[SSE] CORS 문제일 경우, 서버에서 적절한 CORS 헤더를 반환해야 합니다. 브라우저 네트워크 탭에서 요청/응답 확인하세요."
      );

      // 연결 종료 처리
      if (sseRef.current) {
        console.log("[SSE] 연결을 닫습니다.");
        sseRef.current.close();
        setConnected(false);
      }

      // 재연결 시도
      if (retryCountRef.current < 3) {
        retryCountRef.current += 1;
        console.log(`[SSE] 재연결 시도 중... (${retryCountRef.current}/3)`);
        setTimeout(() => {
          console.log("[SSE] 5초 후 다시 연결 시도.");
          connectToSSE();
        }, 5000); // 5초 후 재연결
      } else {
        console.error("[SSE] 최대 재연결 시도 횟수 초과. 연결 중단.");
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
