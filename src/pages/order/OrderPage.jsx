import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CheckoutPage } from "../../components/payment/CheckoutPage";
import { getItemList } from "../../api/adminAPI"; // 상품 조회 API
import { createTempOrder } from "../../api/orderAPI";

const OrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const { user } = useAuth();
    const navigate = useNavigate();

    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const [orderAmount, setOrderAmount] = useState(0);

    useEffect(() => {
        if (state?.selectedCartItems) {
            setSelectedCartItems(state.selectedCartItems);
            const amount = state.selectedCartItems.reduce(
                (total, item) => total + item.itemPrice * item.quantity,
                0
            );
            setOrderAmount(amount);
        } else {
            getItemList(1, 10)
                .then((items) => {
                    setSelectedCartItems(items);
                    const amount = items.reduce(
                        (total, item) => total + item.itemPrice * item.quantity,
                        0
                    );
                    setOrderAmount(amount);
                })
                .catch((error) => console.error("Error fetching items:", error));
        }
    }, [state]);

    const handleSuccess = async (response) => {
        try {
            const { paymentKey, orderId, amount } = response;
            const data = {
                orderId,
                amount,
                paymentKey,
                orders: selectedCartItems.map((item) => ({
                    itemId: item.itemId,
                    itemCount: item.quantity,
                })),
                memberAddr: user?.memberAddr || "",
                memberAddrDetail: user?.memberAddrDetail || "",
                memberZipCode: user?.memberZipCode || "",
            };

            await createTempOrder(data.orders, {
                memberAddr: user?.memberAddr || "",
                memberAddrDetail: user?.memberAddrDetail || "",
                memberZipCode: user?.memberZipCode || "",
            });

            navigate(`/success?orderId=${orderId}&amount=${amount}`);
        } catch (error) {
            handleFailure(error);
        }
    };

    const handleFailure = (error) => {
        navigate(`/fail?message=${encodeURIComponent(error.message || "Payment failed")}`);
    };

    return (
        <div className="max-w-2xl mx-auto mt-16 p-4">
            {/* 배송 정보 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
                <div className="text-sm text-gray-600 text-left">
                    <p>주문자명: {user?.memberName || "정보 없음"}</p>
                    <p>주문자 핸드폰 번호: {user?.memberPhone || "정보 없음"}</p>
                    <p>
                        주문자 주소:{" "}
                        {user?.memberAddr
                            ? `${user.memberAddr.memberAddr || ''} ${user.memberAddr.memberAddrDetail || ''} (${user.memberAddr.memberZipCode || ''})`
                            : '주소 정보 없음'}

                    </p>
                </div>
            </div>

            {/* 주문 상품 */}
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
                                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                                    <td className="py-2 px-4 text-right">₩{item.itemPrice * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 결제 */}
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
        </div>
    );
};

export default OrderPage;
