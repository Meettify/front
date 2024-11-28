import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";

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
        <div onClick={onClick} className="relative overflow-hidden w-48 py-5 text-center cursor-pointer transition">
            <div className="relative bg-gray-200 h-36 flex items-center justify-center rounded-md">
                <img src={imageUrl} alt={title} className="object-cover h-full w-full rounded-md" />
                <button className="absolute top-3 right-3 text-2xl" onClick={handleStarClick}>
                    {isFavorite(itemId) ? (
                        <TiStarFullOutline className="text-yellow-400" />
                    ) : (
                        <CiStar className="text-gray-200" />
                    )}
                </button>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs mb-2">{description}</p>
                <p className="font-bold text-sm">{price}</p>
            </div>
        </div>
    );
};

export default ShopCard;
