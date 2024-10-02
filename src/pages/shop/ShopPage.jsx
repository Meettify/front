import React from "react";
import useNavigation from "../../hooks/useNavigation";

const ShopPage = () => {
    const { goToShopList } = useNavigation();

    return (
        <div className="container mx-auto mt-20">
            <div className="text-4xl font-bold mb-6 text-left">쇼핑 둘러보기.</div>
            <button onClick={goToShopList} className="text-blue-500">
                전체 상품 보기 &gt;
            </button>
        </div>
    );
};

export default ShopPage;