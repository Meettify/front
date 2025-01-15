// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DetailImage from '../../components/meet/DetailImage';
// import { getMeetingDetail, deleteMeet, postMeetJoin } from '../../api/meetAPI';
// import MeetSideMenu from '../../components/meet/MeetSideMenu';
// import RoundedButton from '../../components/button/RoundedButton';
// import MeetJoin from '../../components/meet/MeetJoin';

// const MeetDetail = () => {
//   const { meetId } = useParams();
//   // const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [meeting, setMeeting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [chatRoomExists, setChatRoomExists] = useState(false);
//   const [roomId, setRoomId] = useState(null); // roomId 상태 추가
//   const [meetRole, setMeetRole] = useState(null);
//   const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedMeeting = await getMeetingDetail(meetId);
//         setMeeting(fetchedMeeting);
//         setMeetRole(fetchedMeeting.meetRole); // meetRole을 상태로 저장

//         // 채팅방이 이미 존재하는지 여부를 확인하는 로직 추가
//         if (fetchedMeeting && fetchedMeeting.roomId) {
//           setChatRoomExists(true);
//           setRoomId(fetchedMeeting.roomId); // 이미 존재하는 roomId 상태에 저장
//         } else {
//           setChatRoomExists(false);
//         }
        
//         setLoading(false);
//       } catch (error) {
//         console.error('모임 상세 정보 가져오기 오류:', error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [meetId]);

//   if (loading) return <div>Loading...</div>;
//   if (!meeting || !meeting.meetDetailDTO) return <div>모임 정보를 불러올 수 없습니다.</div>;

//   const { meetName, meetDescription, meetMaximum, meetLocation, images } = meeting.meetDetailDTO;
//   const imageUrl = images && images.length > 0 ? images[0] : null;
//   const { meetPermissionDTO } = meeting;

//   const handleEdit = () => {
//     navigate(`/meet/update/${meetId}`);
//   };

//   const handleDelete = async () => {
//     if (window.confirm('정말로 이 모임을 삭제하시겠습니까?')) {
//       try {
//         const response = await deleteMeet(meetId);
//         if (response.status === 200) {
//           alert('모임이 성공적으로 삭제되었습니다.');
//           navigate('/meet/list');
//         } else {
//           alert('모임 삭제에 실패했습니다. 다시 시도해 주세요.');
//         }
//       } catch (error) {
//         console.error('모임 삭제 오류:', error);
//         alert('모임 삭제에 실패했습니다.');
//       }
//     }
//   };

//   const handleJoinSubmit = async () => {
//     try {
//       const response = await postMeetJoin(meetId); // 가입 신청 API 호출
//       console.log('응답 객체 전체:', response); // 응답 객체 전체 확인
  
//       if (response && response.data) {
//         console.log('응답 데이터:', response.data); // 서버에서 받은 데이터 구조 출력
//         if (response.data.message === '가입 신청이 완료되었습니다.') {
//           alert('가입 신청이 완료되었습니다.');
//         } else {
//           alert(`가입 신청에 실패했습니다. 서버 응답: ${response.data.message || '알 수 없는 오류'}`);
//         }
//       } else {
//         //alert('서버 응답이 올바르지 않습니다.');
//       }
//     } catch (error) {
//       console.error('가입 신청 오류:', error);
//       alert('가입 신청에 실패했습니다. 서버에 문제가 있을 수 있습니다.');
//     }
//   };

//   // 회원 조회 버튼 클릭 핸들러
//   const handleMemberAccept = () => {
//     navigate(`/meets/${meetId}/members`); // 회원 조회 페이지로 이동
//   };
//   const handleMeetComm = () => {
//     navigate(`/meetBoards/list/${meetId}`);
//   }

//   // 채팅방 생성 버튼 클릭 핸들러
//    const handleChatRoom = async () => {
//     try {
//       const token = sessionStorage.getItem('accessToken'); // accessToken을 직접 가져옵니다.
  
//       if (!meetName || !meetId) {
//         alert("모임 이름 또는 모임 ID가 없습니다.");
//         return;
//       }
  
//       // 채팅방 존재 여부 확인
//       const checkResponse = await fetch(`${BASE_URL}/chat/${meetId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (!checkResponse.ok) {
//         throw new Error('채팅방 확인에 실패했습니다.');
//       }
  
//       const checkData = await checkResponse.json();
      
//       // 채팅방이 존재하는 경우
//       if (checkData === true) {  // checkData가 boolean 값 true일 경우 채팅방 존재
//         setChatRoomExists(true); // 채팅방 존재 상태로 업데이트
//         alert('이미 채팅방이 생성되었습니다. 채팅방으로 이동합니다.'); 
//         handleEnterChat(roomId);
//         return;
//       }
  
//       // 채팅방이 존재하지 않으면 새로운 채팅방을 생성하는 요청
//       const createResponse = await fetch(`${BASE_URL}/chat/room?roomName=${encodeURIComponent(meetName)}&meetId=${meetId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
  
//       if (createResponse.ok) {
//         const createData = await createResponse.json();
//         console.log('서버 응답 데이터:', createData); // 서버 응답 데이터 확인
  
//         if (createData.roomId && createData.roomName) {
//           alert(`채팅방 생성 완료: ${createData.roomName} (ID: ${createData.roomId})`);
//           setChatRoomExists(true); // 채팅방 생성 완료 후 상태 업데이트
//           setRoomId(createData.roomId); // roomId 업데이트
//           navigate(`/chat?roomId=${createData.roomId}`);  // 생성된 채팅방으로 이동
//         } else {
//           alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
//         }
//       } else {
//         throw new Error('채팅방 생성에 실패했습니다.');
//       }
//     } catch (error) {
//       console.error('채팅방 신청 오류:', error);
//       alert('채팅방 신청에 실패했습니다. 다시 시도해주세요.');
//     }
//   };

//   //채팅방 입장
//   const handleEnterChat = async (roomId) => {
//     console.log(`채팅방 아이디 :: ${roomId}`);
//     // roomId가 객체인 경우, 문자열로 변환
//     const roomIdStr = typeof roomId === 'string' ? roomId : roomId?.roomId || ''; // roomId가 객체일 경우 roomId 속성 사용
//     if (roomIdStr) {
//       navigate(`/chat?roomId=${roomIdStr}`);
//     } else {
//       alert('채팅방 ID가 제공되지 않았습니다.');
//     }
//   };
  

//   return (
//     <div className="bg-gray-100 flex-1 h-full">
//       <div className="container mx-auto mt-20 w-full flex">
//         <div className="w-2/3 bg-gray-100 flex flex-col p-2">
//           <h1 className="text-xl font-bold mb-4">소모임 정보</h1>

//           <div className="mb-4">
//             {imageUrl ? <DetailImage image={imageUrl} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
//           </div>

//           <h2 className="text-lg font-semibold mb-2">모임 이름</h2>
//           <div className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4">
//             {meetName}
//           </div>

//           <div className="flex space-x-2 mb-4">
//             <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
//               {meetLocation || ''}
//             </div>
//           </div>

//           <h2 className="text-lg font-semibold mb-2">모임 설명</h2>
//           <div className="text-gray-700 bg-gray-200 p-4 rounded-lg w-full mb-4">
//             {meetDescription}
//           </div>

//           <div className="flex space-x-2 mb-4">
//             <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
//               {meetMaximum}
//             </div>
//           </div>

//           <div className="flex flex-wrap space-x-2 gap-2 mb-4">
//             {meetPermissionDTO.canEdit && (
//               <RoundedButton onClick={handleEdit} className="w-1/6">
//                 수정하기
//               </RoundedButton>
//             )}

//             {meetPermissionDTO.canDelete && (
//               <RoundedButton onClick={handleDelete} className="w-1/6 bg-gray-500 hover:bg-gray-600">
//                 삭제하기
//               </RoundedButton>
//             )}

//             {/* 가입신청 버튼 */}
//             <MeetJoin meetId={meetId} onSubmit={handleJoinSubmit} className="w-1/6 bg-blue-500 hover:bg-blue-600" />

//             {/* 회원 조회 버튼 */}
//             <RoundedButton onClick={handleMemberAccept} className="w-1/6 bg-green-500 hover:bg-green-600">
//               회원 조회
//             </RoundedButton>
//             {/* 모임커뮤니티 버튼 */}
//             <RoundedButton onClick={handleMeetComm} className="w-1/6 bg-green-500 hover:bg-green-600">
//               모임 커뮤니티
//             </RoundedButton>
//             {/* 채팅방 신청 버튼 */}
//             {meetRole == "ADMIN" && (
//               <RoundedButton 
//               onClick={handleChatRoom} 
//               disabled={setChatRoomExists} // 이미 채팅방이 존재하면 비활성화
//               className="w-1/6 bg-green-500 hover:bg-green-600">
//                 채팅방 생성
//               </RoundedButton>
//             )}
//             {/* 채팅방 신청 버튼 */}
//             {meetRole === "MEMBER" && (
//               <RoundedButton 
//               onClick={handleEnterChat} 
//               className="w-1/6 bg-green-500 hover:bg-green-600">
//                 채팅방 입장하기
//               </RoundedButton>
//             )}
//           </div>
//         </div>
//         <MeetSideMenu />
//       </div>
//     </div>
//   );
// };

// export default MeetDetail;


// src/pages/meet/MeetDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import DetailImage from '../../components/meet/DetailImage';
// import { getMeetingDetail, deleteMeet, postMeetJoin } from '../../api/meetAPI';
// import MeetSideMenu from '../../components/meet/MeetSideMenu';
// import RoundedButton from '../../components/button/RoundedButton';
// import MeetJoin from '../../components/meet/MeetJoin';
// import { checkChatRoomExistence, createChatRoom,
//          getChatRoomId, checkChatRoomAccess, getRoomIdByMeetId } from '../../api/chatAPI'; // 새로운 API 임포트
// import useAuthStore from '../../stores/useAuthStore';
// import useChatRoomStore from '../../stores/useChatStore';

// const MeetDetail = () => {
//   const { meetId } = useParams();
//   const navigate = useNavigate();
//   const [meeting, setMeeting] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [meetRole, setMeetRole] = useState(null);
//   const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

//   const { user } = useAuthStore(state => state); // user를 가져옴
//   const isAuthenticated = Boolean(user); // user가 있으면 authenticated로 간주

//   // Zustand store에서 상태 가져오기
//   const { roomId, setRoomId, chatRoomExists, setChatRoomExists } = useChatRoomStore();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedMeeting = await getMeetingDetail(meetId);
//         setMeeting(fetchedMeeting);
//         setMeetRole(fetchedMeeting.meetRole); // meetRole을 상태로 저장

//         // 채팅방 존재 여부 확인
//         await checkChatRoom(meetId); // 추가된 함수 호출  
//         setLoading(false);
//       } catch (error) {
//         console.error('모임 상세 정보 가져오기 오류:', error);
//         setLoading(false);
//       }
//     };
//     fetchData(meetId, setMeeting, setMeetRole, setLoading);
//     console.log('Updated roomId:', roomId);
//     console.log('Chat room exists:', chatRoomExists);
//   }, [meetId]); 
//   useEffect(() => {
//     console.log('Updated roomId:', roomId);
//   }, [roomId]);
  
//   useEffect(() => {
//     console.log('Chat room exists:', chatRoomExists);
//   }, [chatRoomExists]);

//   // 채팅방 존재 여부 확인하는 함수
//   const checkChatRoom = async (meetId, roomName) => {
//     try {
//       const token = sessionStorage.getItem('accessToken');
//       console.log(`[DEBUG] Checking chat room existence for meetId: ${meetId}, roomName: ${roomName}`);
  
//       // 1. checkChatRoomExistence 호출
//       const response = await checkChatRoomExistence(meetId, token);
//       console.log(`[DEBUG] checkChatRoomExistence response:`, response);
  
//       if (response.exists && response.roomId) {
//         console.log(`[DEBUG] Chat room exists: Room ID - ${response.roomId}`);
//         setRoomId(response.roomId);
//         setChatRoomExists(true);
//         return; // roomId를 정상적으로 가져온 경우 함수 종료
//       }
  
//       // 2. Fallback: getRoomIdByRoomName 호출
//       console.warn(`[WARN] Chat room does not exist or roomId is undefined. Falling back to getRoomIdByRoomName.`);
//       const fallbackRoomId = await getRoomIdByRoomName(roomName, token);
  
//       if (fallbackRoomId) {
//         console.log(`[DEBUG] Fetched Room ID from fallback: ${fallbackRoomId}`);
//         setRoomId(fallbackRoomId);
//         setChatRoomExists(true);
//       } else {
//         console.error(`[ERROR] Failed to fetch roomId from both APIs.`);
//         setRoomId(null);
//         setChatRoomExists(false);
//       }
//     } catch (error) {
//       console.error(`[ERROR] Error checking chat room existence:`, error);
//       setRoomId(null);
//       setChatRoomExists(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!meeting || !meeting.meetDetailDTO) return <div>모임 정보를 불러올 수 없습니다.</div>;

//   const { meetName, meetDescription, meetMaximum, meetLocation, images } = meeting.meetDetailDTO;
//   const imageUrl = images && images.length > 0 ? images[0] : null;
//   const { meetPermissionDTO } = meeting;

//   const handleEdit = () => {
//     navigate(`/meet/update/${meetId}`);
//   };

//   const handleDelete = async () => {
//     if (window.confirm('정말로 이 모임을 삭제하시겠습니까?')) {
//       try {
//         const response = await deleteMeet(meetId);
//         if (response.status === 200) {
//           alert('모임이 성공적으로 삭제되었습니다.');
//           navigate('/meet/list');
//         } else {
//           alert('모임 삭제에 실패했습니다. 다시 시도해 주세요.');
//         }
//       } catch (error) {
//         console.error('모임 삭제 오류:', error);
//         alert('모임 삭제에 실패했습니다.');
//       }
//     }
//   };

//   const handleJoinSubmit = async () => {
//     try {
//       const response = await postMeetJoin(meetId); 
//       if (response && response.data) {
//         if (response.data.message === '가입 신청이 완료되었습니다.') {
//           alert('가입 신청이 완료되었습니다.');
//         } else {
//           alert(`가입 신청에 실패했습니다. 서버 응답: ${response.data.message || '알 수 없는 오류'}`);
//         }
//       }
//     } catch (error) {
//       console.error('가입 신청 오류:', error);
//       alert('가입 신청에 실패했습니다. 서버에 문제가 있을 수 있습니다.');
//     }
//   };

//   const handleMemberAccept = () => {
//     navigate(`/meets/${meetId}/members`); 
//   };

//   const handleMeetComm = () => {
//     navigate(`/meetBoards/list/${meetId}`);
//   };

//   const handleChatRoom = async () => {
//     const token = sessionStorage.getItem('accessToken');
  
//     if (!meetName || !meetId) {
//       alert("모임 이름 또는 모임 ID가 없습니다.");
//       return;
//     }
  
//     try {
//       const { exists, roomId } = await checkChatRoomExistence(meetId, token);
//       if (exists && roomId) {
//         setChatRoomExists(true);
//         alert('이미 채팅방이 생성되었습니다. 채팅방으로 이동합니다.');
//         navigate(`/chat?roomId=${roomId}`);
//         return;
//       }
  
//       const createData = await createChatRoom(meetId, meetName, token);
//       if (createData.roomId) {
//         alert(`채팅방 생성 완료: ${createData.roomName} (ID: ${createData.roomId})`);
//         setChatRoomExists(true);
//         setRoomId(createData.roomId);
//         navigate(`/chat?roomId=${createData.roomId}`);
//       } else {
//         alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
//       }
//     } catch (error) {
//       console.error('채팅방 관련 오류:', error);
//       alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
//     }
//   };
  

//   const handleChatRoomAccess = async () => {
//     const token = sessionStorage.getItem('accessToken');
//     const currentRoomId = roomId || (await getRoomIdByMeetId(meetId, token)); // roomId가 없으면 Fallback 호출
  
//     if (!user.memberEmail) {
//       alert('사용자 이메일을 찾을 수 없습니다.');
//       return;
//     }
  
//     if (!currentRoomId) {
//       alert('채팅방 정보를 가져올 수 없습니다. 다시 시도해주세요.');
//       return;
//     }
  
//     try {
//       const result = await checkChatRoomAccess(currentRoomId, user.memberEmail, token);
//       if (result.success) {
//         alert('채팅방에 입장할 수 있습니다.');
//         navigate(`/chat?roomId=${currentRoomId}`);
//       } else {
//         alert('채팅방에 입장할 수 없습니다.');
//       }
//     } catch (error) {
//       console.error(`[ERROR] 채팅방 입장 오류:`, error);
//       alert('채팅방 입장에 실패했습니다.');
//     }
//   };
  
  
  

//   return (
//     <div className="bg-gray-100 flex-1 h-full">
//       <div className="container mx-auto mt-20 w-full flex">
//         <div className="w-2/3 bg-gray-100 flex flex-col p-2">
//           <h1 className="text-xl font-bold mb-4">소모임 정보</h1>

//           <div className="mb-4">
//             {imageUrl ? <DetailImage image={imageUrl} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
//           </div>

//           <h2 className="text-lg font-semibold mb-2">모임 이름</h2>
//           <div className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4">
//             {meetName}
//           </div>

//           <div className="flex space-x-2 mb-4">
//             <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
//               {meetLocation || ''}
//             </div>
//           </div>

//           <h2 className="text-lg font-semibold mb-2">모임 설명</h2>
//           <div className="text-gray-700 bg-gray-200 p-4 rounded-lg w-full mb-4">
//             {meetDescription}
//           </div>

//           <div className="flex space-x-2 mb-4">
//             <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
//               {meetMaximum}
//             </div>
//           </div>

//           <div className="flex flex-wrap space-x-2 gap-2 mb-4">
//             {meetPermissionDTO.canEdit && (
//               <RoundedButton onClick={handleEdit} className="w-1/6">
//                 수정하기
//               </RoundedButton>
//             )}

//             {meetPermissionDTO.canDelete && (
//               <RoundedButton onClick={handleDelete} className="w-1/6 bg-gray-500 hover:bg-gray-600">
//                 삭제하기
//               </RoundedButton>
//             )}

//             <MeetJoin meetId={meetId} onSubmit={handleJoinSubmit} className="w-1/6 bg-blue-500 hover:bg-blue-600" />
//             <RoundedButton onClick={handleMemberAccept} className="w-1/6 bg-green-500 hover:bg-green-600">
//               회원 조회
//             </RoundedButton>
//             <RoundedButton onClick={handleMeetComm} className="w-1/6 bg-green-500 hover:bg-green-600">
//               모임 커뮤니티
//             </RoundedButton>

//             {meetRole === 'ADMIN' && (
//               <RoundedButton onClick={handleChatRoom} disabled={chatRoomExists} className="w-1/6 bg-green-500 hover:bg-green-600">
//                 채팅방 생성
//               </RoundedButton>
//             )}
//             {meetRole === 'MEMBER' && (
//               <RoundedButton onClick={handleChatRoomAccess} className="w-1/6 bg-green-500 hover:bg-green-600">
//                 채팅방 입장하기
//               </RoundedButton>
//             )}
//           </div>
//         </div>
//         <MeetSideMenu />
//       </div>
//     </div>
//   );
// };

// export default MeetDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DetailImage from '../../components/meet/DetailImage';
import { deleteMeet, postMeetJoin } from '../../api/meetAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';
import RoundedButton from '../../components/button/RoundedButton';
import MeetJoin from '../../components/meet/MeetJoin';
import useAuthStore from '../../stores/useAuthStore';
import useChatStore from '../../stores/useChatStore';
import { checkChatRoom } from '../../api/chatAPI';

const MeetDetail = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const roomIdFromUrl = urlParams.get('roomId'); // URL에서 roomId 가져오기

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetRole, setMeetRole] = useState(null);

  const { user } = useAuthStore((state) => state);
  const { fetchData, roomId: roomIdFromStore, setRoomId, chatRoomExists } = useChatStore();

  useEffect(() => {
    fetchData(meetId, setMeeting, setMeetRole, setLoading);
  }, [meetId, fetchData]);

  useEffect(() => {
    console.log('MeetDetail initialized:', {
      meetId,
      roomIdFromUrl,
      roomIdFromStore,
    });
  }, [meetId, roomIdFromUrl, roomIdFromStore]);

  const handleEnterChat = async () => {
    let roomId = roomIdFromUrl || roomIdFromStore;

    if (!roomId) {
      try {
        const roomName = meeting?.meetDetailDTO?.meetName;
        if (!roomName) throw new Error('Room name is unavailable.');

        const fetchedRoomId = await checkChatRoom(meetId, roomName);
        if (fetchedRoomId) {
          setRoomId(fetchedRoomId);
          roomId = fetchedRoomId;
        } else {
          alert('채팅방 정보를 가져올 수 없습니다.');
          return;
        }
      } catch (error) {
        console.error('채팅방 ID 가져오기 오류:', error);
        alert('채팅방 정보를 가져오는 중 오류가 발생했습니다.');
        return;
      }
    }

    console.log('Final roomId to navigate:', roomId);
    navigate(`/chat?roomId=${roomId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!meeting || !meeting.meetDetailDTO) return <div>모임 정보를 불러올 수 없습니다.</div>;

  const { meetName, meetDescription, meetMaximum, meetLocation, images } = meeting.meetDetailDTO;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const { meetPermissionDTO } = meeting;

  const handleEdit = () => {
    navigate(`/meet/update/${meetId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 모임을 삭제하시겠습니까?')) {
      try {
        const response = await deleteMeet(meetId);
        if (response.status === 200) {
          alert('모임이 성공적으로 삭제되었습니다.');
          navigate('/meet/list');
        } else {
          alert('모임 삭제에 실패했습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error('모임 삭제 오류:', error);
        alert('모임 삭제에 실패했습니다.');
      }
    }
  };

  const handleJoinSubmit = async () => {
    try {
      const response = await postMeetJoin(meetId);
      if (response && response.data) {
        if (response.data.message === '가입 신청이 완료되었습니다.') {
          alert('가입 신청이 완료되었습니다.');
        } else {
          alert(`가입 신청에 실패했습니다. 서버 응답: ${response.data.message || '알 수 없는 오류'}`);
        }
      }
    } catch (error) {
      console.error('가입 신청 오류:', error);
      alert('가입 신청에 실패했습니다.');
    }
  };

  const handleMemberAccept = () => {
    navigate(`/meets/${meetId}/members`);
  };

  const handleMeetComm = () => {
    navigate(`/meetBoards/list/${meetId}`);
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보</h1>

          <div className="mb-4">
            {imageUrl ? <DetailImage image={imageUrl} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
          </div>

          <h2 className="text-lg font-semibold mb-2">모임 이름</h2>
          <div className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4">
            {meetName}
          </div>

          <div className="flex space-x-2 mb-4">
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              {meetLocation || ''}
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">모임 설명</h2>
          <div className="text-gray-700 bg-gray-200 p-4 rounded-lg w-full mb-4">
            {meetDescription}
          </div>

          <div className="flex space-x-2 mb-4">
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              {meetMaximum}
            </div>
          </div>

          <div className="flex flex-wrap space-x-2 gap-2 mb-4">
            {meetPermissionDTO.canEdit && (
              <RoundedButton onClick={handleEdit} className="w-1/6">
                수정하기
              </RoundedButton>
            )}

            {meetPermissionDTO.canDelete && (
              <RoundedButton onClick={handleDelete} className="w-1/6 bg-gray-500 hover:bg-gray-600">
                삭제하기
              </RoundedButton>
            )}

            <MeetJoin meetId={meetId} onSubmit={handleJoinSubmit} className="w-1/6 bg-blue-500 hover:bg-blue-600" />
            <RoundedButton onClick={handleMemberAccept} className="w-1/6 bg-green-500 hover:bg-green-600">
              회원 조회
            </RoundedButton>
            <RoundedButton onClick={handleMeetComm} className="w-1/6 bg-green-500 hover:bg-green-600">
              모임 커뮤니티
            </RoundedButton>

            {meetRole === 'ADMIN' && (
              <RoundedButton onClick={handleEnterChat} disabled={chatRoomExists} className="w-1/6 bg-green-500 hover:bg-green-600">
                채팅방 생성
              </RoundedButton>
            )}
            {meetRole === 'MEMBER' && (
              <RoundedButton onClick={handleEnterChat} className="w-1/6 bg-green-500 hover:bg-green-600">
                채팅방 입장하기
              </RoundedButton>
            )}
          </div>
        </div>
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetDetail;
