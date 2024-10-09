import React from "react";
import MeetJoin from "./MeetJoin";
import useNavigation from "../../hooks/useNavigation";

const MeetCard = ({ meetId, image, title, description, tags = [], isMeetPage, onTitleClick }) => {
    const { goToMeetList } = useNavigation();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 mt-4">
            <div className="bg-gray-500 h-36 flex items-center justify-center text-white">
                <img src={image} alt={title} className="bg-gray-500 h-36 w-full object-cover" />
            </div>
            <div className="p-4 text-left h-47">
                <h3 
                    className="font-bold text-lg mb-1 cursor-pointer" 
                    onClick={onTitleClick} // 외부에서 전달된 핸들러 호출
                >
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    {description}
                </p>
                {tags.length > 0 && (
                    <div className="text-gray-400 text-xs mb-4">
                        {tags.map((tag, index) => (
                            <span key={index} className="mr-1">#{tag}</span>
                        ))}
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">모임인원 0 / 20</span>
                    <div className="ml-auto">
                        {!isMeetPage && (
                            <MeetJoin 
                                meetId={meetId} 
                                buttonText={'가입 신청하기'}
                                onSubmit={() => console.log("가입 신청 완료")} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetCard;
