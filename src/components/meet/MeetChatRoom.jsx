import React, { useState, useEffect, useRef } from 'react';
import RoundedButton from '../button/RoundedButton';

const MeetChatRoom = () => {
    const [message, setMessage] = useState(''); // 현재 입력된 메시지 상태
    const [messages, setMessages] = useState([]); // 저장된 메시지 목록 상태
    const messagesEndRef = useRef(null); // 메시지 끝 위치를 참조하기 위한 ref

    const handleInputChange = (e) => {
        setMessage(e.target.value); // 입력값 업데이트
    };

    const addMessage = () => {
        if (message.trim()) { // 빈 메시지는 저장하지 않도록
            setMessages(prevMessages => [
                ...prevMessages,
                { text: message, sender: 'user' } // 사용자 메시지 추가
            ]);
            setMessage(''); // 입력 필드 비우기

            // 상대방 메시지를 시뮬레이션 (예: 1초 후)
            setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'This is a reply from the other user.', sender: 'other' } // 상대방 메시지 추가
                ]);
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // 엔터 키가 눌리면
            e.preventDefault(); // 기본 동작 방지
            addMessage(); // 메시지 추가
        }
    };

    const handleButtonClick = () => {
        addMessage(); // 버튼 클릭 시 메시지 추가
    };

    // 메시지 추가 시 스크롤을 아래로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
      <div className="flex-none w-3/4 h-screen"> {/* 전체 높이를 스크린에 맞춤 */}
        <div className="container mx-auto shadow-lg rounded-lg h-full flex flex-col"> {/* 전체 높이를 차지하도록 설정 */}
            <div className="w-full px-5 flex flex-col h-full">
                <div className="flex flex-col mt-5 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(100vh - 150px)' }}> {/* header 높이 만큼 줄임 */}
                  {messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500"> {/* 내용이 없을 때의 스타일 */}
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
                          <>
                            <p>other user</p>
                            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              {msg.text}
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} /> {/* 메시지 끝 위치를 표시 */}
                </div>
                {/* 입력 필드와 버튼을 하단에 고정 */}
                <div className="flex items-center mt-auto"> {/* mt-auto를 사용하여 하단으로 고정 */}
                  <input
                    className="w-full bg-gray-300 py-3 px-3 rounded-xl mr-2"
                    type="text"
                    placeholder="type your message here..."
                    value={message} // 상태에 따라 입력값 설정
                    onChange={handleInputChange} // 입력값 변경 핸들러
                    onKeyDown={handleKeyDown} // 키 다운 핸들러
                  />
                  <RoundedButton onClick={handleButtonClick}> {/* 버튼 클릭 시 핸들러 추가 */}
                    send
                  </RoundedButton>
                </div>
              </div>
            </div>
        </div>
    );
};

export default MeetChatRoom;
