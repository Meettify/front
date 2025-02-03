import React, { useContext } from "react";
import { SortOrderContext } from "../../pages/shop/ShopPage";

const SortOrderSelect = React.memo(() => {
    const { sortOrder, updateSortOrder } = useContext(SortOrderContext);

    const handleSortChange = (e) => {
        updateSortOrder(e.target.value); // 정렬 기준 업데이트
    };
    console.log("리렌더링됨");

    return (
        <>
            <select
                className="sortOrder"
                value={sortOrder}
                onChange={handleSortChange} // 호출 지점
            >
                <option value="desc">최신순</option>
                <option value="asc">오래된순</option>
            </select>
        </>
    );
});

export default SortOrderSelect;
