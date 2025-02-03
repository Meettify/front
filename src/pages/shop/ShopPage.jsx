import React, { useState, createContext, useCallback } from 'react';
import FilterSection from '../../components/shop/FilterSection';

import "./ShopPage.css";
import ShopCategoryTabs from "../../components/shop/ShopCategoryTabs";
import ShopItems from "../../components/shop/Shopitems";

export const SortOrderContext = createContext();
export const PriceRangeContext = createContext();
export const SearchTextContext = createContext();
export const CategoryContext = createContext();

const ShopPage = () => {
    //컨텍스트에서 관리
    const [sortOrder, setSortOrder] = useState('desc'); // desc: 최신순, asc: 오래된순
    const [priceRange, setPriceRange] = useState([30000, 1000000]); // 적용된 가격 범위 상태
    const [searchText, setSearchText] = useState(''); // 제목 검색 상태
    const [selectedCategory, setSelectedCategory] = useState('all'); // 선택된 카테고리

     // useCallback으로 감싸서 불필요한 재생성 방지
     const updateSortOrder = useCallback((value) => setSortOrder(value), []);
     const updatePriceRange = useCallback((value) => setPriceRange(value), []);
     const updateSearchText = useCallback((value) => setSearchText(value), []);
     const updateSelectedCategory = useCallback((value) => setSelectedCategory(value), []);

    return (
        <SortOrderContext.Provider value={{sortOrder, updateSortOrder}}>
        <PriceRangeContext.Provider value={{priceRange, updatePriceRange}}>
        <SearchTextContext.Provider value={{searchText, updateSearchText}}>
        <CategoryContext.Provider value={{selectedCategory, updateSelectedCategory}}>
            <div className="page-wrap ShopPage">
                <div className='filter-section-area'>
                    <FilterSection />
                </div>

                <div className="items-area">
                    <ShopCategoryTabs />
                    <div>
                        <ShopItems />
                    </div>
                </div>
            </div>
        </CategoryContext.Provider>
        </SearchTextContext.Provider>
        </PriceRangeContext.Provider>
        </SortOrderContext.Provider>
        
    );
};

export default ShopPage;
