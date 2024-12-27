import React from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList } from "react-icons/lu";

const FilterSection = ({ title, setTitle }) => {
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

            {/* 제목 검색 */}
            <div className="mb-4 pb-4">
                <label className="block text-left text-md font-bold mb-2">검색</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="상품 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // 제목 입력 시 상태 변경
                />
            </div>

        </div>
    );
};

export default FilterSection;
