import React from "react";
import ShopCard from "../../components/shop/ShopCard";
import FilterSection from "../../components/shop/FilterSection"; // 필터 섹션 추가
import useNavigation from "../../hooks/useNavigation";

const ShopPage = () => {
    const { goToShopList } = useNavigation();

    // 목업 데이터 배열 생성
    const products = [
        { id: 1, title: "상품 1", description: "첫 번째 상품 설명", price: "₩100,000" },
        { id: 2, title: "상품 2", description: "두 번째 상품 설명", price: "₩200,000" },
        { id: 3, title: "상품 3", description: "세 번째 상품 설명", price: "₩300,000" },
        { id: 4, title: "상품 4", description: "네 번째 상품 설명", price: "₩400,000" },
    ];

    return (
        <div className="container mx-auto mt-20 flex">
            {/* 왼쪽 필터 섹션 */}
            <FilterSection />

            {/* 오른쪽 게시판이나 상품 목록 */}
            <div className="flex-1 ml-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-4xl font-bold text-left">상품 살펴보기.</div>
                    <button onClick={goToShopList} className="text-blue-500">
                        상품 등록 신청하기 &gt;
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ShopCard
                            key={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
