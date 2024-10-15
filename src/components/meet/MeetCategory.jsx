import React, { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import MeetSideMenu from './MeetSideMenu';
import MeetCard from './MeetCard';
import SectionText from '../../components/text/SectionText';
import MeetCategoryData from './MeetCategoryData';
import MeetListData from './MeetListData';
import MeetListSearch from './MeetListSearch';

const MeetCategory = () => {
    const { goToCategoryList } = useNavigation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleButtonClick = (id, isCategory) => {
        console.log(`Navigating to ${isCategory ? 'categoryId' : 'meetId'}: ${id}`);
        if (isCategory) {
            goToCategoryList(id);
        } else {
            console.log(`Navigating to meet with ID: ${id}`);
        }
    };

    const normalizeString = (str) => {
        return str.toLowerCase().replace(/\s+/g, ''); // 소문자 변환 및 공백 제거
    };

    // 카테고리 및 모임 데이터 필터링
    const filteredCategoryData = MeetCategoryData.filter(meet =>
        normalizeString(meet.title).includes(normalizeString(searchTerm))
    );

    const filteredMeetListData = MeetListData.filter(meet =>
        normalizeString(meet.title).includes(normalizeString(searchTerm))
    );

    // 검색어가 없을 때는 카테고리만 보이도록
    const combinedResults = searchTerm === ""
        ? filteredCategoryData.map(meet => ({ ...meet, isCategory: true })) // 카테고리만 표시
        : filteredMeetListData.map(meet => ({ ...meet, isCategory: false })); // 제목에 맞는 모임 표시

    return (
        <div className="bg-gray-100 flex-1 h-full">
            <div className="container mx-auto mt-20 w-full">
                <SectionText 
                    title="모든 모임." 
                    subtitle="오늘도, 소통하기 좋은 날." 
                />
            </div>
            <div className="container mx-auto w-full flex">
                <div className="w-5/6 bg-gray-100 flex flex-wrap p-2">
                    <div className="w-full justify-start">
                        <MeetListSearch 
                            onChange={(value) => setSearchTerm(value)} 
                            value={searchTerm} // 검색어 유지
                            className="w-full"
                        />
                    </div>
                    <div className='flex flex-wrap justify-start w-full mt-4'>
                        {combinedResults.length > 0 ? (
                            combinedResults.map((meet) => ( 
                                <div 
                                    key={meet.id || meet.categoryId} // id가 없을 경우 categoryId 사용
                                    className="w-1/4 p-2" 
                                    onClick={() => handleButtonClick(meet.id || meet.categoryId, meet.isCategory)} // 클릭 시 ID에 따라 행동
                                >
                                    <MeetCard 
                                        meetId={meet.categoryId || meet.id} 
                                        image={meet.image} 
                                        title={meet.title} 
                                        description={meet.description} 
                                        tags={meet.tags} 
                                        isMeetPage={true} // 여기서 true로 설정
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
        </div>
    );
};

export default MeetCategory;
