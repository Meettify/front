import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import MeetCard from "../../components/meet/MeetCard";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import SectionText from "../../components/text/SectionText";
import MeetListData from "../../components/meet/MeetListData";
import MeetListSearch from "../../components/meet/MeetListSearch";
import useNavigation from "../../hooks/useNavigation";
import RoundedButton from "../../components/button/RoundedButton";

const MeetList = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const query = searchParams.get("query") || "";
    const { goToMeetDetail, goToMeetInsert } = useNavigation();
    const [filteredMeetData, setFilteredMeetData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState(query.trim()); // 초기값으로 쿼리 사용

    useEffect(() => {
        const numericCategoryId = parseInt(categoryId, 10);
        
        // 검색어 정규화: 소문자 변환 및 공백 제거
        const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '');

        const filteredData = MeetListData.filter(meet => {
            const meetTitle = meet.title.toLowerCase().replace(/\s+/g, '');
            const meetDescription = meet.description.toLowerCase().replace(/\s+/g, '');

            return (
                (isNaN(numericCategoryId) || meet.categoryId === numericCategoryId) &&
                (meetTitle.includes(normalizedSearchTerm) || meetDescription.includes(normalizedSearchTerm))
            );
        });
        
        setFilteredMeetData(filteredData);
        setLoading(false);
    }, [categoryId, searchTerm]); // categoryId와 searchTerm에 따라 다시 필터링

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
                    value={searchTerm} // 현재 입력값 유지
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
                                    isMeetPage={true} // 여기서 true로 설정
                                    onTitleClick={() => goToMeetDetail(meet.id, categoryId)}
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
