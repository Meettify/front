import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";

import "./ShopCard.css";

const ShopCard = ({ itemId, title, description, price, imageUrl, onClick }) => {
    const { cartItems, addToCart, removeFromCart, isFavorite } = useCartStore();

    const handleStarClick = async (e) => {
        e.stopPropagation();

        const cartItem = cartItems.find(item => item.itemId === itemId);

        if (isFavorite(itemId)) {
            // 장바구니에서 제거
            try {
                if (cartItem) {
                    await removeFromCart(cartItem.cartItemId);
                    console.log(`아이템 ${itemId} 제거 완료`);
                } else {
                    console.error(`장바구니에 ${itemId}가 없습니다.`);
                }
            } catch (error) {
                console.error('장바구니에서 상품 제거 중 오류 발생:', error);
            }
        } else {
            // 장바구니에 추가
            try {
                await addToCart(itemId, 1);
                console.log(`아이템 ${itemId} 추가 완료`);
            } catch (error) {
                console.error('장바구니 추가 중 오류 발생:', error);
            }
        }
    };

    return (
        <div onClick={onClick} className="shop-card">
            <div className="thumnail-wrap">
                <img src={imageUrl} alt={title} className="object-cover h-full w-full rounded-md" />
                <button className="ico-favorite" onClick={handleStarClick}>
                    {isFavorite(itemId) ? (
                        <TiStarFullOutline className="text-yellow-400" />
                    ) : (
                        <CiStar className="text-gray-00" />
                    )}
                </button>
            </div>
            <div className="item-text-area">
                <h3 className="item-name">{title}</h3>
                <p className="description">{description}</p>
                <p className="price">{price}</p>
            </div>
        </div>
    );
};

export default ShopCard;
