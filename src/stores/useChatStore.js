import { create } from 'zustand';
import { getMeetingDetail } from '../api/meetAPI';
import { checkChatRoom } from '../api/chatAPI';

const useChatStore = create((set) => ({
  roomId: null,
  chatRoomExists: false,
  setRoomId: (roomId) => set({ roomId }),
  setChatRoomExists: (exists) => set({ chatRoomExists: exists }),

  fetchData: async (meetId, setMeeting, setLoading) => {
    try {
      const { setRoomId, setChatRoomExists } = useChatStore.getState();

      const fetchedMeeting = await getMeetingDetail(meetId);
      setMeeting(fetchedMeeting);


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

