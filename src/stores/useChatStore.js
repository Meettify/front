import { create } from 'zustand';
import { getMeetingDetail } from '../api/meetAPI';
import { checkChatRoom } from '../api/chatAPI';

const useChatStore = create((set) => ({
  roomId: null,
  chatRoomExists: false,
  setRoomId: (roomId) => set({ roomId }),
  setChatRoomExists: (exists) => set({ chatRoomExists: exists }),

  fetchData: async (meetId, setMeeting, setMeetRole, setLoading) => {
    try {
      const { setRoomId, setChatRoomExists } = useChatStore.getState();

      const fetchedMeeting = await getMeetingDetail(meetId);
      setMeeting(fetchedMeeting);
      setMeetRole(fetchedMeeting.meetRole);

      const roomName = fetchedMeeting.meetDetailDTO.meetName;
      console.log(`[DEBUG] Room Name: ${roomName}`);

      const roomId = await checkChatRoom(meetId, roomName);
      if (roomId) {
        setRoomId(roomId);
        setChatRoomExists(true);
      } else {
        setRoomId(null);
        setChatRoomExists(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ roomId: null, chatRoomExists: false });
      setLoading(false);
    }
  },
}));

export default useChatStore;



// const useChatRoomStore = create((set) => ({
//   roomId: null, // 초기 roomId 값은 null
//   setRoomId: (id) => set({ roomId: id }), // roomId 상태를 설정하는 함수
//   resetRoomId: () => set({ roomId: null }), // roomId를 초기화하는 함수
//   chatRoomExists: false, // 채팅방 존재 여부
//   setChatRoomExists: (exists) => set({ chatRoomExists: exists }), // 채팅방 존재 여부 설정 함수
// }));
