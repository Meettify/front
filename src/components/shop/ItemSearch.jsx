import React, { useContext } from 'react';
import { LuSearch } from "react-icons/lu";
import { SearchTextContext } from "../../pages/shop/ShopPage";

const ItemSearch = React.memo(() => {
    const {searchText, updateSearchText} = useContext(SearchTextContext);

    const handleSearchChange = (e) => {
        updateSearchText(e.target.value); // 검색어 업데이트
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            // 엔터키 처리 로직
            updateSearchText(searchText); // 부모 컴포넌트로 검색어를 전달
        }
    };

    return (
    <>
        <label className="block text-left text-md font-bold mb-2">상품 검색</label>
        <div className="relative w-full"> {/* 아이콘을 넣을 위치 */}
            <input
                type="text"
                placeholder="검색어 입력 후 Enter"
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit} // 엔터키 처리
                className="p-2 pl-10 border border-gray-300 rounded-full text-sm w-full"
            />
            <LuSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
        </div>
    </>
    )
})

export default ItemSearch;