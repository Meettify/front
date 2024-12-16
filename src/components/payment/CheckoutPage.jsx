import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

export function CheckoutPage({ user, price, disabled, orderItems, onSuccess, onFail }) {
  const navigate = useNavigate();
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef(null);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);
  const [paymentKey, setPaymentKey] = useState(null);  // paymentKey 상태 추가

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    //결제 UI
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: price }, { variantKey: "DEFAULT" });

    //이용약관 UI
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    //결제 UI 이벤트
    paymentMethodsWidget.on("ready", () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    //금액 업데이트
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentSuccess = () => {
    const orderId = nanoid();  // 주문 ID 생성

    // 주문 정보와 배송 정보
    const items = orderItems.map(item => ({
      itemId: item.itemId,
      itemCount: item.itemCount,
      itemName: item.itemName,
    }));

    const address = {
      memberAddr: user?.memberAddr?.memberAddr || "주소 정보 없음",
      memberAddrDetail: user?.memberAddr?.memberAddrDetail || "상세 주소 없음",
      memberZipCode: user?.memberAddr?.memberZipCode || "우편번호 없음",
    };

    console.log(user);  // user 객체 확인
    console.log(user?.memberAddr);  // memberAddr 확인

    // 결제 위젯에 요청을 보내고 paymentKey를 반환받아 설정
    paymentWidget?.requestPayment({
      orderId: orderId,
      orderName: "토스 티셔츠 외 2건",
      customerName: user?.memberName || "고객님",
      customerEmail: user?.memberEmail || "customer123@gmail.com",
      customerMobilePhone: user?.memberMobilePhone || "01012341234",
      successUrl: `${window.location.origin}/success`,  // successUrl 수정
      failUrl: `${window.location.origin}/fail`,
    })
      .then(response => {
        setPaymentKey(response.paymentKey);  // 결제 성공 후 paymentKey 저장

        // 결제 성공 후 navigate로 /success 페이지로 이동
        navigate("/success", {
          state: {
            orderId: orderId,
            amount: price,
            items: items,  // 상품 정보
            address: address,  // 배송 주소 정보
            successMessage: "결제가 성공적으로 완료되었습니다.",
          },
        });
      })
      .catch(error => {
        console.error("Payment failed:", error);
        handlePaymentFailure();
      });
  };

  const handlePaymentFailure = () => {
    navigate("/fail");
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 배송 정보 출력 */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
          <div className="text-sm text-gray-600 text-left">
            <p>주문자명: {user?.memberName || "정보 없음"}</p>
            <p>
              주문자 주소:{" "}
              {user?.memberAddr && typeof user.memberAddr === "object"
                ? `${user.memberAddr.memberAddr || ""} ${user.memberAddr.memberAddrDetail || ""} (${user.memberAddr.memberZipCode || ""})`
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
              handlePaymentFailure();
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
