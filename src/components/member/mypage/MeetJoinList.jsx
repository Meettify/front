import React, { useCallback, useRef } from "react";
import useNavigation from "../../../hooks/useNavigation";
import { useMyPage } from "../../../hooks/useMypage";
import { putLeaveMeet, putCancelMeet } from "../../../api/memberAPI";

const MeetJoinList = () => {
  const { goToMeetDetail } = useNavigation();
  const { meetJoinList, setMeetJoinPage, hasNextMeetPage } = useMyPage();
  const observer = useRef();

  const lastMeetElementRef = useCallback(
    (node) => {
      if (!hasNextMeetPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setMeetJoinPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextMeetPage]
  );

  const handleDetailClick = (category, meetId, isActive) => {
    if (isActive) {
      goToMeetDetail(meetId, category);
    }
  };

  const handleWithdrawClick = async (meetId, meetMemberId, label) => {
    const confirmation = window.confirm(`정말로 ${label} 하시겠습니까?`);
    if (confirmation) {
      let result = null;
      try {
        if (label === "탈퇴") {
          result = await putLeaveMeet(meetId, meetMemberId);
        } else {
          result = await putCancelMeet();
        }
      } catch (error) {
        console.log(`모임 ${label} 오류 : `, error);
      }

      if (result.status === 200) {
        alert(`${label} 되었습니다.`);
      } else {
        alert(`${label}에 실패하였습니다.`);
      }
    }
  };

  const getRoleInfo = (role, meetId, meetMemberId) => {
    switch (role) {
      case "ADMIN":
        return { label: "모임장", bgColor: "bg-blue-500" };
      case "MEMBER":
        return {
          label: "가입됨",
          bgColor: "bg-green-500",
          button: {
            label: "모임탈퇴",
            onClick: () => handleWithdrawClick(meetId, meetMemberId, "탈퇴"),
          },
        };
      case "WAITING":
        return {
          label: "승인 대기중",
          bgColor: "bg-gray-500",
          button: {
            label: "가입취소",
            onClick: () => handleWithdrawClick(meetId, meetMemberId, "취소"),
          },
        };
      case "DORMANT":
        return { label: "탈퇴됨", bgColor: "bg-gray-300", isActive: false };
      case "EXPEL":
        return { label: "추방됨", bgColor: "bg-red-500", isActive: false };
      default:
        return { label: "알 수 없음", bgColor: "bg-gray-500" };
    }
  };

  return (
    <div className="flex flex-col space-y-4 ml-8">
      {meetJoinList.length === 0 ? (
        <div className="text-center text-gray-600">가입된 모임이 없습니다.</div>
      ) : (
        meetJoinList.map((meet, index) => {
          const roleInfo = getRoleInfo(
            meet.meetRole,
            meet.meetId,
            meet.meetMemberId
          );
          const isActive = roleInfo.isActive !== false;
          const isLastItem = index === meetJoinList.length - 1;

          return (
            <div
              key={meet.meetId}
              ref={isLastItem ? lastMeetElementRef : null}
              className={`flex items-start border p-4 rounded-lg w-[900px] h-[158px] \
                ${
                  meet.meetRole === "DORMANT" || meet.meetRole === "EXPEL"
                    ? "bg-gray-400"
                    : "bg-white"
                } \
                hover:shadow-inner hover:border-gray-400 transition-all duration-200`}
            >
              <div className="w-32 h-32 flex-shrink-0">
                {meet.images ? (
                  <img
                    src={meet.images}
                    alt={meet.meetName}
                    className={`w-full h-full border border-gray-300 object-cover rounded-lg cursor-pointer ${
                      isActive ? "" : "pointer-events-none"
                    }`}
                    onClick={() =>
                      handleDetailClick(meet.category, meet.meetId, isActive)
                    }
                  />
                ) : (
                  <span className="text-center">사진 없음</span>
                )}
              </div>

              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2
                    className={`text-xl font-semibold cursor-pointer ${
                      isActive ? "" : "pointer-events-none"
                    }`}
                    onClick={() =>
                      handleDetailClick(meet.category, meet.meetId, isActive)
                    }
                  >
                    {meet.meetName}
                  </h2>
                  <span className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">
                    {meet.category}
                  </span>
                </div>
                <hr className="mb-2" />
                <div className="text-gray-600 mb-2 text-left">
                  장소: {meet.meetLocation}
                </div>
                <div className="text-gray-600 text-left">
                  인원수: {meet.meetMaximum}명
                </div>
              </div>

              <div className="flex w-28 h-full">
                <div className="ml-auto text-right flex flex-col justify-end p-0">
                  <span
                    className={`text-white px-3 py-1 rounded-lg ${roleInfo.bgColor}`}
                  >
                    {roleInfo.label}
                  </span>
                  {roleInfo.button && (
                    <button
                      className="mt-2 text-[15px] text-gray-400 underline hover:text-black"
                      onClick={roleInfo.button.onClick}
                    >
                      {roleInfo.button.label}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MeetJoinList;
