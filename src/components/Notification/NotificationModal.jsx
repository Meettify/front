import React from "react";
import useNotificationStore from "../../stores/useNotificationStore";
import useModalStore from "../../stores/useModalStore";
import { useAuth } from "../../hooks/useAuth";

const NotificationModal = ({ buttonPosition, onClose }) => {
  // Zustand 스토어에서 알림 리스트 및 제어 함수 가져오기
  const { notifications, removeNotification, clearNotifications } =
    useNotificationStore();

  // 모달 열림 여부 및 닫기 제어
  const { modals, closeModal } = useModalStore();

  // 로그인된 사용자 정보 (role 포함)
  const { user } = useAuth();

  // 세션에서 accessToken 가져오기
  const accessToken = sessionStorage.getItem("accessToken");

  // 🔵 관리자 테스트용 알림 전송 함수
  const handleSendTestNotification = () => {
    if (!accessToken) {
      console.error("Access token이 없습니다.");
      return;
    }

    fetch("https://meettify.store/api/v1/notify/send", {
      method: "GET",
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

  // 🔴 개별 알림 삭제 함수 (백엔드 삭제 + Zustand 상태 동기화)
  const handleDelete = async (id) => {
    if (!accessToken) return;

    await fetch(`https://meettify.store/api/v1/notify/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    removeNotification(id); // 상태에서도 삭제
  };

  // 🔴 전체 알림 삭제 함수
  const handleDeleteAll = async () => {
    if (!accessToken) return;

    for (const n of notifications) {
      await fetch(`https://meettify.store/api/v1/notify/${n.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    clearNotifications(); // 상태 초기화
  };

  // ❌ 모달이 닫혀 있다면 렌더링하지 않음
  if (!modals["notification"]) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10"
      style={{ zIndex: 999 }}
      onClick={onClose || (() => closeModal("notification"))}
    >
      <div
        className="absolute bg-white rounded-lg p-5 shadow-lg w-72"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 모달 닫힘 방지
        style={{
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`,
          zIndex: 1000,
        }}
      >
        {/* 🔔 모달 헤더 */}
        <h2 className="text-lg font-bold mb-4">알림</h2>

        {/* 📜 알림 목록 (스크롤 가능) */}
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification, index) => (
                <li
                  key={notification.id || index}
                  className="p-2 border rounded flex justify-between items-start"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-xs text-red-500 ml-2"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">알림이 없습니다.</p>
          )}
        </div>

        {/* 📦 모달 하단 버튼 영역 */}
        <div className="mt-4 flex justify-between gap-2">
          {/* 닫기 버튼 */}
          <button
            onClick={() => closeModal("notification")}
            className="p-2 bg-gray-400 text-white rounded w-full"
          >
            닫기
          </button>

          {/* 전체 삭제 버튼 (알림이 있을 경우에만 표시) */}
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="p-2 bg-red-500 text-white rounded w-full"
            >
              전체 삭제
            </button>
          )}
        </div>

        {/* 🛠 관리자만 노출되는 알림 테스트 버튼 */}
        {user?.role === "ADMIN" && (
          <button
            onClick={handleSendTestNotification}
            className="mt-3 p-2 bg-blue-500 text-white rounded w-full"
          >
            알림 테스트 보내기
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
