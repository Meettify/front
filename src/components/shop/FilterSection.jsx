import React, { useState } from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList, LuSearch } from "react-icons/lu";

const FilterSection = ({ title, setTitle }) => {
    const handleSearchChange = (e) => {
        setTitle(e.target.value); // 검색어가 바뀔 때 title을 업데이트
    };

    const handleSearchSubmit = (e) => {
        if (e.key === "Enter") {
            // 엔터키가 눌렸을 때 검색 로직 처리
            console.log("검색어:", title);
        }
    };

    return (
        <div className="w-1/5 p-2 pr-8 border-r border-gray-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <LuList size={16} />
                    <span className="font-semibold">필터</span>
                </div>
            </div>

            <h3 className="text-left text-md font-bold mt-10 mb-5">가격 범위</h3>
            <div className="mb-4 pb-4">
                <RangeSlider />
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
