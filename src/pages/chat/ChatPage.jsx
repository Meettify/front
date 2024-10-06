import React, { useState } from "react";
import MeetChatList from "../../components/meet/MeetChatList";
import MeetChatRoom from "../../components/meet/MeetChatRoom";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState('');  // 선택된 유저 이름
    const [chatMessages, setChatMessages] = useState({});  // 유저별 채팅 메시지 관리

    const handleUserSelect = (username) => {
        setSelectedUser(username);
    };

    const handleSendMessage = (username, message) => {
        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [username]: [...(prevMessages[username] || []), message]  // 선택된 유저의 메시지를 업데이트
        }));
    };

    return (
        <div className="flex h-screen w-screen">
            <MeetChatList onUserSelect={handleUserSelect} /> {/* 유저 선택 시 호출 */}
            <MeetChatRoom 
                username={selectedUser} 
                messages={chatMessages[selectedUser] || []}  // 선택된 유저의 메시지 목록을 전달
                onSendMessage={handleSendMessage}  // 메시지 전송 함수 전달
            />
        </div>
    );
};

export default ChatPage;
