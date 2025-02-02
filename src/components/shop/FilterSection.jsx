import React, { useState } from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList, LuSearch } from "react-icons/lu";
import {BsChevronUp} from "react-icons/bs";

import "./FilterSection.css";

const FilterSection = ({ title, setTitle, sortOrder, setSortOrder, onSearch, onPriceChange }) => {
    const handleSortChange = (e) => {
        setSortOrder(e.target.value); // 정렬 기준 업데이트
    };

    const handleSearchChange = (e) => {
        setTitle(e.target.value); // 검색어 업데이트
    };

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            // 엔터키 처리 로직
            onSearch(title); // 부모 컴포넌트로 검색어를 전달
        }
    };

    const handleFilterCollapse = (e) => {
        const filterBox = document.querySelector(".filter-box");
        filterBox.classList.toggle("minimum");
    }

    return (
        <div className="FilterSection">
            <div className="filter-box">
                <div className="filter-top">
                    <div className="filter-area-title">
                        <LuList size={16} />
                        <span className="font-semibold">필터</span>
                    </div>
                    <select
                            className="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange} // 호출 지점
                        >
                            <option value="desc">최신순</option>
                            <option value="asc">오래된순</option>
                        </select>
                </div>
                <div className="price-slider-area">
                    <h3>가격 범위</h3>
                    <div className="price-slider">
                        <RangeSlider onPriceChange={onPriceChange} /> {/* onPriceChange 전달 */}
                    </div>
                </div>
                <button class="btn btn-filter-collapse" onClick={handleFilterCollapse}>
                    <span className="allow">
                        <BsChevronUp />
                    </span>
                </button>
            </div>
            {/* 제목 검색 */}
            <div className="mb-4 pb-4">
                <label className="block text-left text-md font-bold mb-2">상품 검색</label>
                <div className="relative w-full"> {/* 아이콘을 넣을 위치 */}
                    <input
                        type="text"
                        placeholder="검색어 입력 후 Enter"
                        value={title}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchSubmit} // 엔터키 처리
                        className="p-2 pl-10 border border-gray-300 rounded-full text-sm w-full"
                    />
                    <LuSearch
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>
            
        </div>
    );
};

export default FilterSection;
