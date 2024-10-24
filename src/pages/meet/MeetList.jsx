import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import MeetCard from "../../components/meet/MeetCard";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import SectionText from "../../components/text/SectionText";
import MeetListSearch from "../../components/meet/MeetListSearch";
import useNavigation from "../../hooks/useNavigation";
import RoundedButton from "../../components/button/RoundedButton";
import { getMeetList } from "../../api/meetApi";

const MeetList = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category") || ""; 
    const totalKeyword = searchParams.get("totalKeyword") || "";
    const { goToMeetDetail, goToMeetInsert } = useNavigation();
    const [filteredMeetData, setFilteredMeetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(totalKeyword.trim());
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태

    useEffect(() => {
        const fetchMeetData = async () => {
            setLoading(true);
            try {
                const data = await getMeetList(currentPage, 10, "meetName", searchTerm || "ALL", category);
                console.log("API 응답 데이터:", data);
                setFilteredMeetData(data.content || []); // 데이터 상태에 저장
                setTotalPages(data.totalPages); // 총 페이지 수 설정
            } catch (error) {
                console.error("API 호출 중 오류:", error);
            } finally {
                setLoading(false);
            }
        };    

        fetchMeetData();
    }, [searchTerm, category, currentPage]); // 검색어와 카테고리, 현재 페이지 변경 시 호출

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-5/6 bg-gray-100 flex flex-col p-2">
                <div className="flex justify-between items-center mb-4">
                    <SectionText title="모임 리스트." subtitle="선택한 카테고리의 모임입니다." />
                    <RoundedButton onClick={goToMeetInsert}>
                        모임 생성하기
                    </RoundedButton>
                </div>
                <MeetListSearch 
                    onChange={(value) => setSearchTerm(value)} 
                    value={searchTerm} 
                />
                <div className="flex flex-wrap justify-start mt-2">
                    {loading ? (
                        <div className="w-full text-center mt-4">로딩 중...</div>
                    ) : filteredMeetData.length > 0 ? (
                        filteredMeetData.map((meet) => (
                            <div className="w-1/4 p-2" key={meet.id}>
                                <MeetCard 
                                    meetId={meet.id} 
                                    image={meet.image} 
                                    title={meet.title} 
                                    description={meet.description} 
                                    tags={meet.tags} 
                                    isMeetPage={false}
                                    onTitleClick={() => goToMeetDetail(meet.id, category)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center mt-4">모임이 없습니다.</div>
                    )}
                </div>
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
                        disabled={currentPage === 0}
                        className="mr-2 bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    >
                        이전
                    </button>
                    <span>{currentPage + 1} / {totalPages}</span>
                    <button 
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} 
                        disabled={currentPage + 1 >= totalPages}
                        className="ml-2 bg-blue-500 text-white py-1 px-4 rounded disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            </div>
            <MeetSideMenu />
        </div>
    );
};

export default MeetList;
