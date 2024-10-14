import React from "react";
import RoundedButton from "../button/RoundedButton";

const ShopCard = ({ title = "상품명", description = "상품 내용", price = "₩100,000", imageUrl = "https://via.placeholder.com/150" }) => {
    return (
        <div className="bg-white overflow-hidden w-64 py-5 text-center">
            <div className="bg-gray-200 h-44 flex items-center justify-center rounded-lg shadow-md">
                <img
                    src={imageUrl} // 동적으로 전달된 이미지 URL
                    alt={title}
                    className="object-cover h-full w-full rounded-lg"
                />
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-md mb-1">{title}</h3>
                <p className="text-gray-500 text-sm mb-2">{description}</p>
                <p className="font-bold text-sm">{price}</p>
                <div className="mt-2 space-x-4">
                    <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }}>
                        주문하기
                    </RoundedButton>
                </div>
            </div>

        </div>
    );
};

export default ShopCard;
