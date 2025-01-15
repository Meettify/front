import React, { useState, useEffect } from 'react';
import { getMember } from '../../api/memberAPI';
import { createTempOrder } from '../../api/orderAPI';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CheckoutPage } from '../payment/CheckoutPage';

const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [memberData, setMemberData] = useState(null);
    const [orderAmount, setOrderAmount] = useState(0);
    const [orderId, setOrderId] = useState(null); //
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { memberId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                console.log("Fetching member data...");

                const member = await getMember(localStorage.getItem('memberId'));
                if (!member) throw new Error('회원 정보를 가져오지 못했습니다.');

                const { memberAddr } = member;
                const { memberAddr: address, memberAddrDetail, memberZipCode } = memberAddr || {};
                console.log("Fetched member data:", member);
                setMemberData({
                    ...member,
                    memberAddr: address || '주소 없음',
                    memberAddrDetail: memberAddrDetail || '상세 주소 없음',
                    memberZipCode: memberZipCode || '우편번호 없음',
                });

                // 임시 주문 생성
                const tempOrder = await createTempOrder(memberId);

                // Set orderId from tempOrder
                setOrderId(tempOrder.orderId); // Save orderId from tempOrder
                console.log('Created tempOrder.orderId', tempOrder?.orderId);

                // 임시 주문에서 장바구니 데이터 설정
                setCartItems(tempOrder?.orders || []);
                console.log('Created tempOrder.orders:', tempOrder?.orders);

                const amount = tempOrder.orders.reduce((total, order) => {
                    const itemPrice = order.item?.itemPrice || 0;
                    const orderCount = order.orderCount || 1;
                    return total + itemPrice * orderCount;
                }, 0);

                console.log("Calculated order amount:", amount);
                setOrderAmount(amount);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [memberId]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;
    if (cartItems.length === 0) return <p>장바구니에 상품이 없습니다.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-16 p-4">
            {/* 배송 정보 및 주문 상품 처리 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
                {memberData ? (
                    <div className="text-sm text-gray-600 text-left">
                        <p>주문자명: {memberData.memberName || '정보 없음'}</p>
                        <p>
                            주문자 주소: {memberData.memberAddr} {memberData.memberAddrDetail} ({memberData.memberZipCode})
                        </p>
                    </div>
                ) : (
                    <p>사용자 정보를 불러오는 중...</p>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">주문 상품</h2>
                <table className="w-full text-sm border-t border-b border-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-4 text-left">이미지</th>
                            <th className="py-2 px-4 text-left">상품명</th>
                            <th className="py-2 px-4 text-center">수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((order, index) => (
                            <tr key={index} className="border-t">
                                {/* 이미지 */}
                                <td className="py-2 px-4">
                                    <img
                                        src={order.item?.images?.[0]?.uploadImgUrl || 'https://via.placeholder.com/150'}
                                        alt={order.item?.itemName || '상품 이미지 없음'}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>

                                {/* 상품명 */}
                                <td className="py-2 px-4">
                                    {order.item?.itemName || '상품명 없음'}
                                </td>

                                {/* 수량 */}
                                <td className="py-2 px-4 text-center">
                                    {order.orderCount || 1}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CheckoutPage
                price={orderAmount}
                user={memberData}
                orderItems={cartItems}
                orderId={orderId}
            />

        </div>
    );
};

export default OrderPage;
