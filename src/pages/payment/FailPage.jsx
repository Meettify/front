import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경
import PaymentAPI from "../../api/paymentAPI";

const FailurePage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    // 결제 실패 이유를 API에서 받아옴
    const checkFailure = async () => {
      const paymentId = new URLSearchParams(window.location.search).get("paymentId");

      if (!paymentId) {
        setErrorMessage("결제 ID가 없습니다. 다시 시도해주세요.");
        return;
      }

      try {
        console.log("Sending paymentId to Toss API:", paymentId); // 디버깅용 로그
        const response = await PaymentAPI.tossPayConfirm({ paymentId });

        // API 응답 처리
        if (response.status !== "success") {
          setErrorMessage(response.errorMessage || "알 수 없는 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);  // 디버깅용 로그
        setErrorMessage("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    checkFailure();
  }, []);

  return (
    <div>
      <h1>결제 실패</h1>
      {errorMessage ? (
        <div>
          <p>{errorMessage}</p>
          <button onClick={() => navigate("/retry")}>재시도</button> {/* navigate로 변경 */}
          <button onClick={() => navigate("/support")}>고객센터 문의</button> {/* navigate로 변경 */}
        </div>
      ) : (
        <p>결제 실패 원인을 로딩 중입니다...</p>
      )}
    </div>
  );
};

export default FailurePage;