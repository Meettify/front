// src/components/meet/MeetCategoryCard.jsx
import React, { useState } from "react";

const MeetCategoryCard = ({ imageUrls = [], title, onCardClick }) => {
  const [imgError, setImgError] = useState(false);
  const image = imageUrls.length > 0 ? imageUrls[0] : null;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col cursor-pointer"
      onClick={onCardClick} // ✅ 수정: onClick → onCardClick
    >
      <div className="h-40 md:h-48 w-full overflow-hidden">
        {imgError || !image ? (
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            이미지 없음
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="p-4 text-center font-semibold text-gray-800">{title}</div>
    </div>
  );
};

export default MeetCategoryCard;
