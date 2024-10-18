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
        console.log(`Navigating to ${isCategory ? 'categoryTitle' : 'meetId'}: ${id}`);
        console.log(`Category Title: ${categoryTitle}`); // 확인
        if (isCategory && categoryTitle) {
            goToCategoryList(categoryTitle);
        } else {
            console.log(`Navigating to meet with ID: ${id}`);
            goToMeetDetail(id, categoryTitle);
        }
    };

    const normalizeString = (str) => {
        return str.toLowerCase().replace(/\s+/g, '');
    };

    const filteredCategoryData = MeetCategoryData.filter(meet =>
        normalizeString(meet.title).includes(normalizeString(searchTerm))
    );

    const combinedResults = searchTerm === ""
        ? filteredCategoryData.map(meet => ({ ...meet, isCategory: true, categoryTitle: meet.categoryTitle }))
        : filteredCategoryData.map(meet => ({ ...meet, categoryTitle: meet.categoryTitle }));

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
                            value={searchTerm} 
                            className="w-full"
                        />
                    </div>
                    <div className='flex flex-wrap justify-start w-full mt-4'>
                        {combinedResults.length > 0 ? (
                            combinedResults.map((meet) => (
                                <div 
                                    key={meet.id || meet.categoryTitle} 
                                    className="w-1/4 p-2" 
                                    onClick={() => handleButtonClick(meet.id || meet.categoryId, meet.isCategory, meet.categoryTitle)}
                                >
                                    <MeetCard 
                                        meetId={meet.categoryId || meet.id} 
                                        image={meet.image} 
                                        title={meet.title} 
                                        description={meet.description} 
                                        tags={meet.tags} 
                                        isMeetPage={meet.isCategory} 
                                        onTitleClick={() => {
                                            if (meet.isCategory) {
                                                goToCategoryList(meet.categoryTitle);
                                            } else {
                                                goToMeetDetail(meet.id, meet.categoryTitle);
                                            }
                                        }} 
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
