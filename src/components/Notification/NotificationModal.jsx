import React from 'react';
import useNotificationStore from '../../stores/useNotificationStore';
import useModalStore from '../../stores/useModalStore';

const NotificationModal = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const { modals, closeModal } = useModalStore();

  if (!modals['notification']) return null; // 모달이 열릴 때만 렌더링

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10"
      onClick={() => closeModal('notification')}
    >
      <div
        className="bg-white rounded-lg p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 처리
      >
        <h2 className="text-lg font-bold mb-4">알림</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2">{notification.message || notification}</li>
            ))}
          </ul>
        ) : (
          <p>알림이 없습니다.</p>
        )}
        <button
          onClick={() => closeModal('notification')}
          className="mt-3 p-2 bg-red-500 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
