import React, { useEffect } from "react";
import ShopCard from "../../components/shop/ShopCard";
import FilterSection from "../../components/shop/FilterSection";
import useNavigation from "../../hooks/useNavigation";
import InfiniteScroll from 'react-infinite-scroll-component';
import useShopStore from "../../stores/useShopStore";

const ShopPage = () => {
    const { goToShopList } = useNavigation();

    // Zustand에서 상태 가져오기
    const products = useShopStore((state) => state.products);
    const hasMore = useShopStore((state) => state.hasMore);
    const fetchMoreProducts = useShopStore((state) => state.fetchMoreProducts);
    const clearProducts = useShopStore((state) => state.clearProducts);

    // 페이지 로드 시 초기 상품 데이터 가져오기
    useEffect(() => {
        clearProducts(); // 기존 데이터 초기화
        fetchMoreProducts(); // 데이터를 가져옴
        console.log('Products after fetching:', products); // 데이터를 제대로 불러왔는지 확인
    }, [fetchMoreProducts, clearProducts]);

    // 더 많은 상품 데이터를 가져오는 함수
    const fetchMoreData = () => {
        if (hasMore) {
            fetchMoreProducts(); // 상품 데이터를 추가로 불러오기
        }
    };

    return (
        <div className="container mx-auto mt-20 flex">
            <FilterSection />
            <div className="flex-1 ml-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-4xl font-bold text-left">상품 살펴보기.</div>
                    <button onClick={goToShopList} className="text-blue-500">
                        상품 등록 신청하기 &gt;
                    </button>
                </div>

                <InfiniteScroll
                    dataLength={products.length} // 현재 상품 수
                    next={fetchMoreData} // 추가 데이터 로드 함수
                    hasMore={hasMore} // 더 불러올 데이터가 있는지 여부
                    loader={<h4>Loading...</h4>} // 로딩 표시
                    endMessage={<p>이제 더 이상 상품이 없습니다.</p>} // 끝 메시지
                >
                    <div className="grid grid-cols-4 gap-4">
                        {products.map((product, index) => (
                            <ShopCard
                                key={product.id ? product.id : `product-${index}`} // 고유한 key 설정
                                title={product.itemName}
                                description={product.itemDetails}
                                price={`₩${product.itemPrice}`}
                                imageUrl={product.files && product.files.length > 0 ? `https://example.com/${product.files[0]}` : "https://via.placeholder.com/150"} // 이미지 URL
                            />
                        ))}{products.map((product, index) => (
                            <ShopCard
                                key={index}
                                title={product.item?.itemName || "상품명"}
                                description={product.item?.itemDetails || "상품 설명"}
                                price={`₩${product.item?.itemPrice || 0}`}
                                imageUrl={product.files && product.files.length > 0 ? `https://example.com/${product.files[0]}` : "https://via.placeholder.com/150"} // 이미지 URL
                            />
                        ))}

                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ShopPage;
