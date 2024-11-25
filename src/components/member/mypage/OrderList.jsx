import React from 'react';
import useNavigation from '../../../hooks/useNavigation';
import { useMyPage } from '../../../hooks/useMypage';
import { getMyOrderList } from '../../../api/memberAPI';

const OrderList = () => {

    const fetch = async (page = 0, size = 10, sort = 'desc') => {
        try{
            const response = await getMyOrderList();
            console.log(`response : ${response}`)
        } catch (error){
            console.error("Error fetching :", error);
        }
    }

    fetch();
    

    return (
        <div>
            <h2>상품 구매 내역</h2>
            <p>주문한 상품이 없습니다.</p>
        </div>
    )
};

export default OrderList;