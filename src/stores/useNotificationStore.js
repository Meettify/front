import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],

  // 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  // 특정 알림 제거
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),

  // 모든 알림 초기화
  clearNotifications: () =>
    set(() => ({
      notifications: [],
    })),
}));

export default useNotificationStore;
