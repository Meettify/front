import React from "react";
import useNotificationStore from "../../stores/useNotificationStore";
import useModalStore from "../../stores/useModalStore";

const NotificationModal = () => {
  const { notifications } = useNotificationStore(); // 알림 상태
  const { modals, closeModal } = useModalStore(); // 모달 상태

  console.log("모달에서 읽은 알림 상태:", notifications); // 상태 디버깅

  if (!modals["notification"]) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10"
      onClick={() => closeModal("notification")}
    >
      <div
        className="bg-white rounded-lg p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 모달 외부 클릭 시 닫히지 않도록 방지
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
