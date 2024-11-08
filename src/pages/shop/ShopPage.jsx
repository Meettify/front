import React, { useEffect } from 'react';
import ShopCard from '../../components/shop/ShopCard';
import FilterSection from '../../components/shop/FilterSection';
import useNavigation from '../../hooks/useNavigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getItemList } from '../../api/adminAPI'; // adminAPI에서 상품 목록 가져오기
import { useNavigate } from 'react-router-dom';

const ShopPage = () => {
    const { goToShopList } = useNavigation();
    const [itemList, setItemList] = React.useState([]);
    const navigate = useNavigate(); // useNavigate 사용

    useEffect(() => {
        const fetchItems = async () => {
            const items = await getItemList(); // 상품 목록 조회
            setItemList(items);
        };
        fetchItems();
    }, []);

    // handleNavigateToDetail 함수 정의
    const handleNavigateToDetail = (itemId) => {
        navigate(`/shop/detail/${itemId}`);
    };

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
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>더 이상 상품이 없습니다.</p>}
                >
                    <div className="grid grid-cols-4 gap-4">
                        {itemList.map((item) => (
                            <ShopCard
                                key={item.itemId}
                                itemId={item.itemId}
                                title={item.itemName}
                                description={item.itemDetails}
                                price={`₩${item.itemPrice}`}
                                imageUrl={
                                    item.files?.[0]
                                        ? `https://example.com/${item.files[0]}`
                                        : 'https://via.placeholder.com/150'
                                }
                                onClick={handleNavigateToDetail} // handleNavigateToDetail 함수 전달
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default ShopPage;
