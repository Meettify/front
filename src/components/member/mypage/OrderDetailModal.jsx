import React, { useEffect, useState } from "react";
import {
  getPayment,
  PostCancelToss,
  PostCancelIamPort,
} from "../../../api/memberAPI";

const OrderDetailModal = ({ isOpen, onClose, selectedOrder, user }) => {
  if (!isOpen) return null;

  const [pay, setPay] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }.${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
  };

  const payment = async () => {
    try {
      const response = await getPayment(selectedOrder.orderUUIDId);
      setPay(response);
    } catch (error) {
      console.error("payment ERROR", error);
    }
  };

  useEffect(() => {
    payment();
  }, []);

  const cancelClickHandler = () => {
    const conf = confirm(
      "구매 취소가 완료되면 되돌릴 수 없습니다.\n취소를 진행하시겠습니까?"
    );

    if (conf) {
      if (pay.paymentKey) {
        const data = {
          paymentKey: pay.paymentKey,
          orderUid: pay.orderUid,
          amount: selectedOrder.orderTotalPrice,
          cancelReason: "취소",
        };
        console.log("결제 취소 요청 데이터 : ", data);
        toss(data);
      } else {
        const data = {
          impUid: pay.impUid,
          orderUid: pay.orderUid,
        };
        iamport(data);
      }
    } else {
      return;
    }
  };

  const toss = async (data) => {
    try {
      const response = await PostCancelToss(data);
      return response;
    } catch (error) {
      console.error("Toss 결제 취소 오류", error);
    }
  };

  const iamport = async (data) => {
    try {
      const response = await PostCancelIamPort(data);
      return response;
    } catch (error) {
      console.error("Iamport 결제 취소 오류", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="p-6 rounded-lg shadow-lg max-w-lg w-full bg-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex justify-between text-xl text-left`}>
          <h3
            className={`${
              selectedOrder.payStatus === "결제 취소" ? "line-through" : ""
            } text-xl font-semibold mb-4 text-left`}
          >
            주문 상세
          </h3>
          {selectedOrder.payStatus === "결제 취소" ? (
            <span
              className={`${
                selectedOrder.payStatus === "결제 취소"
                  ? "text-red-500 font-semibold"
                  : "hidden"
              } `}
            >
              결제 취소 완료
            </span>
          ) : (
            <button
              className="text-[16px] text-gray-500 underline hover:text-gray-700"
              onClick={cancelClickHandler}
            >
              구매 취소
            </button>
          )}
        </div>

        {selectedOrder && (
          <div className="bg-white p-5">
            <div className="flex justify-between mb-4">
              <p className="font-bold text-xl text-zinc-600">
                {formatDate(selectedOrder.orderTime)} 주문
              </p>
              <p className="text-[13px] text-zinc-400 mt-[6px]">
                주문번호 {selectedOrder.orderUid}
              </p>
            </div>

            {/* 구매 목록 */}
            <h4 className="text-[26px] text-left font-semibold mt-8 mb-4">
              구매 상품 목록
            </h4>
            <ul className="bg-gray-50">
              {selectedOrder.orderItems.map((item, index) => (
                <li key={index} className="mb-4 flex items-center p-2">
                  <img
                    src={item.item.images?.[0]?.uploadImgUrl}
                    alt={item.item.itemName}
                    className="w-16 h-16 object-cover border border-gray-300 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{item.item.itemName}</p>
                    <p>{item.item.itemDetails}</p>
                    <p>
                      {item.orderPrice.toLocaleString()}원
                      <span className="text-zinc-300 ml-2 mr-2">|</span>
                      <span className="text-gray-400">{item.orderCount}개</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* 주문자, 배송지, 결제정보 */}
            <details className="mb-4">
              <summary className="cursor-pointer font-bold text-left text-[22px]">
                주문자
              </summary>
              <div className="bg-zinc-50 mt-2">
                <div className="w-full text-left p-4 text-md">
                  <p>
                    이름: <span className="ml-[17px]">{user.memberName}</span>
                  </p>
                  <p className="mt-1">
                    이메일: <span className="ml-[4px]">{user.email}</span>
                  </p>
                </div>
              </div>
            </details>

            <details className="mb-4">
              <summary className="cursor-pointer font-semibold text-left text-[22px]">
                배송지
              </summary>
              <div className="bg-zinc-50 mt-2">
                <div className="w-full text-left p-4 text-md">
                  <p>우편번호: {selectedOrder.orderAddress.memberZipCode}</p>
                  <p className="mt-[1px] mb-[1px]">
                    배송주소: {selectedOrder.orderAddress.memberAddr}
                  </p>
                  <p>
                    주소상세 : {selectedOrder.orderAddress.memberAddrDetail}
                  </p>
                </div>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer font-semibold text-left text-[22px]">
                결제정보
              </summary>
              <div className="bg-zinc-50 mt-2">
                <div className="w-full text-left p-4">
                  <p className="flex justify-between text-zinc-800 font-semibold">
                    결제방법: <span>{pay.payMethod}</span>
                  </p>
                  <p className="flex justify-between text-gray-500">
                    상품금액:{" "}
                    <span>
                      {selectedOrder.orderTotalPrice.toLocaleString()}&nbsp;원
                    </span>
                  </p>
                  <p className="flex justify-between text-gray-500">
                    할인금액: <span>0&nbsp;원</span>
                  </p>
                  <p className="flex justify-between text-gray-500">
                    배송비: <span>0&nbsp;원</span>
                  </p>
                  <hr className="mt-2 mb-2" />
                  <p
                    className={`flex justify-between font-bold text-md ${
                      selectedOrder.payStatus === "결제 취소"
                        ? "line-through"
                        : ""
                    }`}
                  >
                    총 결제금액:{" "}
                    <span>
                      {selectedOrder.orderTotalPrice.toLocaleString()}&nbsp;원
                    </span>
                  </p>
                  {selectedOrder.payStatus === "결제 취소" ? (
                    <p className="text-red-500 text-[14px] text-right">
                      결제 취소
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </details>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
