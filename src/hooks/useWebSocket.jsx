import { useEffect, useRef } from 'react';

const useWebSocket = (url, onMessage) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onmessage = (event) => {
            onMessage(JSON.parse(event.data)); // 수신한 메시지를 JSON으로 파싱
        };

        return () => {
            socketRef.current.close(); // 컴포넌트 언마운트 시 소켓 연결 종료
        };
    }, [url, onMessage]);

    return socketRef.current;
};

export default useWebSocket;
