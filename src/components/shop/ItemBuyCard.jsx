import { useState } from "react";
import RoundedButton from '../../components/button/RoundedButton'; // 버튼 컴포넌트
import axios from "axios";
import { useNavigate } from "react-router-dom";



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
        alert("선택 수량이 구매 수량보다 많을 수 없습니다.")
        return false;
    }
    return true;
}

//상태가 WAIT
const ItemBuyCard = ({itemDetail, itemId}) =>{
    const nav=useNavigate();
    const [itemCount, setItemCount] = useState(1);
    const handleItemCount = (e) => {
        setItemCount(e.target.value);
    }
    const handleCartAdd = (e) => {
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
        navigate('/order', {
            state: {
                selectedCartItems,
                totalPrice // 결제 금액 전달
            }
        });
    };

    return (
        <>
            <div>
                <label htmlFor="">선택수량: </label>
                <input 
                    type="number" 
                    name="" 
                    id="" 
                    min={1} 
                    max={itemDetail.itemCount}
                    className='form-control'
                    value={itemCount}
                    onChange={handleItemCount}
                />
            </div>
            {/* 버튼들 */}
            <div className="mt-6 flex gap-5 justify-center">
                
                <RoundedButton onClick={handleCartAdd} className="bg-red-500 hover:bg-red-700 text-white">
                    장바구니
                </RoundedButton>
                <RoundedButton onClick={handleOrderNow} className="bg-red-500 hover:bg-red-700 text-white">
                    주문하기
                </RoundedButton>
            </div>
        </>
    )
}
export default ItemBuyCard;
