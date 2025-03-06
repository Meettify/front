import React, { useState, useEffect } from "react";

const CartFloatingArea = React.memo(({cartTotalPrice}) => {
    return (
        <>
            <div className={`list-bottom-area`}>
                <div className="total-price-area">
                    <span>주문 금액</span>
                    <span className='cart-total-price'>{`${cartTotalPrice.toLocaleString()}원`}</span>
                </div>
                <div className="btns-wrap">
                    <button className="btn btn-primary btn-order">주문하기</button>
                </div>
            </div>
        </>
    )
});

export default CartFloatingArea;