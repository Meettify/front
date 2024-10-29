import React, { useEffect } from 'react';
import useCartStore from '../../stores/useCartStore';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCartStore();

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니에 담긴 상품이 없습니다.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.itemId} className="flex justify-between mb-4">
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-gray-500">수량: 1</p>
                                <p className="text-sm">{item.price}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.itemId)}
                                className="text-red-500"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;
