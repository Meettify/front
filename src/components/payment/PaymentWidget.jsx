import React, { useState, useEffect } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'; // 새로 import
import { useAuth } from '../../hooks/useAuth'; // 사용자 정보 훅
import { getItemDetail } from '../../api/adminAPI';
import { useParams } from 'react-router-dom'; // React Router의 useParams 훅 추가

const PaymentWidget = () => {
  const { user } = useAuth(); // 사용자 정보 가져오기
  const { itemId } = useParams(); // URL에서 itemId 가져오기
  const [item, setItem] = useState(null);
  const [paymentReady, setPaymentReady] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false); // 결제 진행 중 상태 추가
  const tossSecretKey = import.meta.env.VITE_TOSS_SECRET_KEY;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await getItemDetail(itemId);
        setItem(fetchedItem);
      } catch (error) {
        console.error('상품 정보를 가져오는 중 오류 발생:', error);
        setError('상품 정보를 불러오는 데 문제가 발생했습니다.');
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  // 결제 위젯 초기화
  const initializePaymentWidget = () => {
    if (window.TossPayments) {
      return loadPaymentWidget(tossSecretKey, ANONYMOUS); // TossPayments 위젯 초기화
    } else {
      console.error("TossPayments 위젯이 로드되지 않았습니다.");
      return null;
    }
  };

  const loadTossPayments = async () => {
    if (!item) {
      console.error('상품 정보가 없습니다.');
      return;
    }

    setPaymentLoading(true);

    const tossPaymentsWidget = initializePaymentWidget();

    if (!tossPaymentsWidget) return;

    try {
      // 결제 위젯 호출
      tossPaymentsWidget.show({
        orderId: `order-${item.id}-${user.id}`, // 사용자 및 상품 ID로 고유 주문 ID 생성
        amount: item.itemPrice, // 상품 가격
        orderName: item.itemName, // 상품 이름
        successUrl: `${window.location.origin}/success`, // 성공 시 리디렉션 URL
        failUrl: `${window.location.origin}/fail`, // 실패 시 리디렉션 URL
      });

      console.log('결제 위젯 호출 성공');
      setPaymentReady(true);
    } catch (error) {
      console.error('결제 위젯 호출 실패', error);
      alert('결제 실패: ' + error.message); // 오류 메시지 표시
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!item) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      {error && <p>{error}</p>}  {/* 에러 메시지 표시 */}
      <h1>{item ? item.itemName : '상품을 불러오는 중...'}</h1>
      <p>{item ? `가격: ${item.itemPrice}원` : ''}</p>

      {/* 결제 진행 중 표시 */}
      {paymentLoading && <p>결제 진행 중...</p>}

      {/* 결제 완료 표시 */}
      {paymentReady && <div>결제가 완료되었습니다!</div>}

      <button onClick={loadTossPayments} disabled={paymentLoading}>결제하기</button>
    </div>
  );
};

export default PaymentWidget;
