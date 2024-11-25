import request from "./request";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const notificationAPI = {
  // 알림 읽기 API
  readNotification: async (notificationId) => {
    console.log(`[NotificationAPI 디버깅] 알림 읽기 요청 시작. ID: ${notificationId}`);

    try {
      const response = await request.get({
        url: `${BASE_URL}/notify/${notificationId}`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("[NotificationAPI 디버깅] 알림 읽기 요청 성공. 응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      console.error("[NotificationAPI 디버깅] 알림 읽기 요청 실패:", error);
      throw error;
    }
  },
};

export default notificationAPI;
