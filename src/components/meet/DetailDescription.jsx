import React from 'react';

const DetailDescription = ({ details }) => {
  return (
    <div className="col-span-8">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold">모임  설명</h2>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default DetailDescription;
