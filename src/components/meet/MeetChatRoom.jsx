import React, { useState, useEffect, useRef } from "react";
import RoundedButton from '../button/RoundedButton';
import { useChatStore } from '../../hooks/useChatStore'; // Zustand 훅 import

const MeetChatRoom = ({ username, messages, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const chatRoomRef = useRef(null);
    const [isComposing, setIsComposing] = useState(false); // 조합 상태
    const setLastMessage = useChatStore((state) => state.setLastMessage); // 상태 업데이트 함수 가져오기

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const addMessage = () => {
        if (message.trim() && !isComposing) {
            const timestamp = new Date().toLocaleTimeString(); // 타임스탬프 생성
            const newMessage = {
                text: message,
                sender: 'user',
                timestamp: timestamp
            };
            onSendMessage(username, newMessage);
            setMessage('');

            // 마지막 메시지를 업데이트
            setLastMessage(username, newMessage);

            // 자동 응답
            setTimeout(() => {
                const replyMessage = {
                    text: 'This is a reply from the other user.',
                    sender: 'other',
                    timestamp: new Date().toLocaleTimeString()
                };
                onSendMessage(username, replyMessage);
                // 마지막 메시지 업데이트
                setLastMessage(username, replyMessage);
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isComposing) {
            e.preventDefault();
            addMessage();
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        addMessage();
    };

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = () => {
        setIsComposing(false);
    };

    useEffect(() => {
        const chatRoom = chatRoomRef.current;
        chatRoom.scrollTop = chatRoom.scrollHeight;
    }, [messages]);

    return (
        <div className="flex-none w-full md:w-3/4 mx-auto h-full md:h-5/6 overflow-hidden px-10">
            <div className="w-full flex flex-col h-full" style={{ overflow: 'hidden' }}>
                <div className="text-xl font-semibold mb-2">{username || '...'}</div>
                <div className="flex flex-col flex-grow overflow-y-auto" ref={chatRoomRef}>
                    {messages.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div className="flex flex-col p-4">
                                    {msg.sender === 'user' ? (
                                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white mb-2">
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white mb-2">
                                            {msg.text}
                                        </div>
                                    )}
                                    <span className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-left' : 'text-right'}`}>
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center p-2">
                    <input
                        className="flex-grow bg-gray-300 py-3 px-3 rounded-xl mr-2"
                        type="text"
                        placeholder="type your message here..."
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={handleCompositionEnd}
                    />
                    <RoundedButton onClick={handleButtonClick} className="py-3 px-5 rounded-xl">
                        send
                    </RoundedButton>
                </div>
            </div>
        </div>
    );
};

export default MeetChatRoom;
