import React from "react";
import RoundedButton from "../button/RoundedButton";

const MeetCard = ({ meetId, onJoinClick, goToMeetDetail }) => {
    const handleTitleClick = () => {
        goToMeetDetail(meetId); // 제목 클릭 시 상세 페이지로 이동
    };

    const handleJoinClick = (event) => {
        event.stopPropagation(); // 클릭 이벤트의 전파를 막음
        onJoinClick(meetId); // 가입 처리
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 mt-4">
            <div className="bg-gray-500 h-36 flex items-center justify-center text-white">
                커버 이미지
            </div>
            <div className="p-4 text-left h-47">
                <h3 className="font-bold text-lg mb-1 cursor-pointer" onClick={handleTitleClick}>
                    모임명
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    모임 소개글 (모든 카테고리. 언제든, 소통하기...)
                </p>
                <div className="text-gray-400 text-xs mb-4">
                    #태그 #세글자 #네글자임
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">모임인원 0 / 20</span>
                    <div className="ml-auto">
                        <RoundedButton 
                            onClick={handleJoinClick} 
                            style={{ padding: '7px 15px', fontSize: '12px' }}
                        >
                            가입하기
                        </RoundedButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetCard;
