import React, { useState } from "react";
import MeetChatList from "../../components/meet/MeetChatList";
import MeetChatRoom from "../../components/meet/MeetChatRoom";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState('');  // 선택된 유저 이름
    const [chatMessages, setChatMessages] = useState({});  // 유저별 채팅 메시지 관리
    const [lastMessages, setLastMessages] = useState({}); // 각 유저별 마지막 메시지 저장

    const handleUserSelect = (username) => {
        setSelectedUser(username);
    };

    const handleSendMessage = (username, message) => {
        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [username]: [...(prevMessages[username] || []), message]
        }));

        setLastMessages((prevLastMessages) => ({
            ...prevLastMessages,
            [username]: message,
        }));
    };

    return (
        <div className="flex h-screen">
            {/* 데스크톱에서는 왼쪽에 MeetChatList가 보이고, 모바일에서는 위로 올라감 */}
            <div className="w-full md:w-1/4 lg:w-1/5 min-w-[250px]">
                {console.log(MeetChatList)}
                <MeetChatList 
                    onUserSelect={handleUserSelect} 
                    lastMessages={lastMessages}
                />
            </div>
            <div className="flex-grow">
                <MeetChatRoom 
                    username={selectedUser} 
                    messages={chatMessages[selectedUser] || []}
                    onSendMessage={handleSendMessage}
                />
            </div>
            {console.log("MeetChatList rendered")};

            <div className="block md:hidden w-full">
                <MeetChatList 
                    onUserSelect={handleUserSelect} 
                    lastMessages={lastMessages}
                />  
            </div>
        </div>
    );
};

export default ChatPage;
