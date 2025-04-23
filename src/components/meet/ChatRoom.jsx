// // ChatRoom 컴포넌트

// import { useEffect, useState, useRef } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// // import "./ChatRoom.css";

// function ChatRoom() {
//     const { search } = useLocation();
//     const urlParams = new URLSearchParams(search);
//     const roomId = urlParams.get("roomId");
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const stompClientRef = useRef(null);

//     const currentUser = sessionStorage.getItem("nickName"); // 현재 사용자 닉네임
//     const token = sessionStorage.getItem("accessToken"); // 토큰

//     // 채팅방에 유저 등록 (입장)
//     const joinRoom = async () => {
//         try {
//             if (!roomId || !token) {
//                 console.error("roomId 또는 Token이 존재하지 않습니다.");
//                 return;
//             }
//             // 유저가 해당 방에 들어가도록 유저 번호 등록
//             await axios.post(`http://localhost:8080/api/v1/chat/${roomId}/access`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("채팅방에 입장하였습니다.");
//         } catch (error) {
//             console.error("채팅방 입장 오류:", error);
//         }
//     };

//     // WebSocket 연결 및 STOMP 설정
//     useEffect(() => {
//         if (!roomId) {
//             console.error("roomId가 정의되지 않았습니다.");
//             return;
//         }

//         if (!token) {
//             console.error("Token이 존재하지 않습니다.");
//             return;
//         }

//         // WebSocket 연결 설정
//         if (stompClientRef.current && stompClientRef.current.connected) {
//             return;
//         }

//         const socket = new SockJS("http://localhost:8080/ws/chat");
//         const client = Stomp.over(socket);
//         stompClientRef.current = client;

//         client.connect(
//             { Authorization: `Bearer ${token}` },
//             () => {
//                 // 채팅방 메시지 수신 대기
//                 client.subscribe(`/topic/${roomId}`, (msg) => {
//                     const receivedMessage = JSON.parse(msg.body);
//                     setMessages((prevMessages) => [
//                         ...prevMessages,
//                         receivedMessage,
//                     ]);
//                 });

//                 // 입장 메시지 전송
//                 client.send(
//                     `/send/${roomId}`,
//                     {},
//                     JSON.stringify({
//                         sender: currentUser,
//                         message: `${currentUser}님이 입장하셨습니다.`,
//                         roomId: roomId,
//                         type: "ENTER",
//                         timestamp: new Date().toLocaleTimeString(),
//                     })
//                 );
//             },
//             (error) => {
//                 console.error("WebSocket 연결 실패:", error);
//             }
//         );

//         // 채팅방 입장
//         joinRoom();

//         // 채팅방 메시지 목록 가져오기
//         const fetchMessages = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/v1/chat/${roomId}/messages`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setMessages(response.data);
//             } catch (error) {
//                 console.error("메시지 가져오기 오류:", error);
//             }
//         };
//         fetchMessages();

//         // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
//         return () => {
//             if (stompClientRef.current && stompClientRef.current.connected) {
//                 stompClientRef.current.disconnect(() => {
//                     console.log("Disconnected from WebSocket");
//                 });
//             }
//         };
//     }, [roomId, currentUser, token]);

//     // 메시지 전송
//     const sendMessage = () => {
//         if (newMessage.trim() && stompClientRef.current) {
//             try {
//                 stompClientRef.current.send(
//                     `/send/${roomId}`,
//                     { Authorization: `Bearer ${token}` },
//                     JSON.stringify({
//                         sender: currentUser,
//                         message: newMessage,
//                         roomId: roomId,
//                         type: "TALK",
//                         timestamp: new Date().toLocaleTimeString(),
//                     })
//                 );
//                 setNewMessage(""); // 전송 후 입력창 초기화
//             } catch (error) {
//                 console.error("메시지 전송 오류:", error);
//             }
//         }
//     };

//     // 새로운 메시지가 오면 스크롤을 맨 아래로 이동
//     useEffect(() => {
//         const messagesContainer = document.querySelector('.messages');
//         if (messagesContainer) {
//             messagesContainer.scrollTop = messagesContainer.scrollHeight;
//         }
//     }, [messages]);

//     return (
//         <div className="chat-room">
//             <h4>채팅방 {roomId}</h4>
//             <div className="messages">
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`message-bubble ${
//                             msg.sender === currentUser
//                                 ? "my-message"
//                                 : "other-message"
//                         }`}
//                     >
//                         <div className="message-info">
//                             <span className="sender-name">{msg.sender}</span>
//                             <span className="timestamp">{msg.timestamp}</span>
//                         </div>
//                         <p className="message-text">{msg.message}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="input-area">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="메시지를 입력하세요"
//                 />
//                 <button onClick={sendMessage}>전송</button>
//             </div>
//         </div>
//     );
// }

// export default ChatRoom;
