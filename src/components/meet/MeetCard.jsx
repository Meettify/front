import React, { useState } from "react";
import MeetJoin from "./MeetJoin";

const MeetCard = ({
  meetId,
  imageUrls = [],
  title,
  description,
  tags = [],
  isMeetPage = false,
  isMember = false,
  onCardClick, // ✅ 클릭 이벤트는 여기로 받음
}) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col h-full cursor-pointer"
      onClick={onCardClick} // ✅ 카드 전체 클릭
    >
      {/* 이미지 */}
      <div className="h-40 md:h-48 w-full overflow-hidden">
        {imgError || !imageUrl ? (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            이미지 없음
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={handleImgError}
          />
        )}
      </div>

      {/* 텍스트 내용 */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="font-bold text-lg text-gray-800 text-center">{title}</h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 text-gray-400 text-xs">
            {tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        )}

        {/* 가입신청 버튼 */}
        {!isMeetPage && (
          <div className="mt-4">
            {isMember ? (
              <div className="text-green-500 text-center font-semibold">
                가입 완료
              </div>
            ) : (
              <MeetJoin
                meetId={meetId}
                onSubmit={() => console.log("가입 신청 완료")}
                className="w-full"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetCard;
