import React, { useEffect, useState } from 'react';
import ShopCard from '../../components/shop/ShopCard';
import FilterSection from '../../components/shop/FilterSection';
import useCartStore from '../../stores/useCartStore';
import { getItemList } from '../../api/adminAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { FaFutbol, FaPlane, FaMusic, FaPalette, FaBook, FaHeartbeat, FaTshirt, FaPaw } from 'react-icons/fa';
import { IoGridOutline } from "react-icons/io5";

import "./ShopPage.css";

// 카테고리 목록
const categories = [
    { id: 'all', name: '전체', icon: <IoGridOutline /> },
    { id: 'SPORTS', name: '스포츠', icon: <FaFutbol /> },
    { id: 'TRAVEL', name: '여행', icon: <FaPlane /> },
    { id: 'MUSIC', name: '음악', icon: <FaMusic /> },
    { id: 'ART', name: '예술', icon: <FaPalette /> },
    { id: 'READING', name: '독서', icon: <FaBook /> },
    { id: 'HEALTH', name: '건강', icon: <FaHeartbeat /> },
    { id: 'FASHION_BEAUTY', name: '패션/뷰티', icon: <FaTshirt /> },
    { id: 'PET_LOVERS', name: '반려동물', icon: <FaPaw /> },
];

const ShopPage = () => {
    const {
        fetchShopItems,
        fetchAllCartItems,
    } = useCartStore();

    
    const [shopItems, setShopItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [selectedCategory, setSelectedCategory] = useState('all'); // 선택된 카테고리
    const [title, setTitle] = useState(''); // 제목 검색 상태
    const [sortOrder, setSortOrder] = useState('desc'); // desc: 최신순, asc: 오래된순
    const [priceRange, setPriceRange] = useState([10, 50000]); // 가격 범위 상태
    const navigate = useNavigate();

    // 가격 범위 변경 함수
    const handlePriceChange = (newRange) => {
        setPriceRange(newRange); // 가격 범위 업데이트
        handleSearch(title, newRange); // 가격 범위 필터링 적용한 검색
    };

    // 검색어를 바탕으로 상품 필터링
    const handleSearch = async (searchTerm, range = priceRange) => {
        setTitle(searchTerm); // 검색어 저장

        const items = await getItemList(1, 10, sortOrder);
        let filteredItems = items;

        if (searchTerm) {
            filteredItems = filteredItems.filter(item =>
                item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filteredItems = filteredItems.filter(item => item.itemCategory === selectedCategory);
        }

        // 가격 범위 필터 추가
        if (range) {
            filteredItems = filteredItems.filter(item =>
                item.itemPrice >= range[0] && item.itemPrice <= range[1]
            );
        }

        // itemId로 정렬하는 코드 추가
        const sortedItems = filteredItems.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.itemId - a.itemId; // 내림차순 정렬
            } else {
                return a.itemId - b.itemId; // 오름차순 정렬
            }
        });

        setShopItems(sortedItems);
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([fetchShopItems(), fetchAllCartItems()]);
            await handleSearch(title); // 초기 로딩 시 검색
            setIsLoading(false);
        };

        loadData();
    }, [selectedCategory, sortOrder, fetchShopItems, fetchAllCartItems]);

    const handleNavigateToDetail = (itemId) => {
        if (typeof itemId !== 'string') {
            itemId = String(itemId);  // itemId를 문자열로 변환
        }
        navigate(`/shop/detail/${itemId}`);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (e) => {
        const newSortOrder = e.target.value;
        setSortOrder(newSortOrder);
    };

    if (isLoading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="page-wrap ShopPage">
            <div className='filter-section-area'>
                <FilterSection
                    title={title}
                    setTitle={setTitle}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    onSearch={handleSearch} // 검색 함수 전달
                    onPriceChange={handlePriceChange} // 가격 범위 변경 함수 전달
                />
            </div>

            <div className="items-area">
                <div className="tabs-icon-area">
                    <div className="scroll-x-area">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`btn-category ${selectedCategory === category.id ? 'text-blue-500' : 'text-gray-500'}`}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <span className="icon">{category.icon}</span>
                                <span className="text">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={shopItems.length}
                    next={() => { }}
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>더 이상 상품이 없습니다.</p>}
                >
                <div className="shop-card-wrap">
                    {shopItems.map((item) => (
                        <ShopCard
                            key={item.itemId}
                            itemId={item.itemId}
                            title={item.itemName}
                            description={item.itemDetails}
                            price={`₩${item.itemPrice.toLocaleString()}`}
                            imageUrl={
                                item.images?.[0]?.uploadImgUrl
                                    ? item.images[0].uploadImgUrl
                                    : 'https://via.placeholder.com/150'
                            }
                            onClick={() => handleNavigateToDetail(item.itemId)}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    </div>
    );
};

export default ShopPage;
