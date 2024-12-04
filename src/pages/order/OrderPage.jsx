import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { useAuth } from '../../hooks/useAuth';

const OrderPage = () => {
    const location = useLocation();
    const { state } = location;
    const selectedCartItems = state?.selectedCartItems || [];
    const { user } = useAuth(); // 사용자 정보 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    console.log('주문 페이지 로드 - 전달된 상태:', { selectedCartItems, user }); // 디버깅 로그

    const handlePayment = () => {
        console.log('결제 시도:', { selectedCartItems, user }); // 디버깅 로그
        alert('결제가 완료되었습니다!');
        navigate('/main'); // 메인 페이지로 이동
    };

    return (
        <div className="max-w-2xl mx-auto mt-16 p-4"> {/* border border-gray-200 rounded-md shadow-sm */}
            {/* 배송 정보 */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4 text-left">배송 정보</h2>
                <div className="text-sm text-gray-600 text-left">
                    <p>주문자명: {user?.memberName || '정보 없음'}</p>
                    <p>주문자 핸드폰 번호: {user?.memberPhone || '정보 없음'}</p>
                    <p>
                        주문자 주소: {user?.memberAddr
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
                                <tr key={item.cartItemId} className="border-t">
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
                        <input type="radio" name="payment" className="mr-2" />
                        신용/체크카드
                    </label>
                    <label>
                        <input type="radio" name="payment" className="mr-2" />
                        토스페이
                    </label>
                    <label>
                        <input type="radio" name="payment" className="mr-2" />
                        무통장입금
                    </label>
                </div>
            </div>

            {/* 결제 금액 및 버튼 */}
            <div className="text-right">
                <h3 className="text-xl font-bold">
                    결제 금액: ₩{selectedCartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0)}
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
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
