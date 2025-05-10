import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

export function CheckoutPage({
  user,
  price,
  orderItems,
  disabled,
  orderId,
  onFail,
  onSuccess,
}) {
  const navigate = useNavigate();
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef(null);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] =
    useState(false);
  const [paymentKey, setPaymentKey] = useState(null);

  useEffect(() => {
    if (paymentWidget == null) return;

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: "DEFAULT" }
    );
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidget.on("ready", () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) return;
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentSuccess = () => {
    orderId = nanoid(); // 주문 ID 생성
    const orderNames =
      orderItems.length > 1
        ? `${orderItems[0]?.item?.itemName || "상품명 없음"} 외 ${
            orderItems.length - 1
          }건`
        : orderItems[0]?.item?.itemName || "상품명 없음"; // itemName을 제대로 참조

    console.log("Processing payment for order:", {
      orderId,
      orderNames,
      customerName: user?.memberName,
      customerEmail: user?.email,
    });

    paymentWidget
      .requestPayment({
        orderId: orderId,
        orderName: orderNames,
        customerName: user?.memberName || "고객님",
        customerEmail: user?.email || "customer@example.com",
        // customerMobilePhone: user?.memberMobilePhone || "01012341234",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      })
      .then((response) => {
        setPaymentKey(response.paymentKey);
        console.log("Payment response:", response);
        if (!response.paymentKey || !response.amount) {
          throw new Error("결제 정보가 부족합니다.");
        }
        // 결제 성공 시 SuccessPage로 URL 파라미터 전달
        navigate(
          `/success?orderId=${orderId}&paymentKey=${response.paymentKey}&amount=${price}`
        );
        if (onSuccess) onSuccess(); // onSuccess 호출
      })
      .catch((error) => {
        navigate(
          `/fail??code=${error}&message=${error_message}&orderId=${orderId}`
        );
        if (onFail) onFail(error); // onFail 호출
      });
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
          <div className="text-sm text-gray-600 text-left">
            <p>주문자명: {user?.memberName || "정보 없음"}</p>
            <p>
              주문자 주소:{" "}
              {user?.memberAddr && typeof user.memberAddr === "object"
                ? `${user.memberAddr.memberAddr || ""} ${
                    user.memberAddr.memberAddrDetail || ""
                  } (${user.memberAddr.memberZipCode || ""})`
                : user?.memberAddr || "주소 정보 없음"}
            </p>
          </div>
        </div>
        <div id="payment-widget" />
        <div id="agreement" />
        <button
          className="button"
          style={{ marginTop: "30px" }}
          disabled={disabled}
          onClick={async () => {
            try {
              handlePaymentSuccess();
            } catch (error) {
              console.error(error);
              if (onFail) {
                onFail(error);
              }
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
