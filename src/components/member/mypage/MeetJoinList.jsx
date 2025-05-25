import React, { useEffect, useState } from "react";
import useNavigation from "../../../hooks/useNavigation";
import { useMyPage } from "../../../hooks/useMypage";
import { putLeaveMeet, putCancelMeet } from "../../../api/memberAPI";

const MeetJoinList = () => {
  const { goToMeetDetail } = useNavigation();
  const { fetchMyMeetList } = useMyPage(); // 페이지 API 호출 함수 (기존에 setMeetJoinPage 기반이면 교체 필요)

  const [meetJoinList, setMeetJoinList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMeetList = async () => {
      try {
        const res = await fetchMyMeetList(currentPage); // page 기준 요청
        setMeetJoinList(res.content);
        setTotalPages(res.totalPages || 1);
      } catch (e) {
        console.error("모임 목록 불러오기 실패", e);
      }
    };
    loadMeetList();
  }, [currentPage]);

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

      if (result?.status === 200) {
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

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded-lg text-sm border ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-2 py-1 mx-1 text-sm text-gray-600"
        >
          &lt;
        </button>
        {pages}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-2 py-1 mx-1 text-sm text-gray-600"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4 ml-8">
      {meetJoinList.length === 0 ? (
        <div className="text-center text-gray-600">가입된 모임이 없습니다.</div>
      ) : (
        <>
          {meetJoinList.map((meet) => {
            const roleInfo = getRoleInfo(
              meet.meetRole,
              meet.meetId,
              meet.meetMemberId
            );
            const isActive = roleInfo.isActive !== false;

            return (
              <div
                key={meet.meetId}
                className={`flex items-start border p-4 rounded-lg w-[900px] h-[158px] ${
                  ["DORMANT", "EXPEL"].includes(meet.meetRole)
                    ? "bg-gray-400"
                    : "bg-white"
                } hover:shadow-inner hover:border-gray-400 transition-all duration-200`}
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
          })}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default MeetJoinList;
