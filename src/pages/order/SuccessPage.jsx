import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ResultPage.css";
import { useAuth } from "../../hooks/useAuth";

const SuccessPage = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const param_orderId = searchParams.get("orderId");
    const param_paymentKey = searchParams.get("paymentKey");
    const param_amount = Number(searchParams.get("amount"));

    const [orderTemp, setOrderTemp] = useState(null);

    useEffect(()=>{
        //주문했던 상품 불러오기
        setOrderTemp(JSON.parse(sessionStorage.getItem("orderTemp")));
    }, []);

    //날짜 형식 맞추기
    const nowFormatData = ()=>{
        const now = new Date();
    
        // 로컬(한국) 시간 기준으로 포맷
        const dateStr = now.toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace(' ', 'T');
    
        // 타임존(XXX) 추가
        const offset = now.getTimezoneOffset() / -60;
        const timezone = (offset >= 0 ? '+' : '-') + String(Math.abs(offset)).padStart(2, '0') + ':00';
    
        const formattedDate = `${dateStr}${timezone}`;
        return formattedDate; // "2025-02-24T12:34:56+09:00"
    }
      
    useEffect(()=>{
        console.log(orderTemp);
    }, [orderTemp]);

    
    //백엔드에 데이터 전달
    useEffect(()=>{
        const requestBody = {
            tossOrderId : param_orderId,
            amount : Number(param_amount),
            requestedAt: sessionStorage.getItem("requestOrderTime"),
            approvedAt: nowFormatData(new Date()),
            paymentKey : param_paymentKey,
            orderUid : param_orderId,
            orders : []
        }
        
        orderTemp?.orderItems.forEach(orderItems => {
            requestBody.orders.push({
                itemId: orderItems.item.itemId,
                itemCount:orderItems.orderCount,
                itemName: orderItems.item.itemName
            });
        });
            
        const fetchPayData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/v1/payment/toss/confirm",  // URL
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
                            "Content-Type": "application/json"  // JSON 데이터 전송 명시
                        }
                    }
                );
                console.log("일단 결제 확인");
                console.log(response.data);
            } catch (err) {
                console.error("결제데이터 전송 실패 : ", err);
            }
        }
        fetchPayData();
    }, [orderTemp]);

    return(
        <>
            <div className="page-wrap result-area success-page">
                <p className="title">결제가 성공적으로 이루어졌습니다</p>
            
                <div className="order-detail-area">
                    <div className="order-detail-top">
                        <p>{`주문번호:${param_orderId}`}</p>
                    </div>
                    <div className="order-detail-content">
                        <div className="order-customer-info order-section">
                            <p className="sub-title">주문자 정보</p>
                            <table className="table">
                                <colgroup>
                                    <col className="w-100"/>
                                    <col />
                                </colgroup>
                                <tr>
                                    <th>성명</th>
                                    <td>{user?.memberName}</td>
                                </tr>
                                <tr>
                                    <th>닉네임</th>
                                    <td>{user?.nickName}</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>{user?.memberEmail}</td>
                                </tr>
                                <tr>
                                    <th rowSpan={2}>배송지</th>
                                    <td>
                                    <span>{`(${user?.memberAddr.memberZipCode})${user?.memberAddr.memberAddr}`}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span>{`${user?.memberAddr.memberAddrDetail}`}</span></td>
                                </tr>
                            </table>
                        </div>
                        <div className="order-item-list order-section">
                            <p className="sub-title">주문 상품 정보</p>
                            <div className="list-wrap">
                                {orderTemp?.orderItems.map(orderItem => (
                                <div className="order-item" key={orderItem.item.itemId}>
                                    <div className="img-wrap">
                                    {orderItem.item.images.length !== 0?
                                        <img src={orderItem.item.images[0]} alt="" /> :
                                        <span className="no-img">이미지 없음</span>
                                    }
                                    </div>
                                    <div className="order-info-wrap">
                                        <span className="item-name">{orderItem.item.itemName}</span>
                                        <span className="item-price">{orderItem.item.itemPrice?.toLocaleString()}원</span>
                                        <span className="item-count">수량: {orderItem.orderCount}개</span>
                                    </div>
                                    <div className="item-total-wrap">
                                        <span className="item-total-price">{`${(orderItem?.item.itemPrice * orderItem?.orderCount).toLocaleString()}`}원</span>
                                    </div>
                                </div>     
                                ))}
                            </div>
                        </div>
                        <div className="all-price-area">
                            <span className="label">총 금액</span>
                            <span className="price">{param_amount?.toLocaleString()}원</span>
                        </div>
                        <div className="btns-wrap">
                            <Link className="btn btn-primary" to={`/mypage/orderList`}>주문내역으로</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SuccessPage;