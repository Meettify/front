import React, { useEffect, useState, createContext } from "react";

import "./OrderPage2.css";
import { useLocation } from "react-router-dom";
import OrderSection from "../../components/order/OrderSection";
import SectionAddr from "../../components/order/SectionAddr";
import SectionItems from "../../components/order/SectionItems";
import SectionCheckout from "../../components/order/SectionCheckout";
import axios from "axios";
import { IoConstructOutline } from "react-icons/io5";

export const OrderPriceContext = createContext();
const OrderPage2 = () => {
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderItems, setOrderItems] = useState(null);
  const location = useLocation();
  const orderState = location.state;

  useEffect(() => {
    //body 에 클래스 붙이기
    const $body = document.querySelector("body"); // 단일 요소 선택
    $body.classList.add("OrderPageWrap");

    return () => {
      $body.classList.remove("CartPageWrap"); // 정리(cleanup)
    };
  }, []);

  useEffect(() => {
    if (orderState?.selectedCartItems) {
      const cartItems = orderState.selectedCartItems.map((item) => ({
        item, // ❗️장바구니 방식과 일치시킴 (item 안에 itemId, itemName, itemCount 등 포함)
        itemCount: item.itemCount, // ✅ 직접 구매용 수량
      }));

      setOrderItems({ cartItems });
      setOrderPrice(orderState.totalPrice || 0);
    } else {
      const stored = sessionStorage.getItem("orderItems");
      if (stored) setOrderItems(JSON.parse(stored));
    }
  }, [location]);

  useEffect(() => {
    if (orderItems?.cartItems?.length && !orderState?.totalPrice) {
      const total = orderItems.cartItems.reduce(
        (acc, item) => acc + item.item.itemPrice * item.itemCount,
        0
      );
      setOrderPrice(total);
    }
  }, [orderItems]);

  //임시 주문서 발급
  useEffect(() => {
    const requestBody = { orders: [] };

    orderItems?.cartItems?.forEach((cartItem) => {
      const item = cartItem.item ?? cartItem; // item이 없으면 cartItem 자체를 사용

      requestBody.orders.push({
        itemId: item.itemId,
        itemCount: cartItem.itemCount,
        itemName: item.itemName,
      });
    });

    const fetchOrderTemp = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/orders/tempOrder`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        sessionStorage.setItem("orderTemp", JSON.stringify(response.data));
      } catch (err) {
        console.error("주문서 발급 실패 : ", err.response?.data || err);
      }
    };

    if (orderItems?.cartItems?.length > 0) {
      fetchOrderTemp();
    }
  }, [orderItems]);

  return (
    <>
      <OrderPriceContext.Provider value={{ orderPrice, setOrderPrice }}>
        <div className="page-wrap OrderPage2">
          <div className="order-content-wrap">
            <OrderSection title={`배송지`} content={<SectionAddr />} />
            <OrderSection title={`주문상품`} content={<SectionItems />} />
            <OrderSection
              title={`결제하기`}
              content={<SectionCheckout orderPrice={orderPrice} />}
            />
          </div>
        </div>
      </OrderPriceContext.Provider>
    </>
  );
};

export default OrderPage2;
