import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";
import { useAuth } from "../../hooks/useAuth";

const ShopCard = ({ itemId, title, description, price, imageUrl, onClick }) => {
    const { addToCart, removeFromCart, isFavorite } = useCartStore(); // Zustand 스토어 액션 사용
    const { user } = useAuth(); // 사용자 정보 가져오기

    const handleCardClick = () => {
        if (onClick) {
            onClick(itemId);
        }
    };

    const handleStarClick = async (e) => {
        e.stopPropagation(); // 부모 클릭 이벤트 방지

        if (!user || !user.memberEmail) {
            console.error('사용자가 인증되지 않았습니다.');
            return;
        }

        if (isFavorite(itemId)) {
            // 이미 별표된 상태 -> 장바구니에서 제거
            try {
                await removeFromCart(itemId);
                console.log(`아이템 ${itemId} 장바구니에서 제거 완료`);
                // 서버에서 최신 장바구니 항목을 가져와 상태 동기화
                fetchCartItems(user.memberEmail);
            } catch (error) {
                console.error('장바구니에서 상품 제거 중 오류 발생:', error);
            }
        } else {
            const parsedPrice = Number(price.replace(/[^0-9.-]+/g, ''));
            if (isNaN(parsedPrice)) {
                console.error(`잘못된 가격 값: ${price}`);
                return;
            }

            const item = {
                itemId,
                title,
                description,
                price: parsedPrice,
                imageUrl,
            };
            try {
                await addToCart(user.memberEmail, item);
                console.log(`아이템 ${itemId} 장바구니에 추가 완료`);
                // 서버에서 최신 장바구니 항목을 가져와 상태 동기화
                fetchCartItems(user.memberEmail);
            } catch (error) {
                console.error('장바구니에 상품 추가 중 오류 발생:', error);
            }
        }
    };

    return (
        <div onClick={handleCardClick} className="relative overflow-hidden w-48 py-5 text-center cursor-pointer transition">
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
