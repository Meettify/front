import React from 'react';

const InputTag = ({ tags, setTags }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {tags.map((tag, index) => (
        <input
          key={index}
          value={tag}
          onChange={(e) => {
            const newTags = [...tags];
            newTags[index] = e.target.value;
            setTags(newTags);
          }}
          className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
        />
      ))}
    </div>
  );
};

export default InputTag;
