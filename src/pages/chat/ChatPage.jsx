import MeetChatList from "../../components/meet/MeetChatList";
import MeetChatRoom from "../../components/meet/MeetChatRoom";  

const ChatPage = () => {
    return (
        <div className="flex h-screen w-screen"> {/* 전체 화면을 차지하도록 설정 */}
            <MeetChatList />
            <MeetChatRoom />
        </div>
    );
};
export default ChatPage;