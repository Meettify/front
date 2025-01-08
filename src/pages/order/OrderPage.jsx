import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CheckoutPage } from "../../components/payment/CheckoutPage";
import { getItemList } from "../../api/adminAPI";
import { createTempOrder } from "../../api/orderAPI";
import useOrderStore from "../../stores/useOrderStore";

const OrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const { user } = useAuth();
    const navigate = useNavigate();
    const { createOrder, orderData, setOrderData } = useOrderStore();

    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const [orderAmount, setOrderAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state?.selectedCartItems?.length) {
            setSelectedCartItems(state.selectedCartItems);
        } else {
            setIsLoading(true);
            getItemList(1, 10)
                .then((items) => {
                    if (Array.isArray(items)) {
                        setSelectedCartItems(items);
                    } else {
                        throw new Error("Invalid items data structure.");
                    }
                })
                .catch((error) => console.error("Error fetching items from API:", error))
                .finally(() => setIsLoading(false));
        }
    }, [state]);

    useEffect(() => {
        const totalAmount = selectedCartItems.reduce((sum, item) => {
            return sum + (item.itemPrice || 0) * (item.itemCount || 1);
        }, 0);
        setOrderAmount(totalAmount);
    }, [selectedCartItems]);

    const handleSuccess = async (response) => {
        if (!user?.memberAddr || !user?.memberAddrDetail || !user?.memberZipCode) {
            alert("배송 정보가 부족합니다. 주소를 입력해주세요.");
            return;
        }

        try {
            const { paymentKey, orderId, amount } = response;
            const result = await createOrder({
                memberAddr: user.memberAddr,
                memberAddrDetail: user.memberAddrDetail,
                memberZipCode: user.memberZipCode,
                orders: selectedCartItems.map((item) => ({
                    itemId: item.itemId,
                    itemCount: item.itemCount || 1,
                    itemName: item.itemName || "상품명 없음",
                })),
            });

            if (result) {
                navigate(`/success`, {
                    state: {
                        orderId: result.orderId,
                        amount: orderAmount,
                        items: selectedCartItems,
                        successMessage: "결제가 성공적으로 완료되었습니다.",
                    },
                });
            } else {
                throw new Error("Order creation failed.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            handleFailure(error);
        }
    };

    const handleFailure = (error) => {
        console.error("결제 실패:", error);
        navigate(`/fail`, {
            state: {
                message: error.message || "결제 실패",
                orderDetails: JSON.stringify({
                    items: selectedCartItems,
                    totalAmount: orderAmount,
                }),
                error: true,
            },
        });
    };

    const handleCreateTempOrder = async () => {
        if (!selectedCartItems.length) {
            console.error("No selected items for temp order.");
            return;
        }

        try {
            setIsLoading(true);
            const orderData = await createTempOrder({
                memberAddr: user?.memberAddr,
                memberAddrDetail: user?.memberAddrDetail,
                memberZipCode: user?.memberZipCode,
                selectedCartItems,
            });

            setOrderData(orderData);
        } catch (error) {
            console.error("Error creating temp order:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>로딩 중...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-16 p-4">
            {/* 배송 정보 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
                <div className="text-sm text-gray-600 text-left">
                    <p>주문자명: {user?.memberName || "정보 없음"}</p>
                    <p>
                        주문자 주소:{" "}
                        {user?.memberAddr && typeof user.memberAddr === "object"
                            ? `${user.memberAddr.memberAddr || ''} ${user.memberAddr.memberAddrDetail || ''} (${user.memberAddr.memberZipCode || ''})`
                            : user?.memberAddr || '주소 정보 없음'}
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">주문 상품</h2>
                {selectedCartItems.length === 0 ? (
                    <p className="text-sm text-gray-600 text-left">주문한 상품이 없습니다.</p>
                ) : (
                    <table className="w-full text-sm border-t border-b border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-2 px-4 text-left">상품 이미지</th>
                                <th className="py-2 px-4 text-left">상품명</th>
                                <th className="py-2 px-4 text-center">수량</th>
                                <th className="py-2 px-4 text-right">가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCartItems.map((item) => (
                                <tr key={item.itemId} className="border-t">
                                    <td className="py-2 px-4">
                                        <img
                                            src={item.files?.[0] || "https://via.placeholder.com/150"}
                                            alt={item.itemName || "상품 이미지"}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{item.itemName || "상품 제목 없음"}</td>
                                    <td className="py-2 px-4 text-center">{item.itemCount || 1}</td>
                                    <td className="py-2 px-4 text-right">
                                        ₩{(item.itemPrice || 0) * (item.itemCount || 1)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">결제</h2>
                <CheckoutPage
                    price={orderAmount}
                    user={user}
                    orderItems={selectedCartItems}
                    onSuccess={handleSuccess}
                    onFail={handleFailure}
                />
            </div>

            <button
                onClick={handleCreateTempOrder}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded"
            >
                임시 주문 생성
            </button>

            {orderData && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-left mb-2">임시 주문 생성 결과</h3>
                    <div className="p-4 border rounded bg-gray-50 text-left">
                        <p><strong>주문 번호:</strong> {orderData.orderId || "정보 없음"}</p>
                        <p><strong>결제 상태:</strong> {orderData.payStatus || "정보 없음"}</p>
                        <p><strong>배송 주소:</strong> {orderData.orderAddress?.memberAddr || "주소 정보 없음"}, {orderData.orderAddress?.memberAddrDetail || ""}</p>
                        <p><strong>총 결제 금액:</strong> ₩{orderData.orderTotalPrice || 0}</p>
                        <h4 className="mt-4 font-semibold">주문 상품</h4>
                        <ul className="list-disc ml-5 mt-2">
                            {orderData.orderItems?.map((item, index) => (
                                <li key={index}>
                                    <p><strong>상품명:</strong> {item.item?.itemName || "상품명 없음"}</p>
                                    <p><strong>수량:</strong> {item.orderCount || 0}</p>
                                    <p><strong>가격:</strong> ₩{item.orderPrice || 0}</p>
                                    <img
                                        src={item.item?.images?.[0]?.uploadImgUrl || "https://via.placeholder.com/150"}
                                        alt={item.item?.itemName || "상품 이미지"}
                                        className="w-16 h-16 object-cover mt-2 rounded"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
