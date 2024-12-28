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

// hooks/useWebSocket.js
// import { useEffect, useState } from 'react';

// const useWebSocket = (url, onMessage) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // WebSocket 연결 설정
//     const ws = new WebSocket(url);

//     // 연결된 후 메시지 수신 처리
//     ws.onopen = () => {
//       console.log('WebSocket 연결됨');
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       onMessage(data);  // 메시지 처리
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket 오류:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket 연결 종료');
//     };

//     // 상태에 WebSocket 객체 설정
//     setSocket(ws);

//     // 컴포넌트가 언마운트될 때 연결 종료
//     return () => {
//       ws.close();
//     };
//   }, [url, onMessage]);

//   // WebSocket을 통해 메시지를 보낼 수 있는 함수 반환
//   const sendMessage = (message) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(message));
//     }
//   };

//   return sendMessage;
// };

// export default useWebSocket;

