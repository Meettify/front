import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import paymentAPI from '../../api/paymentApi';
import usePaymentStore from '../../stores/usePaymentStore';

const OrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const selectedCartItems = state?.selectedCartItems || [];
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState(''); // 결제 수단 상태
    const { isLoading, setLoading, setPaymentResult } = usePaymentStore(); // Zustand 스토어

    console.log('주문 페이지 로드 - 전달된 상태:', { selectedCartItems, user });

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert('결제 수단을 선택해주세요.');
            return;
        }

        const orderUid = `order-${Date.now()}`;
        const orderAmount = selectedCartItems.reduce(
            (total, item) => total + item.itemPrice * item.quantity,
            0
        );

        const requestData = {
            pay: {
                itemCount: selectedCartItems.length,
                impUid: `imp-${Date.now()}`,
                orderUid,
                payMethod: paymentMethod,
                payPrice: orderAmount,
                orders: selectedCartItems.map((item) => ({
                    itemId: item.itemId,
                    itemCount: item.quantity,
                })),
            },
            address: {
                memberAddr: user?.memberAddr?.memberAddr || '주소 없음',
                memberAddrDetail: user?.memberAddr?.memberAddrDetail || '상세 주소 없음',
                memberZipCode: user?.memberAddr?.memberZipCode || '우편번호 없음',
            },
        };

        console.log('결제 요청 데이터:', requestData);

        try {
            setLoading(true);
            const result = await paymentAPI.iamportConfirm(requestData);
            console.log('결제 성공 응답 데이터:', result);

            // 결제 상태 확인
            await checkPaymentStatus(orderUid, paymentMethod);

            setPaymentResult(result);
            alert('결제가 완료되었습니다!');
            navigate('/main');
        } catch (error) {
            console.error('결제 실패:', error);
            alert('결제 처리 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const checkPaymentStatus = async (orderUid, paymentMethod) => {
        try {
            let status;
            if (paymentMethod === 'toss') {
                status = await paymentAPI.tossPayStatus(orderUid);
            } else if (paymentMethod === 'iamport') {
                status = await paymentAPI.iamportStatus(orderUid);
            } else {
                throw new Error('잘못된 결제 수단입니다.');
            }

            console.log('결제 상태:', status.data); // 응답 데이터 로그
            alert(`결제 상태 조회 성공: ${JSON.stringify(status.data)}`);
        } catch (error) {
            console.error('결제 상태 조회 실패:', error);
            alert('결제 상태 조회 중 오류가 발생했습니다.');
        }
    };


    return (
        <div className="max-w-2xl mx-auto mt-16 p-4">
            {/* 배송 정보 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
                <div className="text-sm text-gray-600 text-left">
                    <p>주문자명: {user?.memberName || '정보 없음'}</p>
                    <p>주문자 핸드폰 번호: {user?.memberPhone || '정보 없음'}</p>
                    <p>
                        주문자 주소:{' '}
                        {user?.memberAddr
                            ? `${user.memberAddr.memberAddr || ''} ${user.memberAddr.memberAddrDetail || ''
                            } (${user.memberAddr.memberZipCode || ''})`
                            : '주소 정보 없음'}
                    </p>
                </div>
            </div>

            {/* 주문 상품 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">주문 상품</h2>
                {selectedCartItems.length === 0 ? (
                    <p className="text-sm text-gray-600 text-left">
                        주문한 상품이 없습니다.
                    </p>
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
                                <tr
                                    key={item.cartItemId}
                                    className="border-t"
                                >
                                    <td className="py-2 px-4">
                                        <img
                                            src={item.files?.[0] || 'https://via.placeholder.com/150'}
                                            alt={item.itemName || '상품 이미지'}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{item.itemName || '상품 제목 없음'}</td>
                                    <td className="py-2 px-4 text-center">{item.quantity}</td>
                                    <td className="py-2 px-4 text-right">₩{item.itemPrice * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 결제 수단 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">결제 수단</h2>
                <div className="flex items-center space-x-4 text-left">
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            className="mr-2"
                            value="toss"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        토스페이
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            className="mr-2"
                            value="iamport"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        아임포트
                    </label>
                </div>
            </div>

            {/* 결제 금액 및 버튼 */}
            <div className="text-right">
                <h3 className="text-xl font-bold">
                    결제 금액: ₩
                    {selectedCartItems.reduce(
                        (total, item) => total + item.itemPrice * item.quantity,
                        0
                    )}
                </h3>

                <div className="mt-4 space-x-4">
                    <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        돌아가기
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className={`px-6 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                    >
                        {isLoading ? '처리 중...' : '결제하기'}
                    </button>
                    <button
                        onClick={() => checkPaymentStatus(`order-${Date.now()}`, paymentMethod)} // orderUid는 실제 데이터로 대체 필요
                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        결제 상태 조회
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;
