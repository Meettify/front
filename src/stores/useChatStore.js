import { create } from 'zustand';
import { getMeetingDetail } from '../api/meetAPI';
import { checkChatRoom } from '../api/chatAPI';

const useChatStore = create((set) => ({
  roomId: null,
  chatRoomExists: false,
  setRoomId: (roomId) => set({ roomId }),
  setChatRoomExists: (exists) => set({ chatRoomExists: exists }),
  setMeetCategory: (category) => set({ meetCategory: category }), // ✅ setter 추가

  meetCategory: null,

  fetchData: async (meetId, setMeeting, setLoading) => {
    try {
      const { setRoomId, setChatRoomExists, setMeetCategory } = useChatStore.getState();

      const fetchedMeeting = await getMeetingDetail(meetId);
      setMeeting(fetchedMeeting);

            // ✅ 카테고리 상태 저장
      const category = fetchedMeeting?.meetDetailDTO?.category || null;
      setMeetCategory(category);

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

