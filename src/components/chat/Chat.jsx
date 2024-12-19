import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import "./ChatRoom.css"; // 스타일을 위한 CSS 파일

function ChatRoom() {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const roomId = urlParams.get("roomId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const stompClientRef = useRef(null);

  const currentUser = localStorage.getItem("nickName"); // 현재 사용자 닉네임 가져오기

  useEffect(() => {
    if (!roomId) {
      console.error("roomId가 정의되지 않았습니다.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("Token이 존재하지 않습니다.");
      return;
    }

    if (stompClientRef.current && stompClientRef.current.connected) {
      return;
    }

    const socket = new SockJS("wss://meettify.store/ws/chat");
    const client = Stomp.over(socket);
    stompClientRef.current = client;

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        client.subscribe(`/exchange/chat.exchange/room.{roomId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        client.send(
          `/pub/chat.message.${roomId}`,
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
      const token = localStorage.getItem("accessToken");
      stompClientRef.current.send(
        `/pub/chat.message.${roomId}`,
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-lg shadow-md rounded-lg flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800">
            채팅방 {roomId}
          </h4>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 text-sm ${
                  msg.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {msg.sender} • {msg.timestamp}
                </div>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
