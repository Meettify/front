import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 import
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

    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        fetchShopItems(); // 상품 데이터 로드
        fetchAllCartItems(); // 장바구니 데이터 로드
    }, []);

    const getItemDetails = (itemId) => {
        const item = shopItems.find(item => item.itemId === itemId);
        return item || {};
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, itemId) => {
            const cartItem = cartItems.find(cartItem => cartItem.itemId === itemId);
            if (!cartItem) return total;
            const { itemPrice } = getItemDetails(itemId);
            const parsedPrice = Number(itemPrice || 0);
            return total + parsedPrice * (cartItem.quantity || 0);
        }, 0);
    };

    const toggleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleOrder = () => {
        if (selectedItems.length === 0) {
            console.log('주문 불가: 선택된 상품이 없습니다.'); // 디버깅 로그
            alert('선택된 상품이 없습니다.');
            return;
        }

        const selectedCartItems = selectedItems.map(itemId => {
            const cartItem = cartItems.find(item => item.itemId === itemId);
            const itemDetails = getItemDetails(itemId);
            console.log('선택된 상품 디테일:', { cartItem, itemDetails }); // 디버깅 로그
            return {
                ...cartItem,
                ...itemDetails,
            };
        });

        console.log('최종 주문 데이터:', selectedCartItems); // 디버깅 로그
        // OrderPage로 이동하면서 주문 데이터를 전달
        navigate('/order', { state: { selectedCartItems } });
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
                            const parsedPrice = Number(itemPrice || 0);

                            return (
                                <li key={cartItem.cartItemId} className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(cartItem.itemId)}
                                            onChange={() => toggleSelectItem(cartItem.itemId)}
                                            className="mr-4"
                                        />
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
                        <button
                            onClick={handleOrder}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            주문하기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
