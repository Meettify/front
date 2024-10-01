import React from 'react';

const DetailDescription = ({ details }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold">러닝모임 설명</h2>
      <p>{details}</p>
    </div>
  );
};

export default DetailDescription;
