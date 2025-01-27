import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import useNotificationStore from "../stores/useNotificationStore";
import { useAuth } from "./useAuth";

const BASE_URL = "http://localhost:8080/api/v1";

const useNotificationSSE = () => {
  const { user } = useAuth(); // 사용자 인증 정보 가져오기
  const { addNotification } = useNotificationStore(); // 알림 상태 관리 함수
  const sseRef = useRef(null); // SSE 인스턴스 관리

  const connectToSSE = () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 토큰 가져오기
    if (!accessToken) {
      console.error("[SSE] 액세스 토큰이 없습니다. SSE 연결 중단.");
      return;
    }

    sseRef.current = new EventSourcePolyfill(`${BASE_URL}/notify/subscribe`, {
      headers: {
        "Content-Type": "text/event-stream",
        Authorization: `Bearer ${accessToken}`,
      },
      heartbeatTimeout: 3600000, // 60초 동안 활동이 없어도 연결 유지
      fetchOptions: {
        mode: "cors",
        credentials: "include",
      },
    });

    // SSE 연결 성공
    sseRef.current.onopen = () => {
      console.log("[SSE] 연결 성공!");
    };

    // 서버에서 데이터 수신
    sseRef.current.onmessage = (event) => {
      console.log("[SSE] 데이터 수신 중:", event.data); // 데이터 수신 로그
      try {
        const data = JSON.parse(event.data); // SSE 데이터 파싱
        console.log("[SSE] 파싱된 데이터:", data);

        // 알림 데이터를 zustand 상태에 추가
        addNotification({
          id: data.eventId || Date.now(), // 고유 ID 생성
          message: data.message || "새 알림이 도착했습니다.",
          type: data.type || "알림", // 알림 종류
          timestamp: data.timestamp || new Date().toISOString(), // 알림 발생 시각
        });

        // 상태에 추가된 알림 데이터 확인
        console.log(
          "zustand 알림 상태:",
          useNotificationStore.getState().notifications
        );
      } catch (error) {
        console.error("[SSE] 데이터 처리 오류:", error);
      }
    };

    // SSE 연결 오류 처리
    sseRef.current.onerror = () => {
      console.error("[SSE] 연결 오류 발생.");
      if (sseRef.current) {
        sseRef.current.close();
      }
      // // 재연결 시도
      // setTimeout(() => {
      //   console.log("[SSE] 재연결 시도 중...");
      //   connectToSSE();
      // }, 3000);
    };
  };

  useEffect(() => {
    if (user && user.memberEmail) {
      console.log("[SSE] SSE 연결 시작. 사용자 이메일:", user.memberEmail);
      connectToSSE();
    }

    return () => {
      if (sseRef.current) {
        sseRef.current.close();
      }
    };
  }, [user]);

  return null; // hook이 상태를 직접 반환하지 않고 zustand로 관리
};

export default useNotificationSSE;
