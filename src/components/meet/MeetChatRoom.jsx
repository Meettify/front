import React, { useState, useEffect, useRef } from 'react';
import RoundedButton from '../button/RoundedButton';

const MeetChatRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const chatRoomRef = useRef(null);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const addMessage = () => {
        if (message.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: message, sender: 'user' }
            ]);
            setMessage('');

            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'This is a reply from the other user.', sender: 'other' }
                ]);
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
        chatRoom.scrollTop = chatRoom.scrollHeight; // 새로운 메시지 추가 시 스크롤
    }, [messages]);

    return (
        <div className="flex-none w-full md:w-3/4 mx-auto h-full md:h-5/6 overflow-hidden"> 
            <div 
                className="w-full flex flex-col h-full"
                style={{ overflow: 'hidden' }} // 스크롤 제거
            >
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
                                {msg.sender === 'user' ? (
                                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                        {msg.sender}
                                        {msg.text}
                                    </div>
                                )}
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
