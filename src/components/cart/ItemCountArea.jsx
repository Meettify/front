import React,{ useContext, useEffect, useState } from "react";
import {ItemTotalPriceContext} from "./CartItem";
import axios from "axios";

const ItemCountArea = React.memo(({itemMaxCount, itemCount, itemPrice, cartId, itemId}) => {
    const {setItemTotalPrice} = useContext(ItemTotalPriceContext);
    const [currentItemCount, setCurrentItemCount] = useState(itemCount);

    const setItemCountDB = (count) => {
        if(cartId == 0){
            return false;
        }
        try {
            const response = axios.put(
                "http://localhost:8080/api/v1/carts/"+cartId,  // URL
                [{
                    "itemId": itemId,
                    "itemCount":count
                }],  // Body 데이터
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // JWT 토큰 추가
                        "Content-Type": "application/json"  // JSON 데이터 전송 명시
                    }
                }
            );
        } catch (err) {
            console.error("장바구니 수량 변환 실패 : ", err);
        }
    }

    const newItemTotalPrice = (count, price) => {
        setItemTotalPrice(count * price);
    }

    const handleItemCount = (e) => {
        setCurrentItemCount(e.target.value); 
    }

    //수량 추가 버튼
    const handleCountPlus = () => {
        if(itemMaxCount == currentItemCount){
            return;
        }
        
        setCurrentItemCount(currentItemCount + 1);
    }

    //수량 감소 버튼
    const handleCountMinus = () => {
        if(currentItemCount == 1){
            return;
        }
        setCurrentItemCount(currentItemCount - 1);
    }
    
    useEffect(()=>{
        setCurrentItemCount(itemCount);
    }, [itemCount]);
    
    useEffect(()=>{
        setItemCountDB(currentItemCount);
    }, [currentItemCount]);

    useEffect(() => {
        newItemTotalPrice(currentItemCount, itemPrice);
    }, [currentItemCount, itemPrice]);


    return (
        <>
            <div className="ItemCountArea">
            <input 
                type="number" 
                name="" 
                id="" 
                min={1} 
                max={itemMaxCount}
                className='control form-control select-count'
                value={currentItemCount}
                onChange={handleItemCount}
            />
            <button onClick={handleCountPlus} className="control btn btn-count-control btn-count-plus">+ 추가</button>
            <button onClick={handleCountMinus} className="control btn btn-count-control btn-count-minus">- 감소</button>
            </div>
        </>
    )
});

export default ItemCountArea;