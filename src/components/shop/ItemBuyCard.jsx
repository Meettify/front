import { useState } from "react";
import RoundedButton from '../../components/button/RoundedButton'; // 버튼 컴포넌트
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

import "./ItemBuyCard.css";


//판매 중인 상품인지 체크
const checkItemState = (state) =>{
    if(state !== "SELL"){
        alert("현재 판매 중인 상품이 아닙니다.");
        return false;
    }
    return true;
}
//장바구니보다 많은 수량을 입력했을 때, alert 를 띄워야함.
const checkItemCount = (itemCount, userCount) =>{
    if(userCount > itemCount){
        return false;
    }
    return true;
}

const ItemBuyCard = ({itemDetail, itemId}) =>{
    const nav=useNavigate();
    const [itemCount, setItemCount] = useState(1);
    const { isAuthenticated, logout, user } = useAuth();

    //input 핸들러
    const handleItemCount = (e) => {
        if(!checkItemCount(itemDetail.itemCount,itemCount)){
            setItemCount(itemDetail.itemCount);
            e.preventDefault();
            return false;
        }
        setItemCount(e.target.value);
    }

    //수량 추가 버튼
    const handleCountPlus = (e) => {
        if(itemDetail.itemCount == itemCount){
            return;
        }
        if(!checkItemCount(itemDetail.itemCount,itemCount)){
            e.preventDefault();
            setItemCount(itemDetail.itemCount);
            return false;
        }
        
        setItemCount(itemCount+1);
    }

    //수량 감소 버튼
    const handleCountMinus = () => {
        if(itemCount == 1){
            return;
        }
        setItemCount(itemCount - 1);
    }

    //장바구니 버튼
    const handleCartAdd = (e) => {
        const authToken = `${sessionStorage.getItem('accessToken')}`;
        if (!(isAuthenticated && user)) {
            if(confirm("로그인해야 이용할 수 있는 기능입니다. 로그인 화면으로 이동할까요?")){
                nav('/login');
            }
            
            return false;
        }

        if(!checkItemState(itemDetail.itemStatus)){
            e.preventDefault();
            return false;
        }

        if(!checkItemCount(itemDetail.itemCount,itemCount)){
            e.preventDefault();
            setItemCount(itemDetail.itemCount);
            return false;
        }

        const requestBody = {
            "itemId": itemId,
            "itemCount": itemCount
        }
        try {
            const response = axios.post(
                "http://localhost:8080/api/v1/carts",  // URL
                requestBody,  // Body 데이터
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
                        "Content-Type": "application/json"  // JSON 데이터 전송 명시
                    }
                }
            );
            console.log(response.data);
            
            if(confirm("장바구니에 물품을 추가하였습니다. 장바구니로 이동할까요?")){
                nav('/cart');
            }
        } catch (err) {
            console.error("장바구니 추가 실패 : ", err);
        }
    };

    const handleOrderNow = () => {
        if (!itemDetail) {
            alert('상품 정보가 없습니다.');
            return;
        }

        // itemDetail에서 가격과 수량이 존재하는지 확인
        const itemPrice = itemDetail.itemPrice;
        const itemQuantity = itemDetail.itemCount; // 수량은 itemCount로 설정

        if (isNaN(itemPrice) || isNaN(itemQuantity) || itemPrice <= 0 || itemQuantity <= 0) {
            alert('상품 가격 또는 수량 정보가 올바르지 않습니다.');
            return;
        }

        // 단일 상품을 배열로 만들어서 넘기기
        const selectedCartItems = [itemDetail];

        // 결제 금액 계산 (가격 * 수량)
        const totalPrice = itemPrice * itemQuantity; // 단일 상품의 결제 금액 계산

        // 결제 금액이 제대로 계산되었는지 확인
        if (isNaN(totalPrice) || totalPrice <= 0) {
            alert('결제 금액이 계산되지 않았습니다.');
            return;
        }

        // 'order' 페이지로 전달할 때 결제 금액도 함께 넘겨주기
        nav('/order', {
            state: {
                selectedCartItems,
                totalPrice // 결제 금액 전달
            }
        });
    };

    return (
        <div className={`ItemBuyCard ${itemDetail.itemStatus === 'WAIT' ? 'wait' : itemDetail.itemStatus === 'SOLD_OUT' ? 'sold-out' : ''}`}>
            <div className="item-count-area">
                <label className="form-label" htmlFor="">상품 선택 수량</label>
                <div className="select-count-controls">
                    <input 
                        type="number" 
                        name="" 
                        id="" 
                        min={1} 
                        max={itemDetail.itemCount}
                        className='control form-control select-count'
                        value={itemCount}
                        onChange={handleItemCount}
                    />
                    <button onClick={handleCountPlus} className="control btn btn-count-control btn-count-plus">+ 추가</button>
                    <button onClick={handleCountMinus} className="control btn btn-count-control btn-count-minus">- 감소</button>
                </div>
                <div className="order-price-area">
                    <span className="order-label">주문 금액</span>
                    <span className="order-price">{Number(itemCount*itemDetail.itemPrice).toLocaleString()} 원</span>
                </div>
            </div>
            {/* 버튼들 */}
            <div className="btns-wrap">
                <RoundedButton onClick={handleCartAdd} className="btn-item-in btn-cart">
                    장바구니
                </RoundedButton>
                <RoundedButton onClick={handleOrderNow} className="btn-item-in btn-order">
                {`${itemDetail.itemStatus === 'WAIT' ? '상품 준비 중' : itemDetail.itemStatus === 'SOLD_OUT' ? '품절' : '주문하기'}`}
                </RoundedButton>
            </div>
        </div>
    )
}
export default ItemBuyCard;
