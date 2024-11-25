import useNotificationStore from "./useNotificationStore";

const clearAllNotifications = () => {
  const clearNotifications = useNotificationStore((state) => state.clearNotifications);
  clearNotifications();
};

export default clearAllNotifications;