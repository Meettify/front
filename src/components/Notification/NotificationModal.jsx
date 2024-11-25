import React, { useEffect } from "react";
import useNotificationStore from "../../stores/useNotificationStore";
import useModalStore from "../../stores/useModalStore";
import useNotificationSSE from "../../hooks/useNotificationSSE";

const NotificationModal = () => {
  const { notifications, connected } = useNotificationSSE(); // SSE를 통한 알림 데이터와 상태 가져오기
  const { modals, closeModal } = useModalStore();
  const addNotification = useNotificationStore((state) => state.addNotification);

  // SSE 알림 데이터를 상태에 동기화
  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification) => addNotification(notification));
    }
  }, [notifications, addNotification]);

  if (!modals["notification"]) return null; // 모달이 열릴 때만 렌더링

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10"
      onClick={() => closeModal("notification")}
    >
      <div
        className="bg-white rounded-lg p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 처리
      >
        <h2 className="text-lg font-bold mb-4">알림</h2>
        <p className="text-sm text-gray-500 mb-2">
          SSE 상태: {connected ? "연결됨" : "연결 끊김"}
        </p>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                {notification.message || notification}
              </li>
            ))}
          </ul>
        ) : (
          <p>알림이 없습니다.</p>
        )}
        <button
          onClick={() => closeModal("notification")}
          className="mt-3 p-2 bg-red-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
