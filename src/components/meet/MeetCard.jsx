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
  onCardClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col h-full"
      onClick={onCardClick}
    >
      <div className="h-40 md:h-48 w-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {imgError || !imageUrl ? (
          <span className="text-gray-500">이미지 없음</span>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="font-bold text-lg text-gray-800 text-center line-clamp-1">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 text-gray-400 text-xs mt-2">
            {tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        )}

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
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetCard;
