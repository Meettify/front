// Chat 컴포넌트
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp, Client } from "@stomp/stompjs";
import MapSearch from "../../components/chat/MapSearch";
import { useNavigate } from "react-router-dom";

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
  const [currentUser, setCurrentUser] = useState("");
  const stompClientRef = useRef(null);
  const roomId = new URLSearchParams(window.location.search).get("roomId");
  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const nickname = localStorage.getItem("nickName");
    if (nickname) setCurrentUser(nickname);
  }, []);

  // 접속중인 채팅방 가져오기
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chat/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setChatRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("채팅방 목록 불러오기 실패:", error);
        setChatRooms([]);
      }
    };
    fetchRooms();
  }, [BASE_URL, token]);

  // 채팅 내용 가져오기
  useEffect(() => {
    if (roomId) {
      fetch(`${BASE_URL}/chat/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMessages(Array.isArray(data) ? data : []))
        .catch((err) => {
          console.warn("메시지 조회 중 오류:", err.message);
          setMessages([]);
        });
    }
  }, [roomId, BASE_URL, token]);

  // 웹소켓 연결
  useEffect(() => {
    if (!roomId || !token || !currentUser) return;

    const client = new Client({
      webSocketFactory: () => new WebSocket("http://localhost:8080/ws/chat"),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log("[STOMP]", str),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);

        client.subscribe(`/topic/${roomId}`, (msg) => {
          const received = JSON.parse(msg.body);
          if (!received.sender) received.sender = "알 수 없음";
          if (!received.writeTime)
            received.writeTime = new Date().toISOString();
          setMessages((prev) => [...prev, received]);
        });

        client.publish({
          destination: `/send/${roomId}`,
          body: JSON.stringify({
            sender: currentUser,
            message: `${currentUser}님이 입장했습니다.`,
            roomId: roomId,
            type: "ENTER",
            writeTime: new Date().toISOString(),
          }),
        });
        console.log("보내는 메시지:", {
          sender: currentUser,
          message: `${currentUser}님이 입장했습니다.`,
          roomId: roomId,
          type: "ENTER",
          writeTime: new Date().toISOString(),
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류:", frame.headers["message"]);
      },
      onWebSocketError: (event) => {
        console.error("❌ WebSocket 오류:", event);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId, token, currentUser]);

  useEffect(() => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_API_KEY
      }&libraries=services`;
      script.async = true;
      script.onload = () => {
        console.log("카카오 맵 스크립트 로드됨");
      };
      document.head.appendChild(script);
    }
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;

    const newMsg = {
      sender: currentUser,
      message: newMessage,
      roomId,
      type: "TALK",
      // 백엔드에서 time을 설정하므로 프론트에서 굳이 넣지 않아도 됩니다
    };

    stompClientRef.current.publish({
      destination: `/send/${roomId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(newMsg),
    });

    // ❌ 절대 setMessages 하지 마세요 (중복 방지)
    setNewMessage(""); // 입력창 초기화만!
  };

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

  const sharePlace = (place) => {
    const newMsg = {
      sender: currentUser,
      roomId,
      type: "PLACE",
      place: {
        title: place.title,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        mapUrl: `https://map.kakao.com/link/map/${place.title},${place.lat},${place.lng}`,
      },
    };

    // 서버에도 publish 해서 저장시킨다
    stompClientRef.current.publish({
      destination: `/send/${roomId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(newMsg),
    });

    console.log("Kakao Key:", KAKAO_API_KEY);
    console.log("위도(lat):", newMsg.place.lat);
    console.log("경도(lng):", newMsg.place.lng);

    setIsModalOpen(false);
  };

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
        navigate("/");
      })
      .catch((error) => console.error("채팅방 나가기 실패:", error));
  };

  const currentRoom = chatRooms.find(
    (room) => String(room.roomId) === String(roomId)
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="w-1/4 bg-white border-r p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">채팅방 목록</h2>
        <ul className="space-y-2 overflow-y-auto flex-1">
          {chatRooms.map((room) => (
            <li
              key={room.roomId}
              className={`p-2 rounded cursor-pointer ${
                room.roomId === (roomId ? Number(roomId) : null)
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => (window.location.href = `?roomId=${room.roomId}`)}
            >
              {room.roomName}
            </li>
          ))}
        </ul>
      </div>

      {/* 중간 메인 부분 제목 & 나가기 버튼 */}
      <div className="flex-1 flex flex-col bg-white border-r h-screen">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {currentRoom ? currentRoom.roomName : `채팅방 ${roomId}`}
          </h3>
          <button
            onClick={leaveRoom}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            나가기
          </button>
        </div>

        {/* 중간 메인 부분 채팅 내용 부분 */}
        <div className="flex-1 min-h-0  max-h-[1350px]  overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-xs">
                {msg.sender !== currentUser && (
                  <div className="text-xs text-gray-500 mb-1 text-left">
                    {msg.sender}
                  </div>
                )}

                <div
                  className={`p-3 rounded-lg shadow-md whitespace-pre-wrap break-words ${
                    msg.sender === currentUser
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  {msg.type === "PLACE" && msg.place ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => window.open(msg.place.mapUrl, "_blank")}
                    >
                      {/* <img
                        src={`https://dapi.kakao.com/v2/maps/staticmap?appkey=${KAKAO_API_KEY}&center=${msg.place.lng},${msg.place.lat}&level=3&size=400x200&markers=color:red|label:P|${msg.place.lat},${msg.place.lng}`}
                        alt="지도 미리보기"
                        className="rounded w-full h-auto mb-2"
                        onError={(e) => {
                          e.target.src = "/fallback-map.png";
                        }}
                      /> */}
                      <div>
                        <strong>{msg.place.title}</strong>
                        <p className="text-sm text-gray-600">
                          {msg.place.address}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>

                <div
                  className={`text-xs mt-1 ${
                    msg.sender === currentUser
                      ? "text-right text-gray-300"
                      : "text-left text-gray-500"
                  }`}
                >
                  {msg.writeTime && !isNaN(Date.parse(msg.writeTime))
                    ? new Date(msg.writeTime).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "시간 오류"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 채팅 입력창 줄 */}
        <div className="flex-none p-4 border-t flex items-center gap-2 overflow-hidden">
          <input
            type="text"
            value={newMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage(newMessage);
            }}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
            className="flex-grow p-2 border rounded min-w-0 max-w-[70%]"
          />

          {/* ✅ 여기 주소 공유 버튼 넣기 */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-shrink-0 bg-gray-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            주소 공유
          </button>

          <button
            onClick={() => sendMessage(newMessage)}
            className="flex-shrink-0 bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            전송
          </button>
        </div>

        {/* 🗺️ 지도 공유 모달 */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-4/5 h-4/5 rounded-lg shadow-lg overflow-hidden relative">
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
              <MapSearch
                onSelectPlace={sharePlace}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-[180px] bg-white border-l p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">접속 인원</h2>
        <ul className="space-y-2 overflow-y-auto flex-1">
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
    </div>
  );
};

export default Chat;
