import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"; 
import MeetCard from "../../components/meet/MeetCard";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import SectionText from "../../components/text/SectionText";
import MeetListData from "../../components/meet/MeetListData"; // 모임 리스트 데이터 임포트
import MeetListSearch from "../../components/meet/MeetListSearch";
import useNavigation from "../../hooks/useNavigation"; // useNavigation 훅 임포트

const MeetList = () => {
    const { categoryId } = useParams(); // URL 파라미터에서 categoryId 가져오기
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || ""; // 검색어 가져오기
    const { goToMeetDetail } = useNavigation(); // 내비게이션 함수 가져오기
    const [filteredMeetData, setFilteredMeetData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState(query); // 검색어 상태 추가

    useEffect(() => {
        const numericCategoryId = parseInt(categoryId, 10);
        if (!isNaN(numericCategoryId)) {
            const meetData = MeetListData.filter(meet => meet.categoryId === numericCategoryId);
            setFilteredMeetData(meetData);
        } else {
            setFilteredMeetData(MeetListData);
        }
        setLoading(false);
    }, [categoryId]);

    // 검색어에 따라 필터링된 데이터 생성
    const getFilteredData = () => {
        return filteredMeetData.filter(meet =>
            meet.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            meet.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-5/6 bg-gray-100 flex flex-col p-2">
                <SectionText 
                    title="모임 리스트." 
                    subtitle="선택한 카테고리의 모임입니다." 
                />
                <MeetListSearch onChange={setSearchTerm} /> {/* 검색어 상태 업데이트 */}

                <div className="flex flex-wrap justify-start mt-2">
                    {loading ? (
                        <div className="w-full text-center mt-4">로딩 중...</div>
                    ) : getFilteredData().length > 0 ? (
                        getFilteredData().map((meet) => (
                            <div 
                                className="w-1/4 p-2" 
                                key={meet.id}
                            >
                                <MeetCard 
                                    meetId={meet.id} 
                                    image={meet.image} 
                                    title={meet.title} 
                                    description={meet.description} 
                                    tags={meet.tags}
                                    onTitleClick={() => goToMeetDetail(meet.id)} // 제목 클릭 시 상세 페이지로 이동
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center mt-4">모임이 없습니다.</div>
                    )}
                </div>
            </div>
            <MeetSideMenu />
        </div>
    );
};

export default MeetList;