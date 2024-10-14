import React from 'react';
import DetailImage from '../../components/meet/DetailImage';  // 기존 이미지 컴포넌트

const InputImage = ({ image, setImage }) => {
  return (
    <div className="mb-4">
      <DetailImage image={image} />  {/* 이미지 미리보기 */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} 
        className="mt-2"
      />
    </div>
  );
};

export default InputImage;