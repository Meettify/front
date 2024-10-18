import React from 'react';

const InputDescription = ({ description, setDescription }) => {
  return (
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
      rows="3"
      placeholder="모임 설명을 입력하세요"  // placeholder 추가
    />
  );
};

export default InputDescription;
