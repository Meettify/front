import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../stores/useCartStore';
import { useAuth } from '../../hooks/useAuth';
import { getCartId } from '../../api/cartAPI';

const CartPage = () => {
    const {
        shopItems,
        cartItems,
        fetchShopItems,
        fetchAllCartItems,
        fetchCartById,
        removeFromCart,
        updateCartItemQuantity,
    } = useCartStore();

    const { user } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartId, setCartId] = useState(null); // cartId를 상태로 관리
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.memberEmail) {
            console.error('유효한 이메일이 없습니다. 사용자 정보:', user);
            return;
        }

        // 상품 데이터 로드
        fetchShopItems();

        // 장바구니 ID 가져오기 및 데이터 로드
        const loadCartData = async () => {
            try {
                const fetchedCartId = await getCartId();
                console.log('가져온 장바구니 ID:', fetchedCartId);  // 5가 출력되어야 함
                setCartId(fetchedCartId);

                if (fetchedCartId) {
                    await fetchCartById(fetchedCartId);
                } else {
                    throw new Error('장바구니 ID를 가져오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('장바구니 데이터를 가져오는 데 실패했습니다.', error);
            }
        };

        loadCartData();
    }, [user]); // user가 변경될 때마다 실행


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
            alert('선택된 상품이 없습니다.');
            return;
        }

        const selectedCartItems = selectedItems.map(itemId => {
            const cartItem = cartItems.find(item => item.itemId === itemId);
            const itemDetails = getItemDetails(itemId);
            return {
                ...cartItem,
                ...itemDetails,
            };
        });

        navigate('/order', { state: { selectedCartItems } });
    };
    const getItemDetails = (itemId) => {
        const item = shopItems.find(item => item.itemId === itemId);
        if (!item) {
            console.warn(`Item with ID ${itemId} not found.`);
            return { stock: 0, itemPrice: 0, itemName: 'Unknown', files: [] };
        }
        return item;
    };

    const handleQuantityChange = (cartItemId, increment) => {
        const targetItem = cartItems.find(item => item.cartItemId === cartItemId);
        if (targetItem) {
            const { stock } = getItemDetails(targetItem.itemId);
            const newQuantity = targetItem.quantity + increment;

            if (newQuantity > stock) {
                alert(`재고를 초과할 수 없습니다. 현재 재고: ${stock}`);
                return;
            }

            if (newQuantity < 1) {
                alert('수량은 최소 1개 이상이어야 합니다.');
                return;
            }

            updateCartItemQuantity(cartItemId, newQuantity);
        } else {
            console.error(`Cart item with ID ${cartItemId} not found.`);
        }
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
                                            onClick={() => handleQuantityChange(cartItem.cartItemId, -1)} // 수량 감소
                                            className="px-2 py-1 border rounded-l bg-gray-200"
                                            disabled={cartItem.quantity <= 1} // 수량이 1 이하로 감소하지 않도록 제한
                                        >
                                            -
                                        </button>
                                        <p className="px-4">{cartItem.quantity}</p>
                                        <button
                                            onClick={() => handleQuantityChange(cartItem.cartItemId, 1)} // 수량 증가
                                            className="px-2 py-1 border rounded-r bg-gray-200"
                                            disabled={cartItem.quantity >= getItemDetails(cartItem.itemId).stock} // 재고 초과 방지
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
