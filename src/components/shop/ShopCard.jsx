import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";

const ShopCard = ({
    itemId,
    title,
    description,
    price,
    imageUrl,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { addToCart } = useCartStore();

    const handleStarClick = () => {
        const item = { itemId, title, description, price, imageUrl };
        setIsFavorite((prev) => !prev);
        if (!isFavorite) {
            addToCart(item); // 장바구니에 전체 상품 객체 추가
            console.log(`아이템 ${itemId} 장바구니에 추가 완료`);
        }
    };

    return (
        <div className="relative overflow-hidden w-48 py-5 text-center">
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
                    {isFavorite ? (
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
