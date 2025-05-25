import React, { useState, createContext, useCallback, useEffect } from "react";
import FilterSection from "../../components/shop/FilterSection";
import ShopCategoryTabs from "../../components/shop/ShopCategoryTabs";
import ShopItems from "../../components/shop/Shopitems";

// Context 정의
export const SortOrderContext = createContext();
export const PriceRangeContext = createContext();
export const SearchTextContext = createContext();
export const CategoryContext = createContext();

const ShopPage = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const updateSortOrder = useCallback((value) => setSortOrder(value), []);
  const updatePriceRange = useCallback((value) => setPriceRange(value), []);
  const updateSearchText = useCallback((value) => setSearchText(value), []);
  const updateSelectedCategory = useCallback(
    (value) => setSelectedCategory(value),
    []
  );

  useEffect(() => {
    const keyword = new URLSearchParams(location.search).get("totalKeyword");
    if (keyword) updateSearchText(keyword);
  }, []);

  return (
    <SortOrderContext.Provider value={{ sortOrder, updateSortOrder }}>
      <PriceRangeContext.Provider value={{ priceRange, updatePriceRange }}>
        <SearchTextContext.Provider value={{ searchText, updateSearchText }}>
          <CategoryContext.Provider
            value={{ selectedCategory, updateSelectedCategory }}
          >
            <div className="flex flex-col md:flex-row px-4 md:px-6 xl:px-20 pt-20 min-h-screen">
              {/* 필터 */}
              <div className="w-full md:w-[240px] shrink-0 mb-8 md:mb-0">
                <FilterSection />
              </div>

              {/* 상품 영역 */}
              <div className="flex-1 min-w-0 px-0 md:px-5">
                <div className="w-full flex justify-center mb-3 -mx-3 whitespace-nowrap">
                  <div className="flex overflow-x-auto py-3 px-3 gap-3">
                    <ShopCategoryTabs />
                  </div>
                </div>

                {/* 상품 리스트 */}
                <ShopItems />
              </div>
            </div>
          </CategoryContext.Provider>
        </SearchTextContext.Provider>
      </PriceRangeContext.Provider>
    </SortOrderContext.Provider>
  );
};

export default ShopPage;
