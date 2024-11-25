import useNotificationStore from "./useNotificationStore";

const addNewNotification = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);
  addNotification({ message: "새로운 알림입니다!" });
};

export default addNewNotification;