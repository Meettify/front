import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import SectionText from "../../components/text/SectionText";
import MeetListSearch from "../../components/meet/MeetListSearch";
import useNavigation from "../../hooks/useNavigation";
import { getMeetList } from "../../api/meetAPI";

const MeetList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const totalKeyword = searchParams.get("totalKeyword") || "";
  const { goToMeetDetail } = useNavigation();

  const [meetData, setMeetData] = useState([]);
  const [filteredMeetData, setFilteredMeetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(totalKeyword.trim());
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMeetData = async () => {
      setLoading(true);
      try {
        const data = await getMeetList(currentPage, 12, "meetName", category);
        console.log("모임 리스트 :", data);
        setMeetData(data.meets || []);
        setTotalPages(data.totalPage || 1);
      } catch (error) {
        console.error("API 호출 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetData();
  }, [category, currentPage]);

  useEffect(() => {
    const filteredData = meetData.filter((meet) =>
      meet.meetName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeetData(filteredData);
  }, [searchTerm, meetData]);

  return (
    <div className="container mx-auto mt-20 w-full min-h-screen flex">
      {/* 왼쪽: 모임 카드 리스트 */}
      <div className="w-5/6 flex flex-col p-2 min-h-[1000px]">
        <div className="flex justify-between items-center mb-4">
          <SectionText
            title="모임 리스트."
            subtitle="선택한 카테고리의 모임입니다."
          />
        </div>

        <MeetListSearch
          onChange={(value) => setSearchTerm(value)}
          value={searchTerm}
        />

        <div className="flex-1 flex flex-col justify-between">
          {/* 모임 카드 영역 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {loading ? (
              <div className="col-span-3 text-center text-gray-500">
                로딩 중...
              </div>
            ) : filteredMeetData.length > 0 ? (
              filteredMeetData.map((meet) => (
                <MeetCard
                  key={meet.meetId}
                  meetId={meet.meetId}
                  imageUrls={meet.imageUrls}
                  title={meet.meetName}
                  tags={meet.tags}
                  isMeetPage={false}
                  isMember={meet.member} // ✅ 서버에서 받은 값 그대로 전달
                  onCardClick={() => goToMeetDetail(meet.meetId)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                모임이 없습니다.
              </div>
            )}
          </div>

          {/* 페이지네이션 항상 하단 고정 */}
          <div className="flex justify-center items-center mt-4 mb-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
            >
              이전
            </button>
            <span className="text-gray-700 mx-4">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage + 1 >= totalPages}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽: 추천 상품 */}
      <div className="w-1/6 flex flex-col min-h-[720px]">
        <div className="sticky top-24">
          <MeetSideMenu />
        </div>
      </div>
    </div>
  );
};

export default MeetList;
