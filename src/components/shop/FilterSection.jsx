import React from "react";
import FilterIcon from "../../components/icons/FilterIcon"; // 아이콘 import

const FilterSection = () => {
    return (
        <div className="w-1/4 p-4 border-r border-gray-300"> {/* 세로 라인 추가 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <FilterIcon className="mt-[-4px]" />
                    <span className="text-lg font-semibold">필터</span>
                </div>
            </div>

            {/* 필터 유형 섹션 */}
            <div className="mb-4 pb-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-bold">유형</h3>
                </div>
                <div className="text-gray-700 bg-gray-50 p-2 rounded-md">
                    답글이 없는 질문
                </div>
            </div>

            {/* 추가 필터 유형들 (필요에 따라 더 추가 가능) */}
            <div className="mb-4 pb-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-bold">가격 범위</h3>
                </div>
                <div className="text-gray-700 bg-gray-50 p-2 rounded-md">
                    ₩100,000 - ₩500,000
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
