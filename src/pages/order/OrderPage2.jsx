import React, { useEffect, useState, createContext } from "react";

import './OrderPage2.css';

import OrderSection from "../../components/order/OrderSection";
import SectionAddr from "../../components/order/SectionAddr";
import SectionItems from "../../components/order/SectionItems";
import SectionCheckout from "../../components/order/SectionCheckout";
import axios from "axios";
import { IoConstructOutline } from "react-icons/io5";

export const OrderPriceContext = createContext();
const OrderPage2 = () => {
    const [orderPrice, setOrderPrice] = useState(0);
    const [orderItems, setOrderItems] = useState(null);

    useEffect(()=>{
        //body 에 클래스 붙이기
        const $body = document.querySelector("body"); // 단일 요소 선택
        $body.classList.add("OrderPageWrap");
    
        return () => {
            $body.classList.remove("CartPageWrap"); // 정리(cleanup)
        };
    }, []);

    //주문했던 상품 불러오기
    useEffect(()=>{
        setOrderItems(JSON.parse(sessionStorage.getItem("orderItems")));
    }, []);

    //임시 주문서 발급
    useEffect(()=>{
        const requestBody = {
            "orders" : []
        }

        orderItems?.cartItems.forEach(cartItem => {
            requestBody.orders.push({
                itemId: cartItem.item.itemId,
                itemCount:cartItem.itemCount,
                itemName: cartItem.item.itemName
            });
        });
        const fetchOrderTemp = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/api/v1/orders/tempOrder`, // URL
                    requestBody, 
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                const jsonString = JSON.stringify(response.data);
                sessionStorage.setItem("orderTemp", jsonString);
            } catch (err) {
                console.error("주문서 발급 실패 : ", err.response ? err.response.data : err);
            }
        };
        fetchOrderTemp();
    }, [orderItems]);

    return (
        <>
            <OrderPriceContext.Provider value={{orderPrice, setOrderPrice}}>
                <div className="page-wrap OrderPage2">
                    <div className="order-content-wrap">
                        <OrderSection title={`배송지`} content={<SectionAddr/>}/>
                        <OrderSection title={`주문상품`} content={<SectionItems/>}/>
                        <OrderSection title={`결제하기`} content={<SectionCheckout orderPrice={orderPrice}/>}/>
                    </div>
                </div>
            </OrderPriceContext.Provider>
        </>
    )
}

export default OrderPage2;