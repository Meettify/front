import React, { useState, useEffect, useRef } from 'react';
import RoundedButton from '../button/RoundedButton';

const MeetChatRoom = ({ username, messages, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const chatRoomRef = useRef(null);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const addMessage = () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString()  // 현재 시간 추가
            };
            onSendMessage(username, newMessage);  // 부모 컴포넌트에 메시지 전달
            setMessage('');

            setTimeout(() => {
                const replyMessage = {
                    text: 'This is a reply from the other user.',
                    sender: 'other',
                    timestamp: new Date().toLocaleTimeString()  // 응답 시간 추가
                };
                onSendMessage(username, replyMessage);  // 1초 후 자동 응답
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMessage();
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        addMessage();
    };

    useEffect(() => {
        const chatRoom = chatRoomRef.current;
        chatRoom.scrollTop = chatRoom.scrollHeight;  // 메시지가 추가될 때 스크롤 자동 이동
    }, [messages]);

    return (
        <div className="flex-none w-full md:w-3/4 mx-auto h-full md:h-5/6 overflow-hidden px-10">
            <div 
                className="w-full flex flex-col h-full"
                style={{ overflow: 'hidden' }} 
            >
                <div className="text-xl font-semibold mb-2">{username || '...'}</div> {/* 유저 이름 표시 */}
                <div 
                    className="flex flex-col flex-grow overflow-y-auto" 
                    ref={chatRoomRef}
                >
                    {messages.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div className="flex flex-col">
                                    {msg.sender === 'user' ? (
                                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                            {msg.text}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1 text-right"> {/* 시간 아래로 마진 추가 */}
                                        {msg.timestamp}
                                    </div>
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
