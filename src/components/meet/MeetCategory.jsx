// src/pages/meet/MeetCategory.jsx
import React, { useState } from "react";
import useNavigation from "../../hooks/useNavigation";
import MeetCategoryCard from "./MeetCategoryCard";
import SectionText from "../../components/text/SectionText";
import MeetCategoryData from "./MeetCategoryData";

const MeetCategory = () => {
  const { goToCategoryList, goToMeetDetail, goToMeetInsert } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  const filteredCategoryData =
    searchTerm === ""
      ? MeetCategoryData
      : MeetCategoryData.filter((meet) =>
          normalizeString(meet.categoryTitle).includes(
            normalizeString(searchTerm)
          )
        );

  return (
    <div className="bg-gray-100 flex flex-col py-12">
      {/* 상단 */}
      <div className="container mx-auto mt-24 mb-8 flex justify-between items-center px-6">
        <SectionText title="모든 모임." subtitle="오늘도, 소통하기 좋은 날." />
        <button
          onClick={goToMeetInsert}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          모임 생성하기
        </button>
      </div>

      {/* 카테고리 그리드 */}
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 pb-64">
        {filteredCategoryData.map((meet) => (
          <MeetCategoryCard
            key={meet.categoryId}
            imageUrls={[meet.image]}
            title={meet.title}
            onCardClick={() => goToCategoryList(meet.categoryTitle)} // 👈 클릭하면 카테고리 이동
          />
        ))}
      </div>
    </div>
  );
};

export default MeetCategory;
