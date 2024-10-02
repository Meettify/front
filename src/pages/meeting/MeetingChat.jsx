import ChatList from "../../components/chatting/ChatList";
import ChatRoom from "../../components/chatting/ChatRoom";
const MeetingChat = () => {
    return (
        <div className="flex h-screen w-screen"> {/* 전체 화면을 차지하도록 설정 */}
            <ChatList />
            <ChatRoom />
        </div>
    );
}
export default MeetingChat;