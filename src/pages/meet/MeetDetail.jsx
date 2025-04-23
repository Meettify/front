import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DetailImage from "../../components/meet/DetailImage";
import { deleteMeet, postMeetJoin } from "../../api/meetAPI";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import RoundedButton from "../../components/button/RoundedButton";
import MeetJoin from "../../components/meet/MeetJoin";
import useAuthStore from "../../stores/useAuthStore";
import useChatStore from "../../stores/useChatStore";
import { checkChatRoom } from "../../api/chatAPI";
import CreateChatRoomModal from "../../components/chat/CreateChatRoomModal";

const MeetDetail = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const roomIdFromUrl = urlParams.get("roomId");

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetRole, setMeetRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuthStore((state) => state);
  const {
    fetchData,
    roomId: roomIdFromStore,
    setRoomId,
    chatRoomExists,
  } = useChatStore();

  useEffect(() => {
    fetchData(meetId, setMeeting, setMeetRole, setLoading);
  }, [meetId, fetchData]);

  const handleEnterChat = async () => {
    let roomId = roomIdFromUrl || roomIdFromStore;
    const roomName = meeting?.meetDetailDTO?.meetName;
    const { meetPermissionDTO } = meeting;

    if (!roomName) {
      alert("모임 이름이 없습니다. 채팅방을 생성할 수 없습니다.");
      return;
    }

    try {
      const fetchedRoomId = await checkChatRoom(meetId, roomName);
      if (fetchedRoomId) {
        setRoomId(fetchedRoomId);
        navigate(`/chat?roomId=${fetchedRoomId}`);
        return;
      }

      if (meetPermissionDTO?.canEdit) {
        setIsModalOpen(true);
      } else {
        alert("채팅방이 존재하지 않습니다. 관리자에게 문의하세요.");
      }
    } catch (error) {
      console.error("채팅방 처리 중 오류:", error);
      alert("채팅방 처리 중 오류가 발생했습니다.");
    }
  };

  const handleCreateRoom = async (roomName) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/chat/room?roomName=${encodeURIComponent(roomName)}&meetId=${meetId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("채팅방 생성 실패");

      const data = await response.json();
      if (!data.roomId) throw new Error("roomId 누락됨");

      setRoomId(data.roomId);
      navigate(`/chat?roomId=${data.roomId}`);
    } catch (error) {
      console.error("채팅방 생성 오류:", error);
      alert("채팅방 생성에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meeting || !meeting.meetDetailDTO)
    return <div>모임 정보를 불러올 수 없습니다.</div>;

  const { meetName, meetDescription, meetMaximum, meetLocation, images } =
    meeting.meetDetailDTO;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const { meetPermissionDTO } = meeting;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-20 w-full max-w-7xl px-4 flex gap-6 items-start pb-16">
        <div className="flex-1">
          <div className="flex justify-end mb-4 gap-2">
            {meetPermissionDTO.canEdit && (
              <RoundedButton onClick={() => navigate(`/meet/update/${meetId}`)}>
                수정하기
              </RoundedButton>
            )}
            {meetPermissionDTO.canDelete && (
              <RoundedButton
                onClick={async () => {
                  if (window.confirm("정말로 이 모임을 삭제하시겠습니까?")) {
                    try {
                      const response = await deleteMeet(meetId);
                      if (response.status === 200) {
                        alert("모임이 성공적으로 삭제되었습니다.");
                        navigate("/meet/list");
                      } else {
                        alert("모임 삭제에 실패했습니다. 다시 시도해 주세요.");
                      }
                    } catch (error) {
                      console.error("모임 삭제 오류:", error);
                      alert("모임 삭제에 실패했습니다.");
                    }
                  }
                }}
                className="bg-gray-500 hover:bg-gray-600"
              >
                삭제하기
              </RoundedButton>
            )}
          </div>

          <div className="mb-6">
            {imageUrl ? (
              <DetailImage image={imageUrl} />
            ) : (
              <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                이미지 없음
              </div>
            )}
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{meetName}</h2>
            <p className="text-sm text-gray-600">📍 {meetLocation}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-2">모임 소개</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {meetDescription}
            </p>
          </div>

          <div className="text-center text-sm text-gray-600 mb-6">
            👥 최대 인원: {meetMaximum}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <MeetJoin
              meetId={meetId}
              onSubmit={async () => {
                try {
                  const response = await postMeetJoin(meetId);
                  alert(response?.data?.message || "가입 요청 완료");
                } catch (error) {
                  console.error("가입 신청 오류:", error);
                  alert("가입 신청에 실패했습니다.");
                }
              }}
              className="bg-blue-500 hover:bg-blue-600"
            />

            {meetRole === "ADMIN" && (
              <RoundedButton
                onClick={() => navigate(`/meets/${meetId}/members`)}
                className="bg-green-500 hover:bg-green-600"
              >
                회원 조회
              </RoundedButton>
            )}

            <RoundedButton
              onClick={() => navigate(`/meetBoards/list/${meetId}`)}
              className="bg-green-500 hover:bg-green-600"
            >
              모임 커뮤니티
            </RoundedButton>

            {!chatRoomExists && meetPermissionDTO.canEdit && (
              <RoundedButton
                onClick={handleEnterChat}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                채팅방 생성
              </RoundedButton>
            )}

            {chatRoomExists &&
              (meetRole === "ADMIN" || meetRole === "MEMBER") && (
                <RoundedButton
                  onClick={handleEnterChat}
                  className="bg-green-500 hover:bg-green-600"
                >
                  채팅방 입장
                </RoundedButton>
              )}
          </div>
        </div>
        <MeetSideMenu />
      </div>

      <CreateChatRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateRoom}
        defaultName={meeting?.meetDetailDTO?.meetName}
      />
    </div>
  );
};

export default MeetDetail;
