import React, { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import MeetSideMenu from './MeetSideMenu';
import MeetCard from './MeetCard';
import SectionText from '../../components/text/SectionText';
import MeetCategoryData from './MeetCategoryData';
import MeetListSearch from './MeetListSearch';

const MeetCategory = () => {
    const { goToCategoryList } = useNavigation(); // useNavigation 훅 사용
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    const handleButtonClick = (categoryId) => {
        console.log(`Navigating to categoryId: ${categoryId}`);
        goToCategoryList(categoryId); // 쿼리 문자열로 전달
    };

    // 검색어에 따라 필터링된 카테고리 데이터
    const filteredCategoryData = MeetCategoryData.filter(meet =>
        meet.title.toLowerCase().includes(searchTerm.toLowerCase().replace(/\s+/g, '')) // 공백 제거 및 대소문자 무시
    );

    return (
        <div className="bg-gray-100 flex-1 h-full">
            <div className="container mx-auto mt-20 w-full">
                <SectionText 
                    title="모든 모임." 
                    subtitle="오늘도, 소통하기 좋은 날." 
                />
            </div>
            <div className="container mx-auto w-full flex">
                <div className="w-5/6 bg-gray-100 flex flex-wrap justify-center p-2">
                    <div className="w-full justify-start">
                        <MeetListSearch 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full"
                        />
                    </div>
                    <div className='flex flex-wrap justify-between w-full mt-4'>
                        {filteredCategoryData.map((meet) => ( 
                            <div 
                                key={meet.categoryId} 
                                className="w-1/4 p-2" 
                                onClick={() => handleButtonClick(meet.categoryId)} // 클릭 시 categoryId 전달
                            >
                                <MeetCard 
                                    meetId={meet.categoryId} 
                                    image={meet.image} 
                                    title={meet.title} 
                                    description={meet.description} 
                                    tags={meet.tags}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetCategory;
