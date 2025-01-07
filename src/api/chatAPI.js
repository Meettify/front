import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 채팅방 존재 여부 확인
export const checkChatRoomExistence = async (meetId, token) => {
    const [roomId, setRoomId] = useState(null); 
    const checkResponse = await fetch(`${BASE_URL}/chat/${meetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!checkResponse.ok) {
      throw new Error('채팅방 확인에 실패했습니다.');
    }
  
    const checkData = await checkResponse.json();
    
    // 채팅방이 존재하는 경우
    if (checkData === true) {  // checkData가 boolean 값 true일 경우 채팅방 존재
      // 채팅방 ID도 받아와야 하므로 이를 처리하는 로직 추가
      const roomId = await getChatRoomId(meetId, token);  // roomId 받아오기
      setRoomId(roomId);  // roomId 상태 업데이트
      alert('이미 채팅방이 생성되었습니다.');
      //navigate(`/chat/room/${roomId}`);  // 해당 채팅방으로 이동
      return;
    }
}

// 채팅방 ID 조회
export const getChatRoomId = async (meetId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/room/${meetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('채팅방 조회에 실패했습니다.');
    }

    return await response.json(); // roomId 반환
  } catch (error) {
    console.error('채팅방 ID 조회 오류:', error);
    throw error;
  }
}

// 채팅방 생성
export const createChatRoom = await fetch(`${BASE_URL}/chat/room?roomName=${meetName}&meetId=${meetId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (createResponse.ok) {
    const createData = await createResponse.json();
    console.log('서버 응답 데이터:', createData); // 서버 응답 데이터 확인

    if (createData.roomId && createData.roomName) {
      alert(`채팅방 생성 완료: ${createData.roomName} (ID: ${createData.roomId})`);
      setChatRoomExists(true); // 채팅방 생성 완료 후 상태 업데이트
      navigate(`/chat?roomId=${createData.roomId}`);  // 생성된 채팅방으로 이동
    } else {
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.');
    }
  } else {
    throw new Error('채팅방 생성에 실패했습니다.');
}

