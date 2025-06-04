// 📁 MeetDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DetailImage from "../../components/meet/DetailImage";
import { deleteMeet, postMeetJoin, getMembersList } from "../../api/meetAPI";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import RoundedButton from "../../components/button/RoundedButton";
import MeetJoin from "../../components/meet/MeetJoin";
import useAuthStore from "../../stores/useAuthStore";
import useChatStore from "../../stores/useChatStore";
import { checkChatRoom } from "../../api/chatAPI";
import CreateChatRoomModal from "../../components/chat/CreateChatRoomModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
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

  const categoryMap = {
    SPORTS: "스포츠",
    TRAVEL: "여행",
    MUSIC: "음악",
    ART: "예술",
    READING: "독서",
    HEALTH: "건강",
    FASHION_BEAUTY: "패션/뷰티",
    PET_LOVERS: "반려동물",
  };

  const { user } = useAuthStore();
  const {
    fetchData,
    roomId: roomIdFromStore,
    setRoomId,
    chatRoomExists,
    meetCategory,
  } = useChatStore();

  console.log("카테고리 : ", meetCategory);
  useEffect(() => {
    const fetchRole = async () => {
      const userEmail = localStorage.getItem("memberEmail");
      if (!userEmail) {
        setMeetRole("OUTSIDER");
        return;
      }
      try {
        const members = await getMembersList(meetId);
        const me = members.find((m) => m.email === userEmail);
        setMeetRole(me ? me.meetRole : "OUTSIDER");
      } catch (err) {
        setMeetRole("OUTSIDER");
      }
    };
    fetchRole();
  }, [meetId]);

  useEffect(() => {
    fetchData(meetId, setMeeting, setLoading);
  }, [meetId, fetchData]);

  const handleEnterChat = async () => {
    const roomName = meeting?.meetDetailDTO?.meetName;
    const { meetPermissionDTO } = meeting;
    try {
      const fetchedRoomId = await checkChatRoom(meetId, roomName);
      if (fetchedRoomId) {
        setRoomId(fetchedRoomId);
        navigate(`/chat?roomId=${fetchedRoomId}`);
      } else if (meetPermissionDTO?.canEdit) {
        setIsModalOpen(true);
      } else {
        alert("채팅방이 존재하지 않습니다. 관리자에게 문의하세요.");
      }
    } catch {
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
      const data = await response.json();
      setRoomId(data.roomId);
      navigate(`/chat?roomId=${data.roomId}`);
    } catch {
      alert("채팅방 생성에 실패했습니다.");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!meeting?.meetDetailDTO)
    return <div>모임 정보를 불러올 수 없습니다.</div>;

  const { meetName, meetDescription, meetMaximum, meetLocation, images } =
    meeting.meetDetailDTO;
  const { meetPermissionDTO } = meeting;

  return (
    <div className="bg-white pt-24 pb-32 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="flex justify-end gap-3 mb-4">
              <RoundedButton
                onClick={() => navigate(`/meet/list?category=${meetCategory}`)}
                className="bg-gray-200 hover:bg-gray-300"
              >
                목록으로
              </RoundedButton>
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
                    if (confirm("정말로 이 모임을 삭제하시겠습니까?")) {
                      const res = await deleteMeet(meetId);
                      if (res.status === 200) navigate("/meet/list");
                    }
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  삭제하기
                </RoundedButton>
              )}
            </div>

            {images?.length ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="rounded-xl"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="h-80 bg-gray-100 flex justify-center items-center rounded-xl text-gray-500">
                이미지 없음
              </div>
            )}

            <div className="text-center mt-6">
              <h2 className="text-3xl font-bold text-gray-800">{meetName}</h2>
              <p className="text-gray-600 mt-1">📍 {meetLocation}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  모임 소개
                </h3>
                <div className="pr-2 max-h-[300px] overflow-y-auto space-y-2 text-left">
                  {meetDescription.split("\n").map((line, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-[1.8] break-words text-base"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="min-w-[220px] max-w-[260px] bg-indigo-50 p-5 rounded-xl shadow text-sm text-gray-700 self-start space-y-2">
                <div>👥 최대 인원: {meetMaximum}명</div>
                <div>
                  🏷 카테고리:{" "}
                  <span className="italic text-gray-800 font-semibold">
                    {categoryMap[meetCategory] || "미지정"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4 mt-8">
              {meetRole && !["ADMIN", "MEMBER"].includes(meetRole) && (
                <MeetJoin
                  meetId={meetId}
                  onSubmit={async () => await postMeetJoin(meetId)}
                />
              )}
              {meetRole === "ADMIN" && (
                <RoundedButton
                  onClick={() => navigate(`/meets/${meetId}/members`)}
                  className="bg-sky-500 text-white"
                >
                  회원 조회
                </RoundedButton>
              )}
              <RoundedButton
                onClick={() =>
                  navigate(`/meetBoards/list/${meetId}`, {
                    state: { meetName },
                  })
                }
                className="bg-teal-500 text-white"
              >
                모임 커뮤니티
              </RoundedButton>
              {meetRole &&
                chatRoomExists &&
                ["ADMIN", "MEMBER"].includes(meetRole) && (
                  <RoundedButton
                    onClick={handleEnterChat}
                    className="bg-indigo-500 text-white"
                  >
                    채팅방 입장
                  </RoundedButton>
                )}
              {meetPermissionDTO?.canEdit && !chatRoomExists && (
                <RoundedButton
                  onClick={handleEnterChat}
                  className="bg-cyan-500 text-white"
                >
                  채팅방 생성
                </RoundedButton>
              )}
            </div>
          </div>
        </div>

        <aside className="sticky top-28">
          <MeetSideMenu />
        </aside>
      </div>

      <CreateChatRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateRoom}
        defaultName={meetName}
      />
    </div>
  );
};

export default MeetDetail;
