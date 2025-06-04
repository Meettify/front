import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../../hooks/useAuth";
import { getItemList } from "../../api/shopAPI";
import RoundedCancelButton from "../../components/button/RoundedCancelButton";

const ItemList = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [itemList, setItemList] = useState([]);
  const [lastItemId, setLastItemId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("DESC"); // 기본값 최신순

  // 상품 삭제 (프론트 기준)
  const removeItem = (itemId) => {
    setItemList((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  // 무한 스크롤 데이터 요청
  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getItemList({
        lastItemId,
        size: 12,
        sort: `itemId,${sortOrder}`,
        status: "SELL",
      });

      const fetchedItems = response.items || [];

      if (fetchedItems.length === 0) {
        setHasMore(false);
      } else {
        // 중복 제거 후 목록 업데이트
        setItemList((prev) => {
          const merged = [...prev, ...fetchedItems];
          const unique = Array.from(
            new Map(merged.map((item) => [item.itemId, item])).values()
          );
          return unique;
        });

        setLastItemId(fetchedItems[fetchedItems.length - 1].itemId);
        setHasMore(response.hasNextPage);
      }
    } catch (e) {
      console.error("상품 불러오기 실패:", e);
      setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [lastItemId, loading, hasMore, sortOrder]);

  // ✅ 초기 로딩 한 번만
  useEffect(() => {
    fetchMore();
  }, []);

  // ✅ inView 도달 시마다 로딩
  useEffect(() => {
    if (inView) fetchMore();
  }, [inView, fetchMore]);

  // ✅ 정렬 변경 시 새로 로딩
  useEffect(() => {
    setItemList([]);
    setLastItemId(null);
    setHasMore(true);
    fetchMore();
  }, [sortOrder]);

  const goToItemDetail = (itemId) => {
    if (!itemId) return;
    navigate(`/shop/detail/${itemId}`);
  };

  if (!isAdmin) {
    return (
      <p className="text-center mt-10 text-red-500">접근 권한이 없습니다.</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!itemList || itemList.length === 0) {
    return <p className="text-center mt-4">등록된 아이템이 없습니다.</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end items-center my-4 px-2">
        <button
          onClick={() => {
            setItemList([]);
            setLastItemId(null);
            setHasMore(true);
            setSortOrder("DESC");
          }}
          className={`px-4 py-1 mr-2 rounded-full text-sm border ${
            sortOrder === "DESC"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => {
            setItemList([]);
            setLastItemId(null);
            setHasMore(true);
            setSortOrder("ASC");
          }}
          className={`px-4 py-1 rounded-full text-sm border ${
            sortOrder === "ASC"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>
      <table className="w-full table-fixed border-t border-gray-300 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="p-2 text-center">번호</th>
            <th className="p-2 text-center">카테고리</th>
            <th className="p-2 text-center">가격</th>
            <th className="p-2 text-center">상품명</th>
            <th className="p-2 text-center">삭제</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item) => (
            <tr
              key={item.itemId}
              className="hover:bg-gray-100 transition-colors"
            >
              <td className="p-2 text-center">{item.itemId}</td>
              <td className="p-2 text-center">{item.itemCategory}</td>
              <td className="p-2 text-center">
                {item.itemPrice.toLocaleString()}원
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => goToItemDetail(item.itemId)}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {item.itemName}
                </button>
              </td>
              <td className="p-2 text-center">
                <RoundedCancelButton onClick={() => removeItem(item.itemId)}>
                  삭제
                </RoundedCancelButton>
              </td>
            </tr>
          ))}
          {hasMore && (
            <tr>
              <td colSpan="5">
                <div ref={ref} className="h-6" />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && (
        <p className="text-center text-sm text-gray-500 mt-4">로딩 중...</p>
      )}
      {!hasMore && itemList.length > 0 && (
        <p className="text-center text-gray-400 text-sm py-4">
          더 이상 불러올 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default ItemList;
