import React, { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import MeetSideMenu from '../../components/meet/MeetSideMenu';
import MeetCard from './MeetCard';
import SectionText from '../../components/text/SectionText';
import MeetCategoryData from './MeetCategoryData';
import MeetListData from './MeetListData'; // 모임 리스트 데이터 임포트
import MeetListSearch from '../../components/meet/MeetListSearch';

const MeetCategory = () => {
    const { goToCategoryList } = useNavigation();
    const isMeetPage = true;
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    const handleButtonClick = (categoryId) => {
        goToCategoryList(categoryId); // categoryId를 전달
    };

    // 검색어에 따라 필터링된 카테고리 데이터
    const filteredCategoryData = MeetCategoryData.filter(meet =>
        meet.title.toLowerCase().includes(searchTerm.toLowerCase().replace(/\s+/g, '')) // 공백 제거 및 대소문자 무시
    );

    // 검색어가 있을 경우 모임 데이터 필터링
    const filteredMeetData = searchTerm ? MeetListData.filter(meet =>
        meet.title.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, '')) // 공백 제거 및 대소문자 무시
    ) : [];

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
                    <div className="w-full justify-start"> {/* 검색창 고정 너비 설정 */}
                        <MeetListSearch 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full" // 전체 너비를 차지하게 설정
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
                                    isMeetPage={isMeetPage}
                                />
                            </div>
                        ))}
                    </div>
                    {filteredMeetData.length > 0 ? (
                        <div className='flex flex-wrap justify-between w-full mt-4'>
                            {filteredMeetData.map((meet) => (
                                <div 
                                    key={meet.id} 
                                    className="w-1/4 p-2" 
                                    onClick={() => handleButtonClick(meet.categoryId)} // 필요한 경우 카테고리 ID로 이동
                                >
                                    <MeetCard 
                                        meetId={meet.id} 
                                        image={meet.image} 
                                        title={meet.title} 
                                        description={meet.description} 
                                        tags={meet.tags}
                                        isMeetPage={isMeetPage}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        searchTerm && (
                            <div className="w-full text-center mt-4">검색 결과가 없습니다.</div>
                        )
                    )}
                </div>
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetCategory;
