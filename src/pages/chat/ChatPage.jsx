// import React, { useState, useCallback } from "react";
// import MeetChatList from "../../components/meet/MeetChatList";
// import MeetChatRoom from "../../components/meet/MeetChatRoom";
// import useWebSocket from "../../hooks/useWebSocket"; // 웹소켓 훅 임포트

// const ChatPage = () => {
//     const [selectedUser, setSelectedUser] = useState('');  
//     const [chatMessages, setChatMessages] = useState({});

//     const handleUserSelect = (username) => {
//         setSelectedUser(username);
//     };

//     const handleSendMessage = (username, message) => {
//         const payload = { username, message };
//         socket.send(JSON.stringify(payload)); // 웹소켓을 통해 메시지 전송
//         setChatMessages((prevMessages) => ({
//             ...prevMessages,
//             [username]: [...(prevMessages[username] || []), message]
//         }));
//     };

//     const handleWebSocketMessage = useCallback((data) => {
//         const { username, message } = data;
//         setChatMessages((prevMessages) => ({
//             ...prevMessages,
//             [username]: [...(prevMessages[username] || []), message]
//         }));
//     }, []);

//     const socket = useWebSocket('ws://your-websocket-url', handleWebSocketMessage); // 웹소켓 URL

//     return (
//         <div className="flex h-screen w-screen">
//             <MeetChatList onUserSelect={handleUserSelect} />
//             <div className="flex-grow h-full">
//                 <MeetChatRoom 
//                     username={selectedUser} 
//                     messages={chatMessages[selectedUser] || []} 
//                     onSendMessage={handleSendMessage} 
//                 />
//             </div>
//         </div>
//     );
// };

// export default ChatPage;
import React, { useState, useCallback } from "react";
import MeetChatList from "../../components/meet/MeetChatList";
import MeetChatRoom from "../../components/meet/MeetChatRoom";
import useWebSocket from "../../hooks/useWebSocket"; // 수정된 웹소켓 훅

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState('');  
    const [chatMessages, setChatMessages] = useState({});
    
    // WebSocket URL 수정
    const handleUserSelect = (username) => {
        setSelectedUser(username);
    };

    // 메시지 보내는 함수
    const handleSendMessage = (username, message) => {
        const payload = { username, message };
        sendMessage(payload); // 웹소켓을 통해 메시지 전송
        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [username]: [...(prevMessages[username] || []), message]
        }));
    };

    // 웹소켓으로 메시지 받기
    const handleWebSocketMessage = useCallback((data) => {
        const { username, message } = data;
        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [username]: [...(prevMessages[username] || []), message]
        }));
    }, []);

    // 웹소켓 URL 설정
    const socketUrl = 'ws://your-websocket-url'; // 서버의 웹소켓 URL을 여기에 넣으세요
    const sendMessage = useWebSocket(socketUrl, handleWebSocketMessage); // 웹소켓을 통해 메시지 전송하는 함수 반환

    return (
        <div className="flex h-screen w-screen">
            <MeetChatList onUserSelect={handleUserSelect} />
            <div className="flex-grow h-full">
                <MeetChatRoom 
                    username={selectedUser} 
                    messages={chatMessages[selectedUser] || []} 
                    onSendMessage={handleSendMessage} 
                />
            </div>
        </div>
    );
};

export default ChatPage;


