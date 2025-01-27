// Chat 컴포넌트
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Modal from "../../components/chat/Modal";
import MapSearch from "../../components/chat/MapSerach";

if (typeof window !== "undefined") {
  window.global = window;
}

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [connected, setConnected] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const stompClientRef = useRef(null);
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  const currentUser = localStorage.getItem("nickName");
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

  const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL; // 환경변수에서 API base URL을 가져옴

  // WebSocket 연결 및 STOMP 클라이언트 설정
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰을 가져옴
    const socket = new SockJS(`${BASE_URL}/ws/chat`); // WebSocket 연결
    const client = Stomp.over(socket);
    stompClientRef.current = client;

    // STOMP 연결
    client.connect(
      { Authorization: `Bearer ${token}` },
      (frame) => {
        setConnected(true);
        console.log("STOMP 연결 성공", frame);

        // 해당 채팅방에 대한 메시지 구독
        client.subscribe(`/exchange/chat.exchange/room.${roomId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          if (receivedMessage.type === "PLACE") {
            const place = JSON.parse(receivedMessage.message);
            setMessages((prev) => [...prev, { type: "PLACE", place }]);
          } else {
            setMessages((prev) => [...prev, receivedMessage]);
          }
        });
      },
      (error) => {
        console.error("STOMP 연결 실패:", error);
        alert("STOMP 연결 실패! 서버가 실행 중인지 확인하세요.");
      }
    );

    // 채팅방 목록 가져오기
    fetch(`${BASE_URL}/chat/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChatRooms(data))
      .catch((error) => console.error("채팅방 목록 가져오기 실패:", error));

    return () => {
      if (client.connected) client.disconnect();
    };
  }, [roomId]);

  // 메시지 보내는 기능
  const sendMessage = (message, type = "TALK") => {
    const token = localStorage.getItem("accessToken");
    stompClientRef.current?.send(
      `/pub/chat.message.${roomId}`,
      { Authorization: `Bearer ${token}` },
      JSON.stringify({
        sender: currentUser,
        message,
        roomId,
        type,
        timestamp: new Date().toISOString(),
      })
    );
    if (type === "TALK") setNewMessage("");
  };

  // 현재 채팅방 멤버 리스트 가져오기
  useEffect(() => {
    if (roomId) {
      fetch(`${BASE_URL}/chat/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setRoomMembers(data))
        .catch((error) => console.error("채팅방 멤버 가져오기 실패:", error));
    }
  }, [roomId]);

  // 장소 공유
  const sharePlace = (place) => {
    const message = JSON.stringify({
      title: place.title,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      mapUrl: `https://map.kakao.com/link/map/${place.title},${place.lat},${place.lng}`, // Kakao Maps 링크
    });
    sendMessage(message, "PLACE");
    setIsModalOpen(false); // 지도 공유 모달 닫기
  };

  //채팅방 나가기
  const leaveRoom = () => {
    fetch(`${BASE_URL}/chat/${roomId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("채팅방에서 나갔습니다.");
        window.location.href = "/"; // 홈으로 이동
      })
      .catch((error) => console.error("채팅방 나가기 실패:", error));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 채팅방 목록 */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-4">채팅방 목록</h2>
        <ul className="space-y-2">
          {Array.isArray(chatRooms) && chatRooms.length > 0 ? (
            chatRooms.map((room) => (
              <li
                key={room.roomId}
                className={`p-2 rounded cursor-pointer ${
                  room.roomId === Number(roomId)
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() =>
                  (window.location.href = `?roomId=${room.roomId}`)
                }
              >
                {room.roomName}
              </li>
            ))
          ) : (
            <li>채팅방이 없습니다.</li>
          )}
        </ul>
      </div>

      {/* 채팅창 */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">채팅방 {roomId}</h3>
          <button
            onClick={leaveRoom}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            나가기
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-4 rounded-lg shadow-md ${
                  msg.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border"
                }`}
              >
                {msg.type === "PLACE" ? (
                  <div
                    className="p-4 bg-gray-100 rounded shadow cursor-pointer"
                    onClick={() => {
                      const kakaoMapLink = `https://map.kakao.com/link/map/${msg.place.title},${msg.place.lat},${msg.place.lng}`;
                      window.open(kakaoMapLink, "_blank");
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Kakao Static Map으로 지도 미리보기 */}
                      <img
                        src={`https://dapi.kakao.com/v2/maps/staticmap?appkey=${KAKAO_API_KEY}&center=${msg.place.lng},${msg.place.lat}&level=3&size=200x150`}
                        alt="map preview"
                        className="w-24 h-24 rounded"
                      />
                      <div>
                        <strong>{msg.place.title}</strong>
                        <p>{msg.place.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="break-words">{msg.message}</p>
                )}
                {/* 시간 표시 */}
                <span
                  className={`text-xs mt-2 ${
                    msg.sender === currentUser
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => sendMessage(newMessage)}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            전송
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 bg-green-500 text-white p-2 rounded"
          >
            주소 공유
          </button>
        </div>
      </div>

      {/* 접속 인원 */}
      <div className="w-1/4 bg-white border-l p-4">
        <h2 className="text-lg font-bold mb-4">접속 인원</h2>
        <ul className="space-y-2">
          {roomMembers.map((member) => (
            <li
              key={member.nickName}
              className={`p-2 rounded ${
                member.isOnline ? "bg-green-100" : "bg-gray-200 text-gray-500"
              }`}
            >
              {member.nickName}
            </li>
          ))}
        </ul>
      </div>

      {/* 장소 공유 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={
          <MapSearch
            onSelectPlace={(place) => sharePlace(place)}
            setSearchResults={setSearchResults}
          />
        }
      />
    </div>
  );
};

export default Chat;
