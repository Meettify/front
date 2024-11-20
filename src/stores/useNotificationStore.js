import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [], // 알림 데이터를 저장할 배열

  // 새로운 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  // 특정 알림 삭제
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // 모든 알림 삭제
  clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
