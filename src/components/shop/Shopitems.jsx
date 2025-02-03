import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ShopCard from '../../components/shop/ShopCard';
import { getItemList } from '../../api/adminAPI';

import { SortOrderContext } from "../../pages/shop/ShopPage";
import { PriceRangeContext } from "../../pages/shop/ShopPage";
import { SearchTextContext } from "../../pages/shop/ShopPage";
import { CategoryContext } from "../../pages/shop/ShopPage";
import { useNavigate } from 'react-router-dom';



const ShopItems = React.memo(() => {
    //컨텍스트에서 가져온 값들
    const {sortOrder} = useContext(SortOrderContext);
    const {priceRange} = useContext(PriceRangeContext);
    const {searchText} = useContext(SearchTextContext);
    const {selectedCategory} = useContext(CategoryContext);

    //검색 리스트 관리
    const [shopItems, setShopItems] = useState([]);
    const [shopItemsFilter, setShopItemsFilter] = useState([]);
    const itemArray = useRef([]);
    
    const nav = useNavigate();    

    //상품 목록을 가져오는 함수
    const fetchItems = useCallback(async () => {
        try {
            const response = await getItemList(); // getItems()가 Promise를 반환하는 함수라고 가정
            setShopItems(response);
            setShopItemsFilter(response);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    }, []);

    useEffect(()=>{
        fetchItems();
    }, [fetchItems]); 
    
    //필터 적용 함수
    const FilterItems = () => {
        itemArray.current = [...shopItems];
        itemArray.current.sort((a, b) =>
            sortOrder === 'asc' ? a.itemId - b.itemId : b.itemId - a.itemId
        );

        //가격 범위
        // shopItemsFilter를 복사한 후 필터링
        itemArray.current = itemArray.current.filter(item =>
            item.itemPrice >= priceRange[0] && item.itemPrice <= priceRange[1]
        );
        console.log(itemArray);

        //검색
        if (searchText) {
            itemArray.current = itemArray.current.filter(item =>
                item.itemName.toLowerCase().includes(searchText.toLowerCase()) // 대소문자 구분 없이 검색
            );
        }

        //카테고리
        if(selectedCategory !== "all"){
            itemArray.current = itemArray.current.filter(item =>
                item.itemCategory.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
    };

    //처음 렌더링 때 사용
    useEffect(()=>{
        FilterItems();
        setShopItemsFilter(()=>[...itemArray.current]);
    }, []);

    //필터 된 아이템들 리렌더링
    useEffect(()=>{
        FilterItems();
        setShopItemsFilter(()=>[...itemArray.current]);
    }, [shopItems, 
        sortOrder, 
        priceRange[0],
        priceRange[1], 
        searchText, 
        selectedCategory]);
    

    //디테일 페이지 이동
    const handleNavigateToDetail = (itemId) => {
        nav("/shop/detail/" + itemId);
    };

    return(
        <>
            <InfiniteScroll
                dataLength={12}
                next={() => { }}
                hasMore={false}
                loader={<h4>Loading...</h4>}
                endMessage={<p className='pt-5' style={{color:"#aaa", transition:"opacity 0.5s", opacity:"0"}}>더 이상 상품이 없습니다.</p>}
            >
                <div className="shop-card-wrap">
                    {shopItemsFilter.map((item) => (
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
        </>
    )
});

export default ShopItems;