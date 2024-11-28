import React from "react";

const SendNotificationButton = () => {
  const handleSendNotification = () => {
    const accessToken = sessionStorage.getItem("accessToken"); // 토큰 가져오기
    if (!accessToken) {
      console.error("Access token이 없습니다.");
      return;
    }

    fetch("https://meettify.store/api/v1/notify/send", {
      method: "GET", // GET 요청으로 수정
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // 헤더 수정
      },
      credentials: "include", // 쿠키 포함
    })
      .then((response) => {
        if (response.ok) {
          console.log("알림 트리거 성공!");
        } else {
          console.error("알림 트리거 실패:", response.status);
        }
      })
      .catch((error) => console.error("알림 요청 오류:", error));
  };

  return (
    <button
      onClick={handleSendNotification}
      className="p-2 bg-blue-500 text-white rounded"
    >
      알림 테스트 보내기
    </button>
  );
};

export default SendNotificationButton;
