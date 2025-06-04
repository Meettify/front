import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useContext, useEffect, useState } from "react";
import { OrderPriceContext } from "../../pages/order/OrderPage2";
import axios from "axios";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "Ie83yGtiEYeGhcndeuXsU";

function SectionCheckout() {
  const { orderPrice } = useContext(OrderPriceContext);
  const [user, setUser] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [orderTemp, setOrderTemp] = useState(null);

  //S: 유저 정보
  useEffect(() => {
    //로그인 유저 정보 가져오기
    const getUser = async () => {
      const memberId = localStorage.getItem("memberId");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/members/${memberId}`, // URL
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error(
          "회원 조회 실패 : ",
          err.response ? err.response.data : err
        );
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const temp = JSON.parse(sessionStorage.getItem("orderTemp"));
    console.log("✅ 직접 확인:", temp);
    setOrderTemp(temp);
  }, []);

  //S: toss

  //주문 총액 넣어주기
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 1000,
  });

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    console.log(orderTemp);

    setAmount({
      currency: "KRW",
      value: orderTemp?.orderTotalPrice,
    });
  }, [orderTemp]);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets || !orderTemp?.orderTotalPrice) {
        console.warn(
          "⚠️ Toss 위젯 렌더링 시점에 orderTotalPrice가 정의되지 않았습니다."
        );
        return;
      }

      await widgets.setAmount({
        currency: "KRW",
        value: orderTemp.orderTotalPrice,
      });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, orderTemp]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  const nowFormatData = () => {
    const now = new Date();

    // 로컬(한국) 시간 기준으로 포맷
    const dateStr = now
      .toLocaleString("sv-SE", { timeZone: "Asia/Seoul" })
      .replace(" ", "T");

    // 타임존(XXX) 추가
    const offset = now.getTimezoneOffset() / -60;
    const timezone =
      (offset >= 0 ? "+" : "-") +
      String(Math.abs(offset)).padStart(2, "0") +
      ":00";

    const formattedDate = `${dateStr}${timezone}`;
    return formattedDate; // "2025-02-24T12:34:56+09:00"
  };

  const handlePayment = async (e) => {
    try {
      // 최신 orderTemp 저장 (안정성 확보)
      sessionStorage.setItem("orderTemp", JSON.stringify(orderTemp));

      //결제 정보 전달
      const requestBody = {
        orderId: orderTemp?.orderUid,
        orderName: orderTemp?.orderItems[0].item.itemName,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: user.memberEmail,
        customerName: user.memberName,
        customerMobilePhone: "01012341234",
      };

      if (orderTemp?.orderItems.length > 1) {
        requestBody.orderName +=
          "외 " + orderTemp?.orderItems.length - 1 + "건";
      }

      await widgets.requestPayment(requestBody);
    } catch (err) {
      console.error(err);
    }

    //요청 시간 저장해놓기
    sessionStorage.setItem("requestOrderTime", nowFormatData(new Date()));
  };
  //E: toss

  return (
    <>
      <div className="SectionCheckout">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />

        {/* 결제하기 버튼 */}
        <div className="list-bottom-area">
          <div className="total-price-area">
            <span className="label">주문 금액</span>
            <span className="cart-total-price">{`${orderPrice?.toLocaleString()}원`}</span>
          </div>
          <div className="btns-wrap">
            <button
              className="btn btn-primary btn-order"
              disabled={!ready}
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCheckout;
