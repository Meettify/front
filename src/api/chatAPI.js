const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;


// 채팅방 존재 여부 확인
export const checkChatRoomExistence = async (meetId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/${meetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('채팅방 확인에 실패했습니다.');
    }

    const data = await response.json();

    if (data === true) {
      // 채팅방이 존재하는 경우, roomId 조회
      const roomId = await getChatRoomId(meetId, token);
      console.log('Fetched roomId:', roomId);
      return { exists: true, roomId };
    }

    return { exists: false };
  } catch (error) {
    console.error('채팅방 존재 여부 확인 오류:', error);
    return { exists: false };
  }
};

// 채팅방 존재 여부 확인 및 ID 반환
export const checkChatRoom = async (meetId, roomName) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/chat/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('채팅방 리스트를 가져오는데 실패했습니다.');
    }

    const rooms = await response.json();
    console.log("[DEBUG] Fetched rooms:", rooms);

    const targetRoom = rooms.find((room) => room.roomName === roomName);
    if (!targetRoom) {
      console.warn(`[WARN] Room with name ${roomName} not found.`);
      return null;
    }

    console.log("[DEBUG] Found roomId:", targetRoom.roomId);
    return targetRoom.roomId;
  } catch (error) {
    console.error("[ERROR] Error checking chat room:", error);
    throw error;
  }
};

// 채팅방 리스트에서 특정 meetId에 해당하는 roomId 가져오기
export const getRoomIdByMeetId = async (meetId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('채팅방 리스트를 가져오는데 실패했습니다.');
    }

    const rooms = await response.json();
    console.log("Fetched rooms:", rooms); // 디버깅용 로그 추가

    const targetRoom = rooms.find(rooms => String(rooms.meetId) === String(meetId));
    if (!targetRoom) {
      console.error(`해당 meetId (${meetId})에 대한 채팅방이 없습니다.`);
      return null;
    }
    console.log("Found roomId:", targetRoom.roomId);
    return targetRoom.roomId;
  } catch (error) {
    console.error('채팅방 ID 조회 오류:', error);
    throw error;
  }
};

export const getRoomIdByRoomName = async (roomName, token) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('채팅방 리스트를 가져오는데 실패했습니다.');
    }

    const rooms = await response.json();
    console.log("[DEBUG] Fetched rooms:", rooms);

    // roomName을 기준으로 일치하는 roomId 찾기
    const targetRoom = rooms.find(room => room.roomName === roomName);
    if (!targetRoom) {
      console.warn(`[WARN] 해당 roomName (${roomName})에 대한 채팅방이 없습니다.`);
      return null;
    }

    console.log("[DEBUG] Found roomId:", targetRoom.roomId);
    return targetRoom.roomId;
  } catch (error) {
    console.error("[ERROR] 채팅방 ID 조회 오류:", error);
    throw error;
  }
};

// 채팅방 ID 조회
export const getChatRoomId = async (meetId, token) => {
  try {
    console.log("Fetching chat room ID with URL:", `${BASE_URL}/chat/${meetId}`);
    console.log("Using token:", token);

    const response = await fetch(`${BASE_URL}/chat/${meetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error:', errorText); // 서버에서 반환된 오류 메시지 확인
      throw new Error('채팅방 조회에 실패했습니다.');
    }

    const data = await response.json();
    console.log('Fetched roomId from getChatRoomId:', data.roomId); // 디버깅 로그 추가
    return data.roomId; // roomId 반환
  } catch (error) {
    console.error('채팅방 ID 조회 오류:', error);
    throw error;
  }
};



// 채팅방 생성
export const createChatRoom = async (meetId, meetName, token) => {
  try {
    const createResponse = await fetch(`${BASE_URL}/chat/room?roomName=${encodeURIComponent(meetName)}&meetId=${meetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomName: meetName,
        meetId: meetId,
      }),
    });

    if (!createResponse.ok) {
      throw new Error('채팅방 생성에 실패했습니다.');
    }

    const createData = await createResponse.json();
    return createData; // { roomId, roomName }
  } catch (error) {
    console.error('채팅방 생성 오류:', error);
    throw error;
  }
};

// 채팅방 입장 시 임시 번호 체크 및 입장 여부 확인
export const checkChatRoomAccess = async (roomId, accessEmail, token) => {
  try {
    const response = await fetch(`${BASE_URL}/chat/${roomId}/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        accessEmail: accessEmail,  // 이메일을 body에 포함 
        // 
        }),
    });

    if (!response.ok) {
      throw new Error('채팅방 접근 확인에 실패했습니다.');
    }

    const data = await response.json();
    return data;  // 성공시 반환값을 반환
  } catch (error) {
    console.error('채팅방 입장 오류:', error);
    throw error;
  }
};
