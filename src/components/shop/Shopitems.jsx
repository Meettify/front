import React, { useEffect, useState, useContext, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopCard from "./ShopCard";
import { getItemList } from "../../api/shopAPI";
import {
  SortOrderContext,
  PriceRangeContext,
  SearchTextContext,
  CategoryContext,
} from "../../pages/shop/ShopPage";
import { useNavigate } from "react-router-dom";

const ShopItems = () => {
  const { sortOrder } = useContext(SortOrderContext);
  const { priceRange } = useContext(PriceRangeContext);
  const { searchText } = useContext(SearchTextContext);
  const { selectedCategory } = useContext(CategoryContext);

  const [items, setItems] = useState([]);
  const [lastItemId, setLastItemId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const nav = useNavigate();

  const fetchItems = useCallback(
    async (reset = false) => {
      try {
        const res = await getItemList({
          lastItemId: reset ? null : lastItemId,
          size: 12,
          sort: `itemId,${sortOrder.toUpperCase()}`,
          title: searchText || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        });

        const newItems = res.items;

        setItems((prev) => (reset ? newItems : [...prev, ...newItems]));
        setLastItemId(
          newItems.length > 0 ? newItems[newItems.length - 1].itemId : null
        );
        setHasMore(res.hasNextPage);
      } catch (e) {
        console.error("상품 로딩 오류:", e);
      }
    },
    [lastItemId, sortOrder, priceRange, searchText, selectedCategory]
  );

  // 필터 변경 시 초기화 후 새로 불러오기
  useEffect(() => {
    setItems([]);
    setLastItemId(null);
    setHasMore(true);
    fetchItems(true);
  }, [sortOrder, priceRange, searchText, selectedCategory]);

  const handleNavigateToDetail = (itemId) => {
    nav(`/shop/detail/${itemId}`);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => fetchItems()}
      hasMore={hasMore}
      loader={<h4 className="text-center py-4">Loading...</h4>}
      endMessage={
        <p className="pt-5 text-gray-400 text-center">
          더 이상 상품이 없습니다.
        </p>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
        {items.map((item) => (
          <ShopCard
            key={item.itemId}
            itemId={item.itemId}
            title={item.itemName}
            description={item.itemDetails}
            price={`₩${item.itemPrice.toLocaleString()}`}
            imageUrl={
              item.images?.[0]?.uploadImgUrl ??
              "https://via.placeholder.com/150"
            }
            onClick={() => handleNavigateToDetail(item.itemId)}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default React.memo(ShopItems);
