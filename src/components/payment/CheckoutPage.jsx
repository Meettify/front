import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { createTempOrder } from "../../api/orderAPI";
import { useAuth } from "../../hooks/useAuth";

const selector = "#payment-widget";
// const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();


export function CheckoutPage({ price, user, orderItems, onSuccess, onFail }) {
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef(null);
  const [paymentMethodsWidgetReady, setPaymentMethodsWidgetReady] = useState(false);

  // 로그 추가
  console.log("Order Items in CheckoutPage:", orderItems);
  console.log("Order Amount in CheckoutPage:", price);
  console.log("User Info in CheckoutPage:", user); // 매개변수로 전달된 user 디버깅

  // 결제 위젯 초기화
  useEffect(() => {
    if (!paymentWidget) return;

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price }, { variantKey: "DEFAULT" });
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidget.on("ready", () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      setPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  const handlePayment = async () => {
    try {
      // Step 1: 결제 데이터 준비
      console.log("User Info:", user); // 디버깅용 로그
      console.log("Order Items:", orderItems);

      // 객체가 포함되었는지 검사
      if (typeof user !== "object" || !user.memberName) {
        throw new Error("Invalid user object!");
      }

      // Step 2: 결제 위젯 요청
      const tossPaymentResult = await paymentWidget?.requestPayment({
        orderId: "order_" + nanoid(), // 예제: 고유한 Order ID 생성
        orderName: "주문 상품",
        customerName: user.memberName,
        customerEmail: user.memberEmail,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });

      console.log("결제 성공:", tossPaymentResult);

      // Step 3: 서버로 결제 확인 요청
      const response = await paymentAPI.tossPayConfirm({
        orderId: tossPaymentResult.orderId,
        amount: tossPaymentResult.amount,
        paymentKey: tossPaymentResult.paymentKey,
        requestedAt: tossPaymentResult.requestedAt,
        approvedAt: tossPaymentResult.approvedAt,
        orders: orderItems.map((item) => ({
          itemId: item.itemId,
          itemCount: item.quantity,
        })),
        memberAddr: user.memberAddr,
        memberAddrDetail: user.memberAddrDetail,
        memberZipCode: user.memberZipCode,
      });

      console.log("결제 정보 확인 응답:", response);

      // 성공 콜백 호출
      onSuccess?.();
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error.message); // 에러 로그 추가
      onFail?.(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-widget" />
        <div id="agreement" />
        <button
          className="button"
          style={{ marginTop: "30px" }}
          disabled={!paymentMethodsWidgetReady}
          onClick={handlePayment}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

// 결제 위젯을 로드하는 커스텀 훅
function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => loadPaymentWidget(clientKey, customerKey),
  });
}
