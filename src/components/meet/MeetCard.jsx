import React from "react";
import MeetJoin from "./MeetJoin"; // MeetJoin 컴포넌트 임포트
import useNavigation from "../../hooks/useNavigation";  // useNavigation import

const MeetCard = ({ meetId }) => {
    const { goToMeetDetail } = useNavigation();  // 상세 페이지 이동 훅 사용

    const handleTitleClick = () => {
        goToMeetDetail(meetId); // 제목 클릭 시 상세 페이지로 이동
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
                        {/* MeetJoin 컴포넌트를 사용하여 가입 신청 처리 */}
                        <MeetJoin meetId={meetId} onSubmit={() => console.log("가입 신청 완료")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetCard;
