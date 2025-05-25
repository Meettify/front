import React from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList } from "react-icons/lu";
import { BsChevronUp } from "react-icons/bs";
import SortOrderSelect from "./SortOrderSelect";
import ItemSearch from "./ItemSearch";
import { useState } from "react";

const FilterSection = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleFilterCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="pr-5 border-r border-gray-300 h-full md:pr-0 md:border-none md:h-auto">
      <div
        className={`mb-6 md:border md:rounded-md md:px-4 md:py-4 ${
          collapsed ? "flex items-center px-4 py-2" : ""
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <LuList size={16} />
            <span className="font-semibold">필터</span>
          </div>
          <SortOrderSelect />
        </div>

        {!collapsed && (
          <div className="mt-6 text-left w-full">
            <h3 className="mb-2 font-bold text-base">가격 범위</h3>
            <RangeSlider />
          </div>
        )}

        <button
          className={`hidden md:flex items-center justify-center gap-2 w-full mt-5 mb-2 rounded-full px-5 py-2 text-gray-600 hover:text-blue-500 active:bg-blue-100 transition ${
            collapsed ? "w-auto ml-1 mb-0 mt-0" : ""
          }`}
          onClick={handleFilterCollapse}
        >
          <span className="text-sm">{collapsed ? "펼치기" : "접기"}</span>
          <span
            className={`text-xs transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          >
            <BsChevronUp />
          </span>
        </button>
      </div>

      {/* 제목 검색 */}
      <div className="mb-4 pb-4">
        <ItemSearch />
      </div>
    </div>
  );
};

export default FilterSection;
