import React, { useState, useEffect, createContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './CartPage.css';
import { useNavigate } from "react-router-dom";

import CartItem from '../../components/cart/CartItem';
import axios from "axios";

export const CartTotalPriceContext = createContext();

const CartPage = () => {
    const [cartTotalPrice, setCartTotalPrice] = useState(0);            //장바구니 총 금액
    const [cartItemList, setCartItemList] = useState([]);               //카트 아이템 리스트
    const [cartItemPrices, setCartItemPrices] = useState(new Map());    //아이템별 총 금액(금액 * 수량)
    const [cartCheckList, setCartCheckList] = useState(new Map());      //아이템 체크상태인지
    const [cartId, setCartId] = useState(0);                            //카트 아이디
    const { user } = useAuth();                                         //유저
    const [isChecked, setIsChecked] = useState(true);                   //전체 선택 체크박스     
    const navigate = useNavigate();                                     // useNavigate() 훅 사용                  
    

    useEffect(() => {
        const $body = document.querySelector("body"); // 단일 요소 선택
        $body.classList.add("CartPageWrap");
    
        return () => {
            $body.classList.remove("CartPageWrap"); // 정리(cleanup)
        };

    }, []);

    //카트 아이디 셋팅
    useEffect(()=>{
        const getCartId = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/carts/id`, // URL
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                setCartId(response.data);
            } catch (err) {
                console.error("카트 아이디 조회 실패 : ", err.response ? err.response.data : err);
            }
        };

        getCartId();
    }, [user])

    //카트 리스트 셋팅
    const getCartList = async ()=>{
        if(cartId > 0){
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/carts/${cartId}`, // URL
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                const updatedItems = response.data.cartItems;
                setCartItemList(updatedItems);
            } catch (err) {
                console.error("장바구니 상품 조회 실패 : ", err.response ? err.response.data : err);
            }
        }
    }
    
    //초기 로딩시 카트 아이템 가져오고 셋팅
    useEffect(()=>{
        getCartList();
    }, [user, cartId]);
    
    //아이템 가격들 변환(수량 * 기존 아이템 가격)
    const changeItemPrice = (key, value) => {
        setCartItemPrices(prevMap => {
            const newMap = new Map(prevMap); // 새로운 Map 생성 (불변성 유지)
            newMap.set(key, value); // 데이터 추가
            return newMap; // 새로운 Map을 상태로 설정
        });
    };

    //체크리스트 변환
    const changeCheckList = (key, value) => {
        setCartCheckList(prevMap => {
            const newMap = new Map(prevMap); // 새로운 Map 생성 (불변성 유지)
            newMap.set(key, value); // 데이터 추가
            return newMap; // 새로운 Map을 상태로 설정
        });
    };

    // 모든 value 가 true인지 확인하는 함수
    const areAllTrue = () => {
        return Array.from(cartCheckList.values()).every(value => value === true);
    };

    // 모든 value를 반전시키는 함수
    const toggleAll = () => {
        const newValue = !areAllTrue(); // 현재 모든 값이 true면 false로, 아니면 true로 설정

        setCartCheckList(prevMap => {
            const newMap = new Map();
            prevMap.forEach((_, key) => {
                newMap.set(key, newValue);
            });
            return newMap;
        });
    };

    //전체 선택
    const handleAllCheck = (e) => {
        setIsChecked(!isChecked);
        toggleAll();
    }

    //개별로 전체 선택하면 자동으로 선택 외에는 선택 풀기
    useEffect(()=>{
        if(areAllTrue()){
            setIsChecked(true);
        }else{
            setIsChecked(false);
        }
    },[cartCheckList]);

    //체크리스트 맵에서 true 인 값들의 키 배열을 반환
    const getKeysWithTrueValue = () => {
        return [...cartCheckList.entries()]
        .filter(([_, value]) => value === true) // value가 true인 것만 필터링
        .map(([key]) => key); // key만 추출
    };

    //맵에서 키 배열을 받아 해당 키들을 삭제하는 함수
    const removeKeysFromMap = (map, keys) => {
        const newMap = new Map(map);
        keys.forEach((key) => newMap.delete(key)); // 배열을 순회하며 삭제
        return newMap;
    };

    //백엔드에서 키값을 매개변수로 받아 삭제하는 함수
    const deleteItemInCart = async (cartItemId) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/v1/carts/${cartItemId}`, // URL
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json"
                    },
                    data: {} // 일부 서버에서는 DELETE 요청에도 body를 요구함
                }
            );
            console.log("삭제 성공", response.data);
        } catch (err) {
            console.error("장바구니에서 상품 삭제 실패 : ", err.response ? err.response.data : err);
        }
    };

    //선택된 아이템 삭제
    const handleBtnChkDelete = async () => {
        //선택된 아이템의 itemId 값들의 배열
        const trueCheckList = getKeysWithTrueValue();

        //cartItemId 값들의 배열
        
        const cartItemIds = cartItemList
        .map(cartItem => cartItem.cartItemId);


        //가격 리스트 맵에서 삭제
        removeKeysFromMap(cartItemPrices, trueCheckList);

        //체크 리스트 맵에서 삭제
        removeKeysFromMap(cartCheckList, trueCheckList);

        //백엔드에서 삭제
        cartItemIds.forEach(key => deleteItemInCart(key));

        //카트 리스트 다시 데이터 로드
        getCartList();

        //새로고침
        window.location.reload();
    }

    // 카트 주문 총액 계산
    useEffect(()=>{
        setCartTotalPrice(Array.from(cartItemPrices.values()).reduce((acc, value) => acc + value, 0));
    }, [cartItemPrices]);


    //주문하기로 보내는 데이터
    const sendOrderData = () => {
        //선택된 아이템의 itemId 값들의 배열
        const trueCheckList = getKeysWithTrueValue();

        const jsonData = {   
            //체크한 아이템 정보
            "cartItems" : cartItemList.filter(cartItem => trueCheckList.includes(cartItem.item.itemId)),
            
            //주문 총액
            "cartTotalPrice" : cartTotalPrice
        }
        jsonData.cartItems.forEach(item => 
            item.itemTotalPrice = item.itemCount * item.itemPrice
        );
        
        const jsonString = JSON.stringify(jsonData);
        sessionStorage.setItem("orderItems", jsonString);
        
        navigate("/order");
    };

    return (
        <CartTotalPriceContext.Provider value={{cartItemPrices, changeItemPrice, changeCheckList, cartCheckList}}>
        <div className='page-wrap CartPage'>
            <h2>장바구니</h2>
            <div className='cart-list-wrap'>
                <div className="list-top-area">
                    <div className="list-top-left">
                        <div className="custom-check-wrap circle-check-wrap all-check-wrap">
                            <input
                            type="checkbox"
                            name=""
                            id="allCheck"
                            checked={isChecked}
                            onChange={handleAllCheck}
                            />
                            <label htmlFor="allCheck"><span className='text'>전체 선택</span></label>
                        </div>
                    </div>
                    <div className="list-top-right">
                        <button 
                        className="btn btn-text btn-chk-delete"
                        onClick={handleBtnChkDelete}
                        >선택 삭제</button>
                    </div>
                </div>
                <div className="list-content-area">
                {cartItemList.length === 0? (
                    <p>장바구니에 담긴 상품이 없습니다.</p>
                ) : (
                    <>
                        {cartItemList.map(cartItem => {
                            return(
                                <>
                                    <div key={cartItem.cartId}>
                                        <CartItem itemId={cartItem.item.itemId} itemCount={cartItem.itemCount} cartId={cartId}/>
                                    </div>
                                </>
                            )
                        })}
                    </>
                )}
                </div>
                <div className="list-bottom-area">
                    <div className="total-price-area">
                        <span className='label'>주문 금액</span>
                        <span className='cart-total-price'>{`${cartTotalPrice.toLocaleString()}원`}</span>
                    </div>
                    <div className="btns-wrap">
                        <button className="btn btn-primary btn-order" onClick={sendOrderData}>주문하기</button>
                    </div>
                </div>
            </div>
        </div>
        </CartTotalPriceContext.Provider>
    );
};

export default CartPage;