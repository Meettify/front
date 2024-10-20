import React, { useEffect } from "react";
import ShopCard from "../../components/shop/ShopCard";
import FilterSection from "../../components/shop/FilterSection";
import useNavigation from "../../hooks/useNavigation";
import InfiniteScroll from "react-infinite-scroll-component";
import useAdminStore from "../../stores/useAdminStore";

const ShopPage = () => {
    const { goToShopList } = useNavigation();

    // AdminStore에서 상품 목록 가져오기
    const { itemList, fetchItemList } = useAdminStore();

    useEffect(() => {
        fetchItemList(); // 페이지 로드 시 상품 목록 조회
    }, [fetchItemList]);

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 flex">
            <FilterSection />
            <div className="flex-1 pl-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold">상품 살펴보기.</div>
                    <button onClick={goToShopList} className="text-blue-500">
                        상품 등록 신청하기 &gt;
                    </button>
                </div>

                <InfiniteScroll
                    dataLength={itemList.length}
                    next={() => { }}
                    hasMore={false} // 무한 스크롤 비활성화 (필요에 따라 변경)
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>더 이상 상품이 없습니다.</p>}
                >
                    <div className="grid grid-cols-4 gap-4">
                        {itemList.map((item) => (
                            <ShopCard
                                key={item.itemId}
                                title={item.itemName}
                                description={item.itemDetails}
                                price={`₩${item.itemPrice}`}
                                imageUrl={
                                    item.files?.[0]
                                        ? `https://example.com/${item.files[0]}`
                                        : "https://via.placeholder.com/150"
                                }
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ShopPage;
