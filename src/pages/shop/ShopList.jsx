import React from "react";
import ShopCard from "../../components/shop/ShopCard";

const ShopList = () => {
    return (
        <div className="flex flex-col items-center mt-10">
            <div>전체 상품 목록</div>
            <div className="flex justify-center w-full my-2">
                <ShopCard />
            </div>
        </div>
    );
};

export default ShopList;