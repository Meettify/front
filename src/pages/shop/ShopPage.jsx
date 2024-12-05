import React, { useEffect, useState } from 'react';
import ShopCard from '../../components/shop/ShopCard';
import FilterSection from '../../components/shop/FilterSection';
import useCartStore from '../../stores/useCartStore';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { FaList, FaFutbol, FaPlane, FaMusic, FaPalette, FaBook, FaHeartbeat, FaTshirt, FaPaw } from 'react-icons/fa';
import { IoGridOutline } from "react-icons/io5";

// 카테고리 목록
const categories = [
    { id: 'all', name: '전체', icon: <IoGridOutline /> },
    { id: 'sports', name: '스포츠', icon: <FaFutbol /> },
    { id: 'travel', name: '여행', icon: <FaPlane /> },
    { id: 'music', name: '음악', icon: <FaMusic /> },
    { id: 'art', name: '예술', icon: <FaPalette /> },
    { id: 'reading', name: '독서', icon: <FaBook /> },
    { id: 'health', name: '건강', icon: <FaHeartbeat /> },
    { id: 'fashion', name: '패션/뷰티', icon: <FaTshirt /> },
    { id: 'pets', name: '반려동물', icon: <FaPaw /> },
];

const ShopPage = () => {
    const {
        shopItems,
        cartItems,
        fetchShopItems,
        fetchAllCartItems,
    } = useCartStore();
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [selectedCategory, setSelectedCategory] = useState('all'); // 선택된 카테고리
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
        if (typeof itemId !== 'string') {
            itemId = String(itemId);  // itemId를 문자열로 변환
        }
        console.log("Navigating to item detail with ID:", itemId);
        navigate(`/shop/detail/${itemId}`);
    };


    // 카테고리 필터링된 아이템
    const filteredItems = selectedCategory === 'all'
        ? shopItems
        : shopItems.filter((item) => item.category === selectedCategory);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    if (isLoading) {
        return <p>로딩 중...</p>; // 로딩 상태 표시
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 flex">
            <FilterSection />
            <div className="flex-1 pl-8">
                {/* <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold">상품 살펴보기</div>
                </div> */}

                {/* 카테고리 버튼 섹션 */}
                <div className="flex justify-start space-x-4 mb-2"> {/* justify-start, center */}
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`flex flex-col items-center px-4 py-2 ${selectedCategory === category.id ? 'text-blue-500' : 'text-gray-500'
                                }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className="text-2xl">{category.icon}</div>
                            <div className="text-sm mt-3">{category.name}</div> {/* 아이콘과 텍스트 사이 간격 추가 */}
                        </button>
                    ))}
                </div>

                <InfiniteScroll
                    dataLength={filteredItems.length}
                    next={() => { }}
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>더 이상 상품이 없습니다.</p>}
                >
                    <div className="grid grid-cols-4 gap-4">
                        {filteredItems.map((item) => (
                            <ShopCard
                                key={item.itemId}
                                itemId={item.itemId}
                                title={item.itemName}
                                description={item.itemDetails}
                                price={`₩${item.itemPrice}`}
                                imageUrl={item.files?.[0] ? `https://example.com/${item.files[0]}` : 'https://via.placeholder.com/150'}
                                onClick={() => handleNavigateToDetail(item.itemId)} // itemId가 제대로 전달되는지 확인
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ShopPage;
