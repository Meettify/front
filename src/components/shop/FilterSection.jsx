import React, { useState } from "react";
import RangeSlider from "../shop/RangeSlider";
import { LuList } from "react-icons/lu";
import {BsChevronUp} from "react-icons/bs";

import SortOrderSelect from "./SortOrderSelect";
import ItemSearch from "./ItemSearch";

import "./FilterSection.css";

const FilterSection = () => {
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
                    <SortOrderSelect />
                </div>
                <div className="price-slider-area">
                    <h3>가격 범위</h3>
                    <div className="price-slider">
                        <RangeSlider />
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
                <ItemSearch />
            </div>
        </div>
    );
};

export default FilterSection;
