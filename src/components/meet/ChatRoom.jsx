import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useLocation } from "react-router-dom";
import "./ChatRoom.css"; // 스타일을 위한 CSS 파일

function ChatRoom() {
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const roomId = urlParams.get("roomId");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const stompClientRef = useRef(null);

    const currentUser = sessionStorage.getItem("nickName"); // 현재 사용자 닉네임 가져오기

    useEffect(() => {
        if (!roomId) {
            console.error("roomId가 정의되지 않았습니다.");
            return;
        }

        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            console.error("Token이 존재하지 않습니다.");
            return;
        }

        if (stompClientRef.current && stompClientRef.current.connected) {
            return;
        }

        const socket = new SockJS("http://localhost:8080/ws/chat");
        const client = Stomp.over(socket);
        stompClientRef.current = client;

        client.connect(
            { Authorization: `Bearer ${token}` },
            () => {
                client.subscribe(`/topic/${roomId}`, (msg) => {
                    const receivedMessage = JSON.parse(msg.body);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        receivedMessage,
                    ]);
                });

                client.send(
                    `/send/${roomId}`,
                    {},
                    JSON.stringify({
                        sender: currentUser,
                        message: `${currentUser}님이 입장하셨습니다.`,
                        roomId: roomId,
                        type: "ENTER",
                        timestamp: new Date().toLocaleTimeString(),
                    })
                );
            },
            (error) => {
                console.error("WebSocket 연결 실패:", error);
            }
        );

        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                stompClientRef.current.disconnect(() => {
                    console.log("Disconnected from WebSocket");
                });
            }
        };
    }, [roomId, currentUser]);

    const sendMessage = () => {
        if (newMessage.trim() && stompClientRef.current) {
            const token = sessionStorage.getItem("accessToken");
            stompClientRef.current.send(
                `/send/${roomId}`,
                { Authorization: `Bearer ${token}` },
                JSON.stringify({
                    sender: currentUser,
                    message: newMessage,
                    roomId: roomId,
                    type: "TALK",
                    timestamp: new Date().toLocaleTimeString(),
                })
            );
            setNewMessage("");
        }
    };

    return (
        <div className="chat-room">
            <h4>채팅방 {roomId}</h4>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-bubble ${
                            msg.sender === currentUser
                                ? "my-message"
                                : "other-message"
                        }`}
                    >
                        <div className="message-info">
                            <span className="sender-name">{msg.sender}</span>
                            <span className="timestamp">{msg.timestamp}</span>
                        </div>
                        <p className="message-text">{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default ChatRoom;