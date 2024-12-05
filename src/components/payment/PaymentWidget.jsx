import React, { useState } from 'react';
import TossPayments from 'toss-payments';

const PaymentWidget = () => {
  const [paymentReady, setPaymentReady] = useState(false);

  const loadTossPayments = () => {
    const tossPayments = TossPayments('your-toss-api-key'); // 발급받은 API 키 사용

    // 결제 위젯 구성
    tossPayments.requestPayment('카드', {
      orderId: 'order-id-123',  // 주문 ID
      amount: 10000,            // 결제 금액
      orderName: '상품명',      // 결제 상품명
      successUrl: '/success',   // 결제 성공 시 리디렉션 URL
      failUrl: '/fail',         // 결제 실패 시 리디렉션 URL
    }).then((response) => {
      console.log('결제 성공', response);
      setPaymentReady(true);
    }).catch((error) => {
      console.error('결제 실패', error);
    });
  };

  return (
    <div>
      <button onClick={loadTossPayments}>결제하기</button>
      {paymentReady && <div>결제가 완료되었습니다!</div>}
    </div>
  );
};

export default PaymentWidget;
