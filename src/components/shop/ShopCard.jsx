import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";

const ShopCard = ({ itemId, title, description, price, imageUrl, onClick }) => {
    const { addToCart, isFavorite } = useCartStore(); // 상태 가져오기

    const handleCardClick = () => {
        if (onClick) {
            onClick(itemId); // 부모에서 전달된 onClick prop 실행
        }
    };

    const handleStarClick = (e) => {
        e.stopPropagation(); // 별 클릭 시 부모의 클릭 이벤트 방지
        const parsedPrice = Number(price.replace(/[^0-9.-]+/g, ''));

        if (isNaN(parsedPrice)) {
            console.error(`잘못된 가격 값: ${price}`);
            return;
        }

        if (!isFavorite(itemId)) {
            const item = {
                itemId,
                title,
                description,
                price: parsedPrice,
                imageUrl,
            };
            addToCart(item);
            console.log(`아이템 ${itemId} 장바구니에 추가 완료`);
        }
    };

    return (
        <div
            onClick={handleCardClick} // 클릭 이벤트 추가
            className="relative overflow-hidden w-48 py-5 text-center cursor-pointer transition"
        >
            <div className="relative bg-gray-200 h-36 flex items-center justify-center rounded-md">
                <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover h-full w-full rounded-md"
                />
                <button
                    className="absolute top-3 right-3 text-2xl"
                    onClick={handleStarClick}
                >
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
