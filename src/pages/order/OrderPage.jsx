import React, { useState, useEffect } from 'react';
import { getCartItems } from '../../api/cartAPI';
import { getMember } from '../../api/memberAPI';
import { createTempOrder } from '../../api/orderAPI';
import paymentAPI from '../../api/paymentAPI';
import { useAuth } from '../../hooks/useAuth';

const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [memberData, setMemberData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);

                // 1. 장바구니 데이터 가져오기
                const items = await getCartItems();
                setCartItems(items);

                // 2. 사용자 정보 가져오기
                const member = await getMember(localStorage.getItem('memberId'));

                // 디버깅용 로그 추가
                console.log('Member Data:', member);  // 실제 API 응답 확인

                // memberAddr가 객체일 경우 내부의 address, detail, zipCode를 분리하여 사용
                if (!member) {
                    console.error('회원 데이터가 없습니다.');  // member가 없다면 에러 출력
                }

                const { memberAddr } = member;
                console.log('Raw memberAddr:', memberAddr);  // memberAddr 값 확인

                let memberAddrString = '주소 정보 없음';  // 기본값을 '주소 정보 없음'으로 설정

                // memberAddr가 객체일 경우 주소 정보 추출
                if (memberAddr && typeof memberAddr === 'object') {
                    const { memberAddr: address, memberAddrDetail, memberZipCode } = memberAddr;
                    memberAddrString = address || '주소 정보 없음';  // 주소가 있으면 사용
                    const memberAddrDetailString = memberAddrDetail || '상세 주소 정보 없음';  // 상세 주소
                    const memberZipCodeString = memberZipCode || '우편번호 정보 없음';  // 우편번호

                    console.log("Processed memberAddr:", memberAddrString);  // memberAddr 값 확인
                    console.log("Processed memberAddrDetail:", memberAddrDetailString);
                    console.log("Processed memberZipCode:", memberZipCodeString);

                    setMemberData({
                        ...member,
                        memberAddr: memberAddrString,  // 주소는 문자열로 저장
                        memberAddrDetail: memberAddrDetailString,  // 상세 주소
                        memberZipCode: memberZipCodeString,  // 우편번호
                    });
                }

                setLoading(false);
            } catch (err) {
                console.error('초기 데이터 로드 실패:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);  // 컴포넌트 마운트 시 데이터 로드


    const handleOrder = async () => {
        try {
            setLoading(true);

            // 3. 임시 주문 생성
            const tempOrder = await createTempOrder(memberData.memberId); // memberId만 넘기도록 수정
            console.log("memberId: ", memberData.memberId);
            // 나머지 결제 로직은 그대로 유지
            const paymentData = {
                itemCount: tempOrder.itemCount,
                impUid: '', // 실제 아임포트 결제 창과 연동 시 설정
                orderUid: tempOrder.orderUid,
                payMethod: 'card', // 결제 방식
                payPrice: tempOrder.totalPrice,
                orders: tempOrder.orders,
                address: {
                    memberAddr: memberData.memberAddr,
                    memberAddrDetail: memberData.memberAddrDetail,
                    memberZipCode: memberData.memberZipCode,
                },
            };

            const result = await paymentAPI.confirmPayment(paymentData);

            // 결제 성공 처리
            alert('결제가 완료되었습니다!');
            console.log('결제 결과:', result);

            setLoading(false);
        } catch (err) {
            console.error('주문 처리 중 오류 발생:', err);
            alert('결제 중 오류가 발생했습니다.');
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;

    return (
        <div>
            <h1>주문 페이지</h1>
            <section>
                <h2>배송 정보</h2>
                {memberData ? (
                    <div>
                        <p>이름: {memberData.memberName}</p>
                        <p>주소: {memberData.memberAddr}</p>  {/* memberAddr 문자열로 출력 */}
                        <p>상세 주소: {memberData.memberAddrDetail}</p>  {/* memberAddrDetail */}
                        <p>우편번호: {memberData.memberZipCode}</p>  {/* memberZipCode */}
                    </div>
                ) : (
                    <p>사용자 정보를 불러오는 중...</p>
                )}
            </section>
            <section>
                <h2>주문 상품</h2>
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={item.cartItemId || index}>
                                <p>상품명: {item.item.itemName}</p>  {/* item.itemName으로 수정 */}
                                <p>수량: {item.itemCount}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>장바구니에 상품이 없습니다.</p>
                )}
            </section>

            {/* 결제 버튼 */}
            <section>
                <button onClick={handleOrder} disabled={loading}>
                    결제하기
                </button>
            </section>
        </div>
    );
};

export default OrderPage;
