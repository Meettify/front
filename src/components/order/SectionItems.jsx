import React, { useContext, useEffect, useState } from "react";
import { OrderPriceContext } from "../../pages/order/OrderPage2";

const SectionItems = () => {
  const [orderTemp, setOrderTemp] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(1);
  const { setOrderPrice } = useContext(OrderPriceContext);

  useEffect(() => {
    const temp = JSON.parse(sessionStorage.getItem("orderTemp"));
    console.log("✅ 직접 확인:", temp);
    setOrderTemp(temp);
  }, []);

  useEffect(() => {
    setOrderItems(orderTemp?.orderItems);
    setTotalPrice(orderTemp?.orderTotalPrice);
    setOrderPrice(orderTemp?.orderTotalPrice);
  }, [orderTemp]);

  return (
    <>
      <div className="order-items-area">
        <div className="list-wrap">
          {orderItems?.map((orderItem) => (
            <div className="order-item" key={orderItem.item.itemId}>
              <div className="img-wrap">
                {orderItem.item.images.length !== 0 ? (
                  <img src={orderItem.item.images[0]?.uploadImgUrl} alt="" />
                ) : (
                  <span className="no-img">이미지 없음</span>
                )}
              </div>
              <div className="order-info-wrap">
                <span className="item-name">{orderItem.item.itemName}</span>
                <span className="item-price">
                  {orderItem.item.itemPrice?.toLocaleString()}원
                </span>
                <span className="item-count">
                  수량: {orderItem.orderCount}개
                </span>
              </div>
              <div className="item-total-wrap">
                <span className="item-total-price">
                  {`${(
                    orderItem?.item.itemPrice * orderItem?.orderCount
                  ).toLocaleString()}`}
                  원
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="all-price-area">
          <span className="label">총 금액</span>
          <span className="price">{totalPrice?.toLocaleString()}원</span>
        </div>
      </div>
    </>
  );
};

export default SectionItems;
