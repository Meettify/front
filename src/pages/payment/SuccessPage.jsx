import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import paymentAPI from "../../api/paymentAPI";  // paymentAPI import

const SuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!orderId || !paymentKey || !amount) {
        console.warn("필수 정보가 부족합니다.");
        setErrorMessage("결제 정보가 누락되었습니다.");
        return;
      }

      try {
        // 결제 확인 API 호출
        const result = await paymentAPI.tossPayConfirm({ orderId, paymentKey, amount });
        setPaymentDetails(result);  // 결제 성공한 데이터를 상태에 저장

      } catch (error) {
        console.error("결제 처리 오류:", error);
        if (error.response && error.response.data) {
          // 실패 사유가 있다면 그 메시지를 표시
          setErrorMessage(error.response.data.message || "결제 처리 중 오류가 발생했습니다.");
        } else {
          // 일반적인 오류 처리
          setErrorMessage("결제 처리 중 오류가 발생했습니다.");
        }
      }
    };

    confirmPayment();
  }, [orderId, paymentKey, amount]);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${orderId}`}</div>
      <div>{`결제 금액: ${Number(amount).toLocaleString()}원`}</div>
      {/* You can also show paymentKey or any other information if needed */}
      {paymentKey && <div>{`결제 키: ${paymentKey}`}</div>}
    </div>
  );
};

export default SuccessPage;
