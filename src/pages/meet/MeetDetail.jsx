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
import { getMembersList } from "../../api/meetAPI"; // 추가
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css"; // 기본 스타일
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    const fetchRole = async () => {
      const userEmail = localStorage.getItem("memberEmail"); // 👉 useEffect 안으로 이동
      if (!userEmail) {
        console.warn("로그인된 사용자 이메일이 없습니다.");
        setMeetRole("OUTSIDER");
        return;
      }

      try {
        const members = await getMembersList(meetId);
        console.log("회원 응답 전체:", members);

        const me = members.find((m) => {
          console.log("접속중인 유저 이메일 : ", userEmail);
          console.log("가져온 유저 이메일 : ", m.email);
          return m.email === userEmail;
        });
        console.log("chatRoomExists:", chatRoomExists); // ❓ true 여야 버튼이 뜸
        console.log("가져온 데이터 : ", me);
        console.log("가져온 데이터 중 권한 확인 : ", me.meetRole);

        if (me) {
          setMeetRole(me.meetRole); // MEMBER, ADMIN, WAITING 등
        } else {
          setMeetRole("OUTSIDER");
        }
      } catch (err) {
        console.warn("회원 목록 조회 실패", err);
        setMeetRole("OUTSIDER");
      }
    };
    fetchRole();
  }, [meetId]);

  useEffect(() => {
    console.log("변경된 역할:", meetRole); // 값이 바뀔 때 확인
  }, [meetRole]);

  useEffect(() => {
    fetchData(meetId, setMeeting, setLoading);
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
    <div className="bg-gray-100 min-h-screen pt-24 pb-32 px-4 flex justify-center">
      <div className="w-full max-w-7xl flex gap-8 items-start">
        {/* 왼쪽 콘텐츠 */}
        <div className="flex-1">
          {/* 카드 전체 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between min-h-[calc(100vh-200px)]">
            {/* 수정/삭제 버튼 */}
            <div className="flex justify-end gap-2 mb-6">
              {meetPermissionDTO.canEdit && (
                <RoundedButton
                  onClick={() => navigate(`/meet/update/${meetId}`)}
                >
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
                          alert(
                            "모임 삭제에 실패했습니다. 다시 시도해 주세요."
                          );
                        }
                      } catch (error) {
                        console.error("모임 삭제 오류:", error);
                        alert("모임 삭제에 실패했습니다.");
                      }
                    }
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  삭제하기
                </RoundedButton>
              )}
            </div>

            {/* 이미지 슬라이더 */}
            {images && images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full max-w-4xl mx-auto rounded-lg"
              >
                {images.map((imgUrl, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={imgUrl}
                      alt={`모임 이미지 ${idx + 1}`}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                이미지 없음
              </div>
            )}

            {/* 제목/위치 */}
            <div className="text-center mt-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                {meetName}
              </h2>
              <p className="text-gray-600 text-base">📍 {meetLocation}</p>
            </div>

            {/* 소개 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner mt-0 min-h-[350px] max-h-[500px] overflow-y-auto">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                모임 소개
              </h3>
              <p className="text-gray-700 text-base whitespace-pre-line">
                {meetDescription}
              </p>
            </div>

            {/* 최대 인원 */}
            <p className="text-center text-base text-gray-600 mt-6">
              👥 최대 인원: {meetMaximum}
            </p>

            {/* 버튼들 */}
            <div className="flex justify-center flex-wrap gap-4 mt-6">
              {meetRole !== null && !["ADMIN", "MEMBER"].includes(meetRole) && (
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
              )}

              {meetRole === "ADMIN" && (
                <RoundedButton
                  onClick={() => navigate(`/meets/${meetId}/members`)}
                  className="bg-sky-500 hover:bg-sky-600 text-white"
                >
                  회원 조회
                </RoundedButton>
              )}

              <RoundedButton
                onClick={() => navigate(`/meetBoards/list/${meetId}`)}
                className="bg-teal-400 hover:bg-teal-500 text-white"
              >
                모임 커뮤니티
              </RoundedButton>

              {meetRole !== null &&
                (chatRoomExists && ["ADMIN", "MEMBER"].includes(meetRole) ? (
                  <RoundedButton
                    onClick={handleEnterChat}
                    className="bg-indigo-400 hover:bg-indigo-500 text-white"
                  >
                    채팅방 입장
                  </RoundedButton>
                ) : (
                  meetPermissionDTO?.canEdit && (
                    <RoundedButton
                      onClick={handleEnterChat}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                      채팅방 생성
                    </RoundedButton>
                  )
                ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드 메뉴 */}
        <div className="w-1/4 hidden xl:block">
          <div className="sticky top-28">
            <MeetSideMenu />
          </div>
        </div>
      </div>

      {/* 채팅방 생성 모달 */}
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
