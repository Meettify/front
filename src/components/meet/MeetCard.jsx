import React, { useState } from "react";
import MeetJoin from "./MeetJoin";
import useNavigation from "../../hooks/useNavigation";

const MeetCard = ({ meetId, imageUrls, title, description, tags = [], isMeetPage, onTitleClick }) => {
    const { goToMeetList } = useNavigation();
    const [imgError, setImgError] = useState(false);

    const handleImgError = () => {
        setImgError(true);
    };

    // 첫 번째 이미지 URL을 가져오기
    const imageUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 mt-4">
            <div className="bg-gray-500 h-36 flex items-center justify-center text-white">
                {imgError || !imageUrl ? (
                    <div className="bg-gray-300 h-full w-full flex items-center justify-center">이미지 없음</div>
                ) : (
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="h-36 w-full object-cover"
                        onError={handleImgError}
                    />
                )}
            </div>
            <div className="p-4 text-left h-47">
                <h3 
                    className="font-bold text-lg mb-1 cursor-pointer" 
                    onClick={onTitleClick}
                >
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
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
