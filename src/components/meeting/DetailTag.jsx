import React from 'react';

const DetailTag = ({ tags }) => {
  return (
    <div className="col-span-8">
      <div className="flex space-x-2 mb-4">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTag;
