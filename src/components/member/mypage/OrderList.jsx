import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OrderDetailModal from "./OrderDetailModal";
import { useMyPage } from "../../../hooks/useMypage";
import { useAuth } from "../../../hooks/useAuth";
import useNavigation from "../../../hooks/useNavigation";

const OrderList = () => {
  const {
    myOrderList,
    myOrdertotalPages,
    myOrderCurrentPage,
    setMyOrderCurrentPage,
    fetchOrders,
  } = useMyPage();

  const { user } = useAuth();
  const { goToSupport } = useNavigation();
  const { ref, inView } = useInView();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (inView && myOrderCurrentPage < myOrdertotalPages && hasMore) {
      setMyOrderCurrentPage((prevPage) => prevPage + 1);
    }
  }, [inView, myOrderCurrentPage, myOrdertotalPages, hasMore]);

  useEffect(() => {
    if (myOrderCurrentPage > 1) {
      const delayFetch = setTimeout(() => {
        fetchOrders(myOrderCurrentPage - 1);
      }, 1000);
      return () => clearTimeout(delayFetch);
    }
  }, [myOrderCurrentPage, fetchOrders]);

  useEffect(() => {
    if (myOrderCurrentPage >= myOrdertotalPages) {
      setHasMore(false);
    }
  }, [myOrderCurrentPage, myOrdertotalPages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="ml-5">
      <h2 className="text-2xl font-semibold mb-10 text-left">상품 구매 내역</h2>

      {Array.isArray(myOrderList) ? (
        myOrderList.length === 0 ? (
          <p className="text-gray-500">주문한 상품이 없습니다.</p>
        ) : (
          myOrderList.map((order) =>
            order.orderItems.map((orderItem) => (
              <div
                key={`${order.orderUid}-${orderItem.orderItemId}`}
                className={`border rounded-md border-gray-300 p-4 mb-4 max-w-[700px] 
                  hover:shadow-inner hover:border-gray-400 transition-all duration-200 
                  ${order.payStatus === "결제 완료" ? "" : "bg-gray-100"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold">
                      {formatDate(order.orderTime)}
                      <span className="text-zinc-300 ml-2 mr-2">/</span>
                    </span>
                    <span className="text-gray-400">{order.orderUid}</span>
                  </div>
                  <button
                    onClick={() => openModal(order)}
                    className="text-gray-400 hover:text-gray-500 underline"
                  >
                    상세주문내역
                  </button>
                </div>

                <hr className="mt-2 mb-2" />

                <div className="flex mb-2">
                  <p>
                    <span
                      className={
                        order.payStatus === "결제 완료"
                          ? "text-blue-500"
                          : "text-red-500"
                      }
                    >
                      {order.payStatus === "결제 완료"
                        ? "구매 완료"
                        : "결제 취소 완료"}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex">
                    <img
                      src={
                        orderItem.item?.images?.[0]?.uploadImgUrl ||
                        "/placeholder.jpg"
                      }
                      alt={orderItem.item?.itemName}
                      className="w-20 h-20 object-cover border border-gray-300"
                    />
                    <div className="ml-4 text-left">
                      <p className="font-semibold">
                        {orderItem.item?.itemName}
                      </p>
                      <p>{orderItem.item?.itemDetails}</p>
                      <p>
                        <span>{orderItem.orderPrice.toLocaleString()}원</span>
                        <span className="text-zinc-500 mx-2">|</span>
                        <span className="text-zinc-400">
                          {orderItem.orderCount}개
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="p-2 text-gray-500 border border-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => goToSupport()}
                    >
                      문의하기
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )
      ) : (
        <p className="text-red-400">주문 목록을 불러오는 데 실패했습니다.</p>
      )}

      {/* 로딩 종료 메시지 */}
      {myOrderCurrentPage >= myOrdertotalPages &&
        Array.isArray(myOrderList) &&
        myOrderList.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">
            더 이상 데이터가 없습니다.
          </p>
        )}

      <div ref={ref} />

      {isModalOpen && (
        <OrderDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedOrder={selectedOrder}
          user={user}
        />
      )}
    </div>
  );
};

export default OrderList;
