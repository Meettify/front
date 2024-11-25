import useNotificationStore from "./useNotificationStore";

const removeSpecificNotification = (index) => {
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  removeNotification(index);
};

export default removeSpecificNotification;