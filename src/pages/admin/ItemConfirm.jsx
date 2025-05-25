import React, { useEffect, useState, useCallback } from "react";
import { getPendingItems, confirmItem } from "../../api/shopAPI";
import useAdminStore from "../../stores/useAdminStore";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../../hooks/useAuth";

const ItemConfirm = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [lastItemId, setLastItemId] = useState(null); // ✅ 커서 기반
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("itemId,desc");
  const fetchItemList = useAdminStore((state) => state.fetchItemList);
  const { ref, inView } = useInView();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  if (!isAdmin)
    return (
      <p className="text-center mt-10 text-red-500">접근 권한이 없습니다.</p>
    );

  // ✅ 아이템 불러오기
  const fetchMore = useCallback(async () => {
    if (loading || !hasNext) return;
    setLoading(true);

    try {
      const { items, hasNextPage } = await getPendingItems(
        lastItemId,
        10,
        sort
      );
      setPendingItems((prev) => [...prev, ...items]);

      if (items.length > 0) {
        const last = items[items.length - 1];
        setLastItemId(last.itemId); // ✅ 마지막 커서 갱신
      }

      setHasNext(hasNextPage);
    } catch (error) {
      console.error("상품 목록 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  }, [lastItemId, hasNext, loading, sort]);

  // ✅ 정렬 변경 또는 초기 로딩
  useEffect(() => {
    const loadInitial = async () => {
      setPendingItems([]);
      setLastItemId(null);
      setHasNext(true);
      setLoading(true);

      try {
        const { items, hasNextPage } = await getPendingItems(null, 10, sort);
        setPendingItems(items);

        if (items.length > 0) {
          const last = items[items.length - 1];
          setLastItemId(last.itemId);
        }

        setHasNext(hasNextPage);
      } catch (error) {
        console.error("초기 상품 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, [sort]);

  // ✅ inView 감지 시 다음 데이터 로드
  useEffect(() => {
    if (inView) {
      fetchMore();
    }
  }, [inView, fetchMore]);

  // ✅ 컨펌 버튼
  const handleConfirmItem = async (itemId) => {
    try {
      await confirmItem(itemId);
      setPendingItems((prev) => prev.filter((item) => item.itemId !== itemId));
      await fetchItemList(); // 필요한 경우 전체 새로고침
    } catch (error) {
      console.error("상품 컨펌 중 오류:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">상품 신청 내역</h2>

      {/* 정렬 셀렉트 */}
      <div className="flex justify-end mb-4">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="itemId,desc">최신순</option>
          <option value="itemId,asc">오래된순</option>
        </select>
      </div>

      <table className="w-full table-fixed border-t border-gray-300 text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="p-2 text-center">번호</th>
            <th className="p-2 text-center">카테고리</th>
            <th className="p-2 text-center">가격</th>
            <th className="p-2 text-center">상품명</th>
            <th className="p-2 text-center">컨펌</th>
          </tr>
        </thead>
        <tbody>
          {pendingItems.map((item) => (
            <tr key={item.itemId} className="hover:bg-gray-100">
              <td className="p-2 text-center">{item.itemId}</td>
              <td className="p-2 text-center">{item.itemCategory || "N/A"}</td>
              <td className="p-2 text-center">
                {item.itemPrice.toLocaleString()}원
              </td>
              <td className="p-2 text-center">{item.itemName}</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleConfirmItem(item.itemId)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  컨펌
                </button>
              </td>
            </tr>
          ))}

          {/* 무한 스크롤 감지용 */}
          {hasNext && (
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
      {!hasNext && pendingItems.length === 0 && (
        <p className="text-center mt-6 text-gray-400">
          등록된 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default ItemConfirm;
