import React, { useEffect, useState } from 'react';
import ShopCard from '../../components/shop/ShopCard';
import FilterSection from '../../components/shop/FilterSection';
import useCartStore from '../../stores/useCartStore';
import { getItemList } from '../../api/adminAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { FaFutbol, FaPlane, FaMusic, FaPalette, FaBook, FaHeartbeat, FaTshirt, FaPaw } from 'react-icons/fa';
import { IoGridOutline } from "react-icons/io5";

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
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            console.log("Fetching items with sortOrder:", sortOrder); // 상태값 사용
            setIsLoading(true);

            await Promise.all([fetchShopItems(), fetchAllCartItems()]);

            const items = await getItemList(1, 10, sortOrder);
            console.log("Fetched Items:", items); // API로 가져온 원본 데이터 출력

            let filteredItems = items;

            if (title) {
                filteredItems = filteredItems.filter(item =>
                    item.itemName.toLowerCase().includes(title.toLowerCase())
                );
                console.log("Filtered by Title:", filteredItems); // 제목으로 필터링된 결과 출력
            }

            if (selectedCategory !== 'all') {
                filteredItems = filteredItems.filter(item => item.itemCategory === selectedCategory);
                console.log("Filtered by Category:", filteredItems); // 카테고리로 필터링된 결과 출력
            }

            // itemId로 정렬하는 코드 추가
            const sortedItems = filteredItems.sort((a, b) => {
                if (sortOrder === 'desc') {
                    return b.itemId - a.itemId; // 내림차순 정렬
                } else {
                    return a.itemId - b.itemId; // 오름차순 정렬
                }
            });

            console.log("Final Sorted and Filtered Items:", sortedItems); // 최종 결과 출력
            setShopItems(sortedItems);
            setIsLoading(false);
        };

        loadData();
    }, [selectedCategory, title, sortOrder, fetchShopItems, fetchAllCartItems]);


    const handleNavigateToDetail = (itemId) => {
        if (typeof itemId !== 'string') {
            itemId = String(itemId);  // itemId를 문자열로 변환
        }
        console.log("Navigating to item detail with ID:", itemId);
        navigate(`/shop/detail/${itemId}`);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSortChange = (e) => {
        const newSortOrder = e.target.value;
        console.log("Sort Order Changed:", newSortOrder); // 새로운 정렬 순서 출력
        setSortOrder(newSortOrder);
    };


    if (isLoading) {
        return <p>로딩 중...</p>; // 로딩 상태 표시
    }

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4 flex">
            {/* FilterSection에 title, setTitle, sortOrder, handleSortChange 전달 */}
            <FilterSection
                title={title}
                setTitle={setTitle}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder} // 추가
            />

            <div className="flex-1 pl-8">
                {/* 카테고리 버튼 섹션 */}
                <div className="flex justify-start space-x-4 mb-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`flex flex-col items-center px-4 py-2 ${selectedCategory === category.id ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className="text-2xl">{category.icon}</div>
                            <div className="text-sm mt-3">{category.name}</div>
                        </button>
                    ))}
                </div>

                <InfiniteScroll
                    dataLength={shopItems.length}
                    next={() => { }}
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
