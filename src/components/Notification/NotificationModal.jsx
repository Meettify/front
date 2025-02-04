import React from "react";
import useNotificationStore from "../../stores/useNotificationStore";
import useModalStore from "../../stores/useModalStore";

const NotificationModal = ({ buttonPosition, onClose }) => {
  const { notifications } = useNotificationStore(); // 알림 상태
  const { modals, closeModal } = useModalStore(); // 모달 상태

  // 디버깅용 로그
  console.log("모달 열림 상태:", modals["notification"]);
  console.log("알림 상태:", notifications);

  // 알림 테스트 버튼 클릭 시 `/send` 호출 함수
  const handleSendTestNotification = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token이 없습니다.");
      return;
    }

    fetch("https://meettify.store/api/v1/notify/send", {
      method: "GET", // 또는 POST
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("알림 테스트 성공!");
        } else {
          console.error("알림 테스트 실패:", response.status);
        }
      })
      .catch((error) => console.error("알림 요청 오류:", error));
  };

  // 모달이 열리지 않은 상태에서는 렌더링하지 않음
  if (!modals["notification"]) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10"
      style={{ zIndex: 999 }} // InfoModal과 동일한 z-index
      onClick={onClose || (() => closeModal("notification"))} // 배경 클릭 시 닫기
    >
      <div
        className="absolute bg-white rounded-lg p-5 shadow-lg w-72"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫기 방지
        style={{
          top: `${buttonPosition.top}px`, // 아이콘 바로 아래
          left: `${buttonPosition.left}px`, // 아이콘 가로 중심
          zIndex: 1000, // 최상위 레이어
        }}
      >


        <h2 className="text-lg font-bold mb-4">알림</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={notification.id || index} className="mb-2">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.timestamp}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>알림이 없습니다.</p>
        )}

        {/* 알림 테스트 버튼 */}
        <button
          onClick={handleSendTestNotification}
          className="mt-3 p-2 bg-blue-500 text-white rounded"
        >
          알림 테스트 보내기
        </button>

        <button
          onClick={() => closeModal("notification")}
          className="mt-3 ml-2 p-2 bg-red-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
