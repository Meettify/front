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
        // 결제 로직 추가
        alert('결제가 완료되었습니다!');
        // 결제 완료 후 원하는 페이지로 이동
        navigate('/main');
    };

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">주문 내역</h2>

            {selectedCartItems.length === 0 ? (
                <p>주문한 상품이 없습니다.</p>
            ) : (
                <>
                    <ul>
                        {selectedCartItems.map(item => (
                            <li key={item.cartItemId} className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.files?.[0] || 'https://via.placeholder.com/150'}
                                        alt={item.itemName || '상품 이미지'}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.itemName || '상품 제목 없음'}</p>
                                        <p className="text-sm">₩{item.itemPrice}</p>
                                        <p className="text-sm">수량: {item.quantity}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>합계: ₩{item.itemPrice * item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mb-8 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-xl font-semibold">주문자 정보</h3>
                        <p>이름: {user?.memberName || '정보 없음'}</p>
                        <p>이메일: {user?.memberEmail || '정보 없음'}</p>
                        <p>
                            주소: {user?.memberAddr
                                ? `${user.memberAddr.memberAddr || ''} ${user.memberAddr.memberAddrDetail || ''} (${user.memberAddr.memberZipCode || ''})`
                                : '주소 정보 없음'}
                        </p>
                    </div>

                    <div className="text-right mt-8">
                        <h3 className="text-xl font-bold">
                            총 합계: ₩{selectedCartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0)}
                        </h3>

                        {/* 버튼 그룹 */}
                        <div className="mt-4 space-x-4">
                            <button
                                onClick={() => {
                                    console.log('돌아가기 버튼 클릭'); // 디버깅 로그
                                    navigate('/cart');
                                }} // Cart 페이지로 이동
                                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                돌아가기
                            </button>
                            <button
                                onClick={handlePayment} // 결제 로직
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                결제하기
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export default OrderPage;
