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
    const [cartId, setCartId] = useState(null); // cartId 상태 관리
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

        loadCartData(); // 여기서 호출

    }, [user]); // user가 변경될 때마다 실행

    // 총 합계 계산 (itemCount와 itemPrice를 기반으로)
    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, itemId) => {
            const cartItem = cartItems.find(cartItem => cartItem.itemId === itemId);
            if (!cartItem) return total;

            const { itemPrice } = getItemDetails(itemId);
            console.log('Item details for itemId:', itemId, 'Price:', itemPrice);  // 각 아이템의 가격 출력

            const parsedPrice = Number(itemPrice || 0);  // 가격이 없으면 0으로 처리
            if (parsedPrice === 0) {
                console.warn(`Price for item ${itemId} is zero or undefined!`);
            }

            return total + parsedPrice * (cartItem.itemCount || 0);  // itemCount로 계산
        }, 0);
    };

    // 선택된 아이템 토글
    const toggleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // 주문하기 클릭
    const handleOrder = () => {
        if (selectedItems.length === 0) {
            alert('선택된 상품이 없습니다.');
            return;
        }

        // 선택된 아이템에 대해 상품명도 포함시켜서 처리
        const selectedCartItems = selectedItems.map(itemId => {
            const cartItem = cartItems.find(item => item.itemId === itemId);
            const itemDetails = getItemDetails(itemId);
            return {
                ...cartItem,
                itemName: itemDetails.itemName, // 상품명 추가
                itemPrice: itemDetails.itemPrice, // 가격 추가
                itemCount: cartItem.itemCount, // 'quantity' 대신 'itemCount' 사용
            };
        });

        // selectedCartItems에 상품명이 포함된 상태로 주문 페이지로 이동
        navigate('/order', { state: { selectedCartItems } });
    };

    // 아이템 상세 정보 가져오기 (상품명, 가격 등)
    const getItemDetails = (itemId) => {
        const item = shopItems.find(item => item.itemId === itemId);
        if (!item) {
            console.warn(`Item with ID ${itemId} not found.`);
            return { stock: 0, itemPrice: 0, itemName: 'Unknown', files: [] };
        }
        console.log('Item details for itemId:', itemId, 'Price:', item.itemPrice);  // 가격 출력
        return item;
    };

    // 수량 변경 처리
    const handleQuantityChange = (cartItemId, increment) => {
        const targetItem = cartItems.find(item => item.cartItemId === cartItemId);
        if (targetItem) {
            const { stock } = getItemDetails(targetItem.itemId);
            const newQuantity = targetItem.itemCount + increment; // 'quantity' 대신 'itemCount' 사용

            if (newQuantity > stock) {
                alert(`재고를 초과할 수 없습니다. 현재 재고: ${stock}`);
                return;
            }

            if (newQuantity < 1) {
                alert('수량은 최소 1개 이상이어야 합니다.');
                return;
            }

            // 수량 업데이트
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
                            const parsedPrice = Number(itemPrice) || 0;  // itemPrice가 없으면 0으로 처리

                            console.log('Rendered item details:', itemName, 'Price:', parsedPrice); // 가격 디버깅 로그

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
                                            <p className="text-sm">₩{parsedPrice}</p> {/* 가격 표시 */}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleQuantityChange(cartItem.cartItemId, -1)} // 수량 감소
                                            className="px-2 py-1 border rounded-l bg-gray-200"
                                            disabled={cartItem.itemCount <= 1} // 수량이 1 이하로 감소하지 않도록 제한
                                        >
                                            -
                                        </button>
                                        <p className="px-4">{cartItem.itemCount}</p> {/* 'quantity' 대신 'itemCount' 사용 */}
                                        <button
                                            onClick={() => handleQuantityChange(cartItem.cartItemId, 1)} // 수량 증가
                                            className="px-2 py-1 border rounded-r bg-gray-200"
                                            disabled={cartItem.itemCount >= getItemDetails(cartItem.itemId).stock} // 재고 초과 방지
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="mr-4">
                                            합계: ₩{parsedPrice * (cartItem.itemCount || 0)} {/* 'quantity' 대신 'itemCount' 사용 */}
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