import React, { useEffect } from "react";
import useAdminStore from "../../stores/useAdminStore";
import running from "../../assets/images/meet/running.jpg";

const MeetSideMenu = () => {
  const { recommendedItems, fetchRecommendedItems, loading, error } =
    useAdminStore();

  useEffect(() => {
    fetchRecommendedItems(); // ✅ 추천 상품 가져오기
  }, [fetchRecommendedItems]);

  if (loading)
    return <div className="text-center text-gray-500">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        오류가 발생했습니다: {error}
      </div>
    );

  return (
    <aside className="w-[300px] max-h-[720px] min-h-[400px] overflow-y-auto bg-white p-6 rounded-xl shadow ml-auto">
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
        오늘의 쇼핑. 당신에게 추천하는 제품.
      </h3>
      <div className="space-y-6">
        {recommendedItems.length > 0 ? (
          recommendedItems.slice(0, 3).map((item) => (
            <div key={item.itemId} className="text-center">
              <div className="w-full h-48 overflow-hidden rounded-md bg-gray-100 flex justify-center items-center">
                <img
                  src={item.images?.[0]?.uploadImgUrl || running}
                  alt={item.itemName || "Unknown Product"}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <h4 className="mt-4 font-semibold text-gray-900">
                <a href={`/shop/detail/${item.itemId}`}>
                  {item.itemName || "Unknown Product"}
                </a>
              </h4>
              <p className="text-gray-700 mt-2">
                ₩{item.itemPrice?.toLocaleString() || "0"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">추천 상품이 없습니다.</p>
        )}
      </div>
    </aside>
  );
};

export default MeetSideMenu;
