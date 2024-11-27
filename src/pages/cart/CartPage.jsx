import React, { useEffect } from 'react';
import useCartStore from '../../stores/useCartStore';

const CartPage = () => {
    const {
        shopItems,
        cartItems,
        fetchAllCartItems,
        fetchShopItems,
        removeFromCart,
        updateCartItemQuantity,
    } = useCartStore();

    useEffect(() => {
        fetchShopItems(); // 상품 데이터 로드
        fetchAllCartItems(); // 장바구니 데이터 로드
    }, []);

    // 상품 ID로 상품 정보 가져오기
    const getItemDetails = (itemId) => {
        const item = shopItems.find(item => item.itemId === itemId);
        return item || {};
    };

    // 총합 계산
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            const { itemPrice } = getItemDetails(cartItem.itemId);
            const parsedPrice = Number(itemPrice || 0); // NaN 방지
            return total + parsedPrice * (cartItem.quantity || 0);
        }, 0);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니에 담긴 상품이 없습니다.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(cartItem => {
                            const { itemName, itemPrice, files } = getItemDetails(cartItem.itemId);
                            const parsedPrice = Number(itemPrice || 0); // NaN 방지

                            return (
                                <li key={cartItem.cartItemId} className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={files?.[0] || 'https://via.placeholder.com/150'}
                                            alt={itemName || '상품 이미지'}
                                            className="w-16 h-16 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <p className="font-semibold">{itemName || '상품 제목 없음'}</p>
                                            <p className="text-sm">₩{parsedPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() =>
                                                updateCartItemQuantity(cartItem.itemId, cartItem.quantity - 1)
                                            }
                                            className="px-2 py-1 border rounded-l bg-gray-200"
                                            disabled={cartItem.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <p className="px-4">{cartItem.quantity}</p>
                                        <button
                                            onClick={() =>
                                                updateCartItemQuantity(cartItem.itemId, cartItem.quantity + 1)
                                            }
                                            className="px-2 py-1 border rounded-r bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="mr-4">
                                            합계: ₩{parsedPrice * (cartItem.quantity || 0)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(cartItem.cartItemId)}
                                            className="text-red-500"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="text-right mt-8">
                        <h3 className="text-xl font-bold">총 합계: ₩{calculateTotalPrice()}</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
