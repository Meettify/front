import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [], // 알림 데이터를 저장할 배열

  // 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  // 특정 알림 제거
  removeNotification: (index) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index),
    })),

  // 모든 알림 제거
  clearNotifications: () =>
    set(() => ({
      notifications: [],
    })),
}));

export default useNotificationStore;
