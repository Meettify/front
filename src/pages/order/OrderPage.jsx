import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CheckoutPage } from "../../components/payment/CheckoutPage";
import { getItemList } from "../../api/adminAPI";
import { createTempOrder } from "../../api/orderAPI";
import useOrderStore from "../../stores/useOrderStore"; // 추가

const OrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const { user } = useAuth();
    const navigate = useNavigate();
    const { createOrder, orderData, setOrderData } = useOrderStore(); // store에서 createOrder와 orderData, setOrderData 가져오기
    console.log("Order data in component:", orderData);

    const [selectedCartItems, setSelectedCartItems] = useState([]); // 초기값을 빈 배열로 설정
    const [orderAmount, setOrderAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

    useEffect(() => {
        console.log("Location state:", state); // location state 확인
        if (state?.selectedCartItems) {
            console.log("State has selectedCartItems:", state.selectedCartItems); // state에서 selectedCartItems 확인
            setSelectedCartItems(state.selectedCartItems);
            const amount = state.selectedCartItems.reduce(
                (total, item) => total + (item.itemPrice * (item.itemCount || 1)),
                0
            );
            setOrderAmount(amount);
            console.log("Calculated order amount from state:", amount); // 계산된 금액 확인
        } else {
            console.log("State does not have selectedCartItems. Fetching items from API..."); // state에 selectedCartItems 없을 때
            getItemList(1, 10)
                .then((items) => {
                    console.log("Fetched items from API:", items); // API에서 받은 상품 데이터
                    setSelectedCartItems(items);
                    const amount = items.reduce((total, item) => {
                        const price = item.itemPrice || 0;
                        const count = item.itemCount || 1;
                        return total + price * count;
                    }, 0);
                    setOrderAmount(amount);
                    console.log("Calculated order amount from API items:", amount); // API로부터 받은 상품의 계산된 금액
                })
                .catch((error) => console.error("Error fetching items from API:", error)); // API 호출 오류
        }
    }, [state]); // state 변경 시마다 실행됨

    useEffect(() => {
        console.log("Selected cart items:", selectedCartItems);
    }, [selectedCartItems]);

    useEffect(() => {
        console.log("Updated orderData:", orderData);  // 상태 업데이트 확인
    }, [orderData]);  // orderData가 변경될 때마다 실행


    if (selectedCartItems.length === 0) {
        return <p>로딩 중...</p>; // 데이터가 로드되기 전에 로딩 메시지 표시
    }

    const isUserInfoValid = user?.memberAddr && user?.memberAddrDetail && user?.memberZipCode;

    const handleSuccess = async (response) => {
        console.log("Payment success response:", response);

        if (!isUserInfoValid) {
            alert("배송 정보가 부족합니다. 주소를 입력해주세요.");
            return;
        }

        try {
            const { paymentKey, orderId, amount } = response;
            const data = {
                orders: selectedCartItems.map((item) => ({
                    itemId: item.itemId,
                    itemCount: item.itemCount || 1,
                    itemName: item.itemName || "상품명 없음",
                })),
                memberAddr: user?.memberAddr,
                memberAddrDetail: user?.memberAddrDetail,
                memberZipCode: user?.memberZipCode,
            };

            console.log("Data to send to createTempOrder API:", data.orders);

            // createOrder 호출 후, 그 결과를 콘솔에 출력
            const result = await createOrder({
                memberAddr: user?.memberAddr,
                memberAddrDetail: user?.memberAddrDetail,
                memberZipCode: user?.memberZipCode,
            });

            console.log("Response from createOrder:", result);  // result 출력

            // 주문 정보가 정상적으로 생성된 후, 상태에 반영
            if (result) {
                console.log("Created order:", result);
                navigate(`/success`, {
                    state: {
                        orderId: result.orderId, // 서버에서 받은 실제 주문 ID로 설정
                        amount: orderAmount,
                        items: selectedCartItems,
                        successMessage: "결제가 성공적으로 완료되었습니다."
                    }
                });
            } else {
                console.error("Order creation failed.");
            }

        } catch (error) {
            console.error("Error creating order:", error);
            handleFailure(error);
        }
    };

    const handleFailure = (error) => {
        console.error("결제 실패:", error);
        const errorMessage = error.message || "결제 실패";
        const orderDetails = encodeURIComponent(JSON.stringify({
            items: selectedCartItems,
            totalAmount: orderAmount,
        }));
        navigate(`/fail`, {
            state: { message: errorMessage, orderDetails, error: true }
        });
    };

    // 임시 주문 버튼 클릭 시 호출할 함수
    const handleCreateTempOrder = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            const orderData = await createTempOrder({
                memberAddr: user?.memberAddr,
                memberAddrDetail: user?.memberAddrDetail,
                memberZipCode: user?.memberZipCode,
            });

            console.log("임시 주문 생성 결과:", orderData); // 임시 주문 데이터 콘솔 출력

            // 상태에 임시 주문 데이터 반영
            setOrderData(orderData);

        } catch (error) {
            console.error("임시 주문 생성 오류:", error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

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
                                            src={item.files && item.files.length > 0 ? item.files[0] : "https://via.placeholder.com/150"}
                                            alt={item.itemName || "상품 이미지"}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{item.itemName || "상품 제목 없음"}</td>
                                    <td className="py-2 px-4 text-center">{item.itemCount || 1}</td> {/* itemCount가 없으면 1로 기본 설정 */}
                                    <td className="py-2 px-4 text-right">
                                        ₩{(item.itemPrice && item.itemCount) ? item.itemPrice * item.itemCount : 0}
                                    </td>
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

            {/* 임시 주문 생성 버튼 */}
            <button
                onClick={handleCreateTempOrder}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded"
            >
                임시 주문 생성
            </button>

            {isLoading && <p>임시 주문 생성 중...</p>} {/* 로딩 중 메시지 */}

            {orderData ? (
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
            ) : (
                <p className="text-center mt-4">임시 주문 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default OrderPage;
