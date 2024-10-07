import { useEffect } from "react";
import MeetChatList from "../../components/meet/MeetChatList";
import MeetChatRoom from "../../components/meet/MeetChatRoom";  

const ChatPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex h-screen w-screen px-10 py-10"> {/* 여백 조정 */}
            <MeetChatList />
            <MeetChatRoom />
        </div>
    );
};

export default ChatPage;