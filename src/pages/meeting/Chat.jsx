import ChatList from "../../components/chatting/ChatList";
import ChatRoom from "../../components/chatting/ChatRoom";
const Chat = () => {
    return (
        <div className="flex h-screen w-screen"> {/* 전체 화면을 차지하도록 설정 */}
            <div className="flex-none w-1/4"> {/* ChatList: 1/4 */}
                <ChatList />
            </div>
            <div className="flex-none w-3/4"> {/* ChatRoom: 3/4 */}
                <ChatRoom />
            </div>
        </div>
    );
}
export default Chat;