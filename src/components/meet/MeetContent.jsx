import React from 'react';
import DetailImage from './DetailImage';
import DetailTag from './DetailTag';
import DetailDescription from './DetailName';
import DetailBoard from './DetailBoard';

const MeetingContent = ({ image, tags, description, details, children }) => {
  return (
    <div className="container mx-auto p-4 w-2/3"> {/* 공통 레이아웃 적용 */}
      <div className="grid grid-cols-12 gap-4">
          
        <DetailImage image={image} />

        <DetailTag tags={tags} />

        <DetailDescription description={description} />

        <DetailBoard details={details} />
      </div>


      <div className="mt-4">
        {children} 
      </div>
    </div>
  );
};

export default MeetingContent;
