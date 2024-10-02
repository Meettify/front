import React from 'react';

const DetailImage = ({ image }) => {
  return (
    <div className="col-span-8">
      <img 
        src={image} 
        alt="Emotion" 
        className="w-full h-80 rounded-lg mb-4 object-contain" 
      />
    </div>
  );
};

export default DetailImage;
