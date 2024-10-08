import React from 'react';
import exercise from '../../assets/images/meet/exercise.jpg';
import RoundedButton from '../button/RoundedButton';
import useNavigation from '../../hooks/useNavigation';
import MeetSideMenu from '../../components/meet/MeetSideMenu';
import SectionTitle from '../../components/text/SectionText';

const MeetCategory = () => {
    const { goToCategoryList } = useNavigation();

    const handleButtonClick = (category) => {
        goToCategoryList(category); // 클릭된 카테고리로 이동
    };

    return (
        <div className="container mx-auto mt-20 w-full flex flex-col">
            {/* SectionTitle을 최상위 div 밖으로 이동 */}
            <div className="w-full mb-4">
                <SectionTitle 
                    title="모든 모임."
                    subtitle="오늘도, 소통하기 좋은 날."
                />
            </div>
            <div className="flex w-full"> 
                {/* 왼쪽은 MeetCategory */}
                <div className="w-2/3 p-2 flex flex-col">
                    <div className="bg-gray-100 flex flex-wrap justify-center">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col text-gray-700 bg-white shadow-md rounded-xl m-2 p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" 
                            >
                                <div className="mx-auto overflow-hidden bg-white rounded-xl h-40">
                                    <img
                                        src={exercise}
                                        alt="card-image" 
                                        className="object-cover w-full h-full" 
                                    />
                                </div>
                                <div className="p-1 text-center">
                                    <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900">
                                        Exercise
                                    </p>
                                    <p className="block font-sans text-sm leading-normal text-gray-700">
                                        운동에 관한 모임들
                                    </p>
                                </div>
                                <div className="flex justify-center p-1">
                                    <RoundedButton 
                                        onClick={() => handleButtonClick("")} 
                                        className="px-4 py-2 border border-gray-500 text-gray-500 rounded-full text-md transition-colors duration-200 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                                    >
                                        Go to List
                                    </RoundedButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 오른쪽은 MeetSideMenu */}
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetCategory;
