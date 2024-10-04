import React from 'react';
import DetailImage from './DetailImage';
import DetailTag from './DetailTag';
import DetailDescription from './DetailName';
import DetailBoard from './DetailBoard';

const MeetingContent = ({ image, tags, description, details, children }) => {
  return (
    <div className="container mx-auto p-4 w-2/3"> {/* 공통 레이아웃 적용 */}
      <div className="grid grid-cols-12 gap-4">
          
        {/* 이미지 부분 */}
        <DetailImage image={image} />

        {/* 태그 부분 */}
        <DetailTag tags={tags} />

        {/* 설명 부분 */}
        <DetailDescription description={description} />

        {/* 설명 및 게시판 부분 */}
        <DetailBoard details={details} />
      </div>

      {/* 게시판 밑에 동적으로 렌더링될 컴포넌트 */}
      <div className="mt-4">
        {children} {/* 게시판 아래에 들어갈 컴포넌트를 동적으로 렌더링 */}
      </div>
    </div>
  );
};

export default MeetingContent;
