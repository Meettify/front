import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import SectionText from "../../components/text/SectionText";
import MeetListSearch from "../../components/meet/MeetListSearch";
import useNavigation from "../../hooks/useNavigation";
import { getMeetList } from "../../api/meetAPI";

const MeetList = () => {
  const [searchParams] = useSearchParams();
  const rawCategory = searchParams.get("category") || "";
  const category = rawCategory.toUpperCase();
  const totalKeyword = searchParams.get("totalKeyword") || "";
  const { goToMeetDetail, goToMeetInsert } = useNavigation();

  const [meetData, setMeetData] = useState([]);
  const [filteredMeetData, setFilteredMeetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(totalKeyword.trim());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const prevPageRef = useRef(currentPage);

  // 프론트에서 페이지 기준 관리
  useEffect(() => {
    const fetchMeetData = async () => {
      if (currentPage < 1) return;

      setLoading(true);
      try {
        console.log("현재 페이지 : ", currentPage);
        const data = await getMeetList(currentPage, 12, category, searchTerm);
        if (!data) throw new Error("데이터가 없습니다");

        setMeetData(data.meets || []);
        setTotalPages(data.totalPage || 1);
        setHasNext(data.hasNextPage);
        setHasPrev(data.hasPreviousPage);
        setIsFirst(data.isFirstPage);
        setIsLast(data.isLastPage);
      } catch (e) {
        console.error("🚨 meet API 에러:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetData();
  }, [category, currentPage, searchTerm]);

  useEffect(() => {
    const filteredData = meetData.filter((meet) =>
      meet.meetName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeetData(filteredData);
  }, [searchTerm, meetData]);

  const getPageNumbers = (currentPage, totalPages) => {
    // 한 번에 보여줄 페이지 번호 수
    const blockSize = 5;
    // 현재 블록 계산
    // currentBlock = Math.floor((5 - 1) / 5) = 0
    const currentBlock = Math.floor((currentPage - 1) / blockSize);
    // 해당 블록의 시작 페이지
    // start = 0 * 5 + 1 = 1
    const start = currentBlock * blockSize + 1;
    // 끝 페이지 (총 페이지 수를 넘지 않도록)
    // end = min(1 + 5 - 1, totalPages) = 5 (예: totalPages가 20이라고 가정)
    const end = Math.min(start + blockSize - 1, totalPages);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container mx-auto mt-20 w-full min-h-screen flex">
      {/* 왼쪽: 모임 카드 리스트 */}
      <div className="w-5/6 flex flex-col p-2 min-h-[1000px]">
        <div className="flex justify-between items-center mb-4 px-2">
          <SectionText
            title="모임 리스트."
            subtitle="선택한 카테고리의 모임입니다."
          />
          <button
            onClick={goToMeetInsert}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition hidden md:inline-block"
          >
            모임 생성하기
          </button>
        </div>

        <MeetListSearch
          onChange={(value) => {
            if (value !== searchTerm) {
              setSearchTerm(value);
            }
          }}
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
          <div className="flex justify-center items-center space-x-2 my-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!hasPrev}
              className="px-3 py-1 border rounded disabled:text-gray-400"
            >
              이전
            </button>

            {getPageNumbers(currentPage, totalPages).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!hasNext}
              className="px-3 py-1 border rounded disabled:text-gray-400"
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
