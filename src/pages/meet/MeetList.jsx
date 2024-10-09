import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import RoundedButton from "../../components/button/RoundedButton";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import useNavigation from "../../hooks/useNavigation";  
import SectionText from "../../components/text/SectionText";
import MeetListData from "../../components/meet/MeetListData";
import MeetListSearch from "../../components/meet/MeetListSearch";

const MeetList = () => {
    const { goToMeetInsert, onJoinClick, goToMeetDetail } = useNavigation();
    const { categoryId } = useParams(); 

    const numericCategoryId = parseInt(categoryId, 10);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    const getMeetingsByCategoryId = (categoryId) => {
        if (!isNaN(categoryId)) {
            return MeetListData.filter(meet => meet.categoryId === categoryId);
        }
        return [];
    };

    const meetData = getMeetingsByCategoryId(numericCategoryId);

    // 검색어와 제목의 공백을 제거하고 필터링된 모임 데이터
    const filteredMeetData = meetData.filter(meet =>
        meet.title.replace(/\s+/g, '').toLowerCase().includes(searchTerm.replace(/\s+/g, '').toLowerCase()) // 공백 제거 후 비교
    );

    const handleCreateButtonClick = () => {
        goToMeetInsert();
    };

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-5/6 bg-gray-100 flex flex-col p-2">
                <div className="mb-2">
                    <SectionText 
                        title="모든 모임 , " 
                        subtitle="둘러보기 ."
                    />
                    <div className="flex flex-col mt-4">
                        <MeetListSearch onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="flex justify-end mt-2">
                            <RoundedButton onClick={handleCreateButtonClick}>모임 생성하기</RoundedButton>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-start mt-2">
                    {filteredMeetData.length > 0 ? (
                        filteredMeetData.map((meet) => (
                            <div className="w-1/4 p-2" key={meet.id}>
                                <MeetCard 
                                    meetId={meet.id} 
                                    image={meet.image} 
                                    title={meet.title} 
                                    description={meet.description} 
                                    tags={meet.tags}
                                    onJoinClick={onJoinClick} 
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
