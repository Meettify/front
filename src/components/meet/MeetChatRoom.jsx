import React, { useState } from 'react';

const MeetChatRoom = ({ username, messages, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message) {
            onSendMessage(username, message);
            setMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend(); // 엔터 키로 메시지 전송
        }
    };

    return (
        <div className="flex flex-col w-full h-full p-5">
            <h2 className="text-xl font-bold">{username}의 채팅</h2>
            <div className="flex-grow overflow-y-auto border p-2">
                {messages.map((msg, index) => (
                    <div key={index} className="py-1">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // 키 다운 이벤트 추가
                    className="flex-grow border rounded p-2"
                    placeholder="메시지를 입력하세요..."
                />
                <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded">전송</button>
            </div>
        </div>
    );
};

export default MeetChatRoom;
