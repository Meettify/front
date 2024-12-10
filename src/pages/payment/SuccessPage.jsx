import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경
import PaymentAPI from "../../api/paymentAPI";

const SuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    console.log("Payment API 호출 시작");
    const confirmPayment = async () => {
      try {
        const orderId = new URLSearchParams(window.location.search).get("orderId"); // paymentId -> orderId로 변경
        const response = await PaymentAPI.tossPayConfirm({
          orderId: orderId,  // 변경된 값 전달
        });
        console.log("Payment API 응답:", response); // API 응답을 콘솔에 출력
        if (response.status === "success") {
          setPaymentDetails(response.data);
        } else {
          setErrorMessage(response.errorMessage || "알 수 없는 오류가 발생했습니다.");
        }
      } catch (error) {
        console.log("결제 처리 오류:", error); // 에러 발생 시 출력
        setErrorMessage("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    confirmPayment();
  }, []);

  if (errorMessage) {
    return (
      <div>
        <h1>결제 실패</h1>
        <p>{errorMessage}</p>
        <button onClick={() => navigate("/retry")}>재시도</button>
      </div>
    );
  }

  return (
    <div>
      <h1>결제 성공</h1>
      {paymentDetails ? (
        <div>
          <p>결제가 성공적으로 완료되었습니다!</p>
          <p>주문번호: {paymentDetails.orderId}</p>
          <p>결제 금액: {paymentDetails.amount}</p>
          <button onClick={() => navigate("/order/summary")}>주문 내역 보기</button>
        </div>
      ) : (
        <p>결제 정보를 로딩 중입니다...</p>
      )}
    </div>
  );
};

export default SuccessPage;
