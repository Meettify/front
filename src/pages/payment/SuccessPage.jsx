import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리 파라미터에서 값 가져오기
  const queryParams = new URLSearchParams(location.search);
  const paymentKey = queryParams.get("paymentKey");
  const orderId = queryParams.get("orderId");
  const amount = queryParams.get("amount");

  // state로 받은 값들
  const { items, address, successMessage } = location.state || {};

  console.log("orderId:", orderId);  // 확인용 로그
  console.log("paymentKey:", paymentKey);  // 확인용 로그
  console.log("address:", address);  // 확인용 로그
  console.log("items:", items);  // 확인용 로그

  useEffect(() => {
    const confirmPayment = async () => {
      console.log("결제 API 호출 시작");

      const requestedAt = new Date().toISOString();
      const approvedAt = new Date().toISOString();

      try {
        const response = await fetch('https://meettify.store/api/v1/payment/toss/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
            requestedAt,
            approvedAt,
            orders: items || [],  // 빈 배열로 기본값 설정
            address: address || {},  // 빈 객체로 기본값 설정
          }),
        });

        if (!response.ok) {
          throw new Error("결제 확인 실패");
        }

        const data = await response.json();
        console.log("결제 성공:", data);

        // 응답 데이터 구조 출력
        console.log("API 응답 데이터:");
        console.log("orderId:", data.orderId);
        console.log("amount:", data.amount);
        console.log("paymentKey:", data.paymentKey);
        console.log("requestedAt:", data.requestedAt);
        console.log("approvedAt:", data.approvedAt);
        console.log("orderUid:", data.orderUid);
        console.log("orders:", data.orders);
        console.log("address:", data.address);

        setPaymentDetails(data);
      } catch (error) {
        console.error("결제 처리 오류:", error);
        setErrorMessage("결제를 처리하는 중 오류가 발생했습니다.");
      }
    };

    if (orderId && paymentKey) {
      confirmPayment();
    } else {
      setErrorMessage("필수 정보가 부족합니다.");
    }
  }, [orderId, paymentKey, amount, items, address]);

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
          <p>{successMessage}</p>
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
