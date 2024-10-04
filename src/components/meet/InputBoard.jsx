import React from 'react';

const InputBoard = ({ details, setDetails }) => {
  return (
    <textarea
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
      rows="5"
    />
  );
};

export default InputBoard;
