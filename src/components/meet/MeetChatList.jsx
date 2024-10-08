import React, { useState } from 'react';
import { useChatStore } from '../../hooks/useChatStore';

const MeetChatList = ({ onUserSelect }) => {
    const [selectedId, setSelectedId] = useState(null);
    const lastMessages = useChatStore((state) => state.lastMessages); // Zustand에서 마지막 메시지 가져오기

    const handleClick = (id, username) => {
        setSelectedId(id);
        onUserSelect(username); // 선택된 유저 이름을 상위 컴포넌트로 전달
    };

    const chatItems = [
        { id: 1, username: 'Luis1994' },
        { id: 2, username: 'Everest Trip 2021' },
        { id: 3, username: 'MERN Stack' },
        { id: 4, username: 'Javascript Indonesia' },
    ];

    // 최신 메시지 순으로 정렬
    const sortedChatItems = chatItems.sort((a, b) => {
        const lastMessageA = lastMessages[a.username];
        const lastMessageB = lastMessages[b.username];
        return (
            (lastMessageB && new Date(lastMessageB.timestamp)) - (lastMessageA && new Date(lastMessageA.timestamp))
        );
    });

    return (
        <div className="flex-none w-full md:w-1/4 mx-auto h-full md:h-5/6 overflow-hidden px-10">
            <div className="flex flex-col mt-5 overflow-y-auto h-full">
                {sortedChatItems.length === 0 ? ( // 여기 추가
                    <div className="text-center text-gray-500">No chats available.</div> // No chats available 메시지
                ) : (
                    sortedChatItems.map((item) => {
                        const lastMessage = lastMessages[item.username];
                        return (
                            <div
                                key={item.id}
                                className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${selectedId === item.id ? 'border-l-4 border-blue-400' : ''}`}
                                onClick={() => handleClick(item.id, item.username)}  // 클릭 시 유저 이름 전달
                            >
                                <div className="w-full">
                                    <div className="text-sm font-semibold">{item.username}</div>
                                    <span className="text-gray-500 text-sm">{lastMessage ? lastMessage.text : 'No messages yet.'}</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MeetChatList;
