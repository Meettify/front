import React, { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import MeetSideMenu from './MeetSideMenu';
import MeetCard from './MeetCard';
import SectionText from '../../components/text/SectionText';
import MeetCategoryData from './MeetCategoryData';
import MeetListSearch from './MeetListSearch';

const MeetCategory = () => {
    const { goToCategoryList, goToMeetDetail } = useNavigation();   
    const [searchTerm, setSearchTerm] = useState("");

    const handleButtonClick = (id, isCategory, categoryTitle) => {
        if (isCategory && categoryTitle) {
            goToCategoryList(categoryTitle);
        } else {
            goToMeetDetail(id, categoryTitle);
        }
    };

    const normalizeString = (str) => {
        return str.toLowerCase().replace(/\s+/g, '');
    };

    const filteredCategoryData = searchTerm === ""
        ? MeetCategoryData
        : MeetCategoryData.filter(meet =>
            normalizeString(meet.categoryTitle).includes(normalizeString(searchTerm))
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
                <div className="w-5/6 bg-gray-100 flex flex-wrap p-2">
                    <div className='flex flex-wrap justify-start w-full mt-4'>
                        {filteredCategoryData.length > 0 ? (
                            filteredCategoryData.map((meet) => (
                                <div 
                                    key={meet.categoryId} 
                                    className="w-1/4 p-2" 
                                    onClick={() => handleButtonClick(meet.categoryId, true, meet.categoryTitle)}
                                >
                                    <MeetCard 
                                        meetId={meet.categoryId} 
                                        imageUrls={[meet.image]}  // 배열로 변경
                                        title={meet.title} 
                                        description={meet.description} 
                                        tags={meet.tags} 
                                        isMeetPage={true} 
                                        onTitleClick={() => goToCategoryList(meet.categoryTitle)} 
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
