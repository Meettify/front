import React from "react";
import MeetCard from "../../components/meet/MeetCard";
import RoundedButton from "../../components/button/RoundedButton";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import useNavigation from "../../hooks/useNavigation";  
import SectionText from "../../components/text/SectionText";

const MeetList = () => {
    const { goToMeetInsert, onJoinClick, goToMeetDetail } = useNavigation();

    const handleCreateButtonClick = () => {
        goToMeetInsert();
    };

    // 예시 데이터
    const meetData = Array.from({ length: 9 });

    return (
        <div className="container mx-auto mt-20 w-full flex flex-col">
            <div className="w-full mb-4">
                <SectionText 
                    title="모든 리스트, "
                    subtitle="살펴보기 ."
                />
            </div>
            <div className="flex w-full"> {/* 가로 배열을 위한 flex 추가 */}
                <div className="w-full md:w-2/3 lg:w-2/3 bg-gray-100 flex flex-col p-2"> {/* MeetList 2/3 */}
                    <div className="flex justify-end mb-4 w-full"> {/* 버튼을 오른쪽 정렬 */}
                        <RoundedButton onClick={handleCreateButtonClick}>모임 생성하기</RoundedButton>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {meetData.map((_, index) => (
                            <div className="w-full sm:w-1/2 md:w-1/3 p-2" key={index}> {/* 모바일: 1개, 641px 이상: 2개, 1024px 이상: 3개 */}
                                <MeetCard 
                                    meetId={index} 
                                    onJoinClick={onJoinClick} 
                                    goToMeetDetail={goToMeetDetail}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block md:w-1/3 lg:w-1/3 p-2"> {/* MeetSideMenu 1/3, 모바일에서도 보이도록 설정 */}
                    <MeetSideMenu className="w-full" />
                </div>
                <div className="block md:hidden w-full p-2"> {/* 모바일에서 MeetSideMenu 1/3 영역 차지 */}
                    <MeetSideMenu className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default MeetList;
