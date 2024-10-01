import React from 'react';

const DetailImage = ({ image }) => {
  return (
    <img 
      src={image} 
      alt="Emotion" 
      className="w-full h-80 rounded-lg mb-4 object-contain" 
    />
  );
};

export default DetailImage;
