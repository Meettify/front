import React from 'react';
import useCartStore from '../../stores/useCartStore';

const CartPage = () => {
    const { cartItems, updateCartItemQuantity, removeFromCart } = useCartStore();

    // 총 가격 계산
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니에 담긴 상품이 없습니다.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.itemId} className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm">₩{item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            updateCartItemQuantity(item.itemId, item.quantity - 1)
                                        }
                                        className="px-2 py-1 border rounded-l bg-gray-200"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <p className="px-4">{item.quantity}</p>
                                    <button
                                        onClick={() =>
                                            updateCartItemQuantity(item.itemId, item.quantity + 1)
                                        }
                                        className="px-2 py-1 border rounded-r bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="flex items-center">
                                    <p className="mr-4">
                                        합계: ₩{item.price * item.quantity}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.itemId)}
                                        className="text-red-500"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="text-right mt-8">
                        <h3 className="text-xl font-bold">
                            총 합계: ₩{calculateTotalPrice()}
                        </h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
