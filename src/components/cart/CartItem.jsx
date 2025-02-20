
import React, { useEffect, useState, createContext, useContext} from 'react';
import { getItemDetail } from '../../api/adminAPI';
import "./CartItem.css";
import {CartTotalPriceContext} from "../../pages/cart/CartPage"

import categories from '../../stores/shopCategory';
import ItemCountArea from './ItemCountArea'

export const ItemTotalPriceContext = createContext();

const CartItem = React.memo(({itemId, itemCount, cartId}) => {
    const {changeItemPrice, cartCheckList, changeCheckList} = useContext(CartTotalPriceContext);

    const [itemDetail, setItemDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [itemTotalPrice,setItemTotalPrice] = useState(0);
    
    const handleCheck = (e) => {
        changeCheckList(itemId, !cartCheckList.get(itemId));
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await getItemDetail(itemId); // 상품 상세 정보 가져오기
                setItemDetail(item);
            } catch (error) {
                setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    useEffect(() => {
        const foundCategory = categories.find(cat => 
            cat.id.toUpperCase() === itemDetail?.itemCategory.toUpperCase()
        );
        setCategory(foundCategory);
        //console.log("데이터", itemDetail);
    }, [itemDetail]);

    useEffect(() => {
        if(cartCheckList.get(itemId)){
            changeItemPrice(itemId, itemTotalPrice);
        }else{
            changeItemPrice(itemId, 0);
        }
        console.log(cartCheckList.get(itemId), itemTotalPrice);
    }, [itemId, itemTotalPrice, cartCheckList]);

    //처음 셋팅
    useEffect(() => {
        changeCheckList(itemId, true);
    }, [itemId]);

    

    return (
        <>
        <ItemTotalPriceContext.Provider value={{itemTotalPrice,setItemTotalPrice}}>
            <div className={`CartItem category-${category?.id.toLowerCase()}-wrap`}>
                <div className="custom-check-wrap circle-check-wrap all-check-wrap">
                    <input 
                    type="checkbox" 
                    name="" 
                    id={`check${itemId}`}
                    checked={cartCheckList.get(itemId)}
                    onChange={handleCheck}
                    />
                    <label htmlFor={`check${itemId}`}></label>
                </div>
                <span className="img-wrap">
                    <img
                        src={`${itemDetail?.images[0]}`}
                        alt={''}
                    />
                </span>
                <span className='item-info-area'>
                    <div className='label-area'>
                        <div className={`label category`}>
                            <span className="icon-wrap">{category?.icon()}</span>
                            <span className='category-name'>{itemDetail?.itemCategory}</span>
                        </div>
                        <p className={`label status ${itemDetail?.itemStatus === 'WAIT' ? 'status-wait' : itemDetail?.itemStatus === 'SOLD_OUT' ? 'status-sold-out' : ''}`}>
                            {itemDetail?.itemStatus}
                        </p>
                    </div>
                    <div className="text-area">
                        <span className="item-status"></span>
                        <span className="item-name">{`${itemDetail?.itemName}`}</span>
                        <span className="item-price">{`${Number(itemDetail?.itemPrice).toLocaleString()}원`}</span>
                        <span className="item-store-count">{`남은수량 ${itemDetail?.itemCount}`}</span>
                        <ItemCountArea itemMaxCount={itemDetail?.itemCount} itemCount={itemCount} itemPrice={itemDetail?.itemPrice} cartId={cartId} itemId={itemDetail?.itemId}/>
                    </div>
                </span>
                <div className="item-total-price">
                    {`${itemTotalPrice.toLocaleString()}원`}
                </div>
            </div>
        </ItemTotalPriceContext.Provider>
        </>
    )
});

export default CartItem;