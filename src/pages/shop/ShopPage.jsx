import React, { useEffect, useState } from 'react';
import ShopCard from '../../components/shop/ShopCard';
import FilterSection from '../../components/shop/FilterSection';
import useCartStore from '../../stores/useCartStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const ShopPage = () => {
    const {
        shopItems,
        cartItems,
        fetchShopItems,
        fetchAllCartItems,
    } = useCartStore();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([fetchShopItems(), fetchAllCartItems()]);
            setIsLoading(false);
        };
        loadData();
    }, []);

    const handleNavigateToDetail = (itemId) => {
        navigate(`/shop/detail/${itemId}`);
    };

    if (isLoading) {
        return <p>로딩 중...</p>; // 로딩 상태 표시
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 flex">
            <FilterSection />
            <div className="flex-1 pl-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold">상품 살펴보기</div>
                </div>
                <InfiniteScroll
                    dataLength={shopItems.length}
                    next={() => {}}
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>더 이상 상품이 없습니다.</p>}
                >
                    <div className="grid grid-cols-4 gap-4">
                        {shopItems.map((item) => (
                            <ShopCard
                                key={item.itemId}
                                itemId={item.itemId}
                                title={item.itemName}
                                description={item.itemDetails}
                                price={`₩${item.itemPrice}`}
                                imageUrl={item.files?.[0] ? `https://example.com/${item.files[0]}` : 'https://via.placeholder.com/150'}
                                onClick={handleNavigateToDetail}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ShopPage;
