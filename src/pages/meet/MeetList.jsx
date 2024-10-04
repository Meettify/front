import React from "react";
import MeetCard from "../../components/meet/MeetCard";
import RoundedButton from "../../components/button/RoundedButton";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import useNavigation from "../../hooks/useNavigation";  

const MeetList = () => {
    const { goToMeetCreate, onJoinClick, goToMeetDetail, goToPostList } = useNavigation();

    const handleCreateButtonClick = () => {
        goToMeetCreate();
    };

    const handlePostButtonClick = () => {
        goToPostList(); // 게시판 페이지로 이동
    };

    // 예시 데이터
    const meetData = Array.from({ length: 9 });

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-2/3 bg-gray-100 flex flex-wrap justify-center p-2">
                <div className="text-4xl font-bold mb-6 w-full text-left">모임 둘러보기.</div>
                <div className="flex justify-between items-center mb-4 w-full">
                    <div className="flex space-x-2">
                        <RoundedButton onClick={handleCreateButtonClick}>모임 생성하기</RoundedButton>
                        <RoundedButton onClick={handlePostButtonClick}>모임 게시판</RoundedButton>
                    </div>
                </div>
                {meetData.map((_, index) => (
                    <div className="w-1/3 p-2" key={index}>
                        <MeetCard 
                            meetId={index} 
                            onJoinClick={onJoinClick} 
                            goToMeetDetail={goToMeetDetail}
                        />
                    </div>
                ))}
            </div>

            <div className="w-1/3">
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetList;
