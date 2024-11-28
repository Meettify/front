import React, { useState } from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList } from "react-icons/lu";

const FilterSection = () => {
    return (
        <div className="w-1/5 p-2 pr-8 border-r border-gray-300">
            {/* 상단 필터 아이콘과 드롭다운 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <LuList size={16} />
                    <span className="font-semibold">필터</span>
                </div>

                <select className="p-2 border border-gray-300 rounded-lg text-sm" style={{ transform: 'translateY(3px)' }}>
                    <option value="최신순">최신순</option>
                    <option value="오래된순">오래된 순</option>
                </select>
            </div>

            <h3 className="text-left text-md font-bold mt-10 mb-5">가격 범위</h3>
            <div className="mb-4 pb-4">
                <RangeSlider />
            </div>

            {/* <div className="mb-4 pb-4">
                <h3 className="text-left text-md font-bold mb-5">카테고리</h3>
                <div className="grid grid-cols-1 gap-4">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>스포츠</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>여행</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>음악</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>예술</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>독서</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>건강</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>패션/뷰티</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>반려동물</span>
                    </label>
                </div>
            </div> */}
        </div>
    );
};

export default FilterSection;