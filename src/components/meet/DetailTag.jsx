import React from 'react';

const DetailTag = ({ tags }) => {
  // tags가 undefined거나 null이면 빈 배열로 처리
  const safeTags = tags || [];

  return (
    <div className="col-span-8">
      <div className="flex space-x-2 mb-4">
        {safeTags.length > 0 ? (
          safeTags.map((tag, index) => (
            <div 
              key={index} 
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
            >
              {tag}
            </div>
          ))
        ) : (
          <div className="text-gray-500">태그가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default DetailTag;
