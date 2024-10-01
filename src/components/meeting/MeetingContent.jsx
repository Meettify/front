import React from 'react';
import DetailImage from './DetailImage';
import DetailTag from './DetailTag';
import DetailDescription from './DetailDescription';  // 새로 생성된 DetailDescription 불러오기
import DetailBoard from './DetailBoard';  // 수정된 DetailBoard 불러오기

const MeetingContent = ({ image, tags, details, children }) => {
  return (
    <div className="container mx-auto p-4 w-2/3"> {/* 공통 레이아웃 적용 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 왼쪽 2/3: 이미지 및 정보 */}
        <div className="col-span-8">
          {/* 이미지 부분 */}
          <DetailImage image={image} />

          {/* 태그 부분 */}
          <DetailTag tags={tags} />

          {/* 모임 설명 부분 */}
          <DetailDescription details={details} />  {/* 모임 설명 분리 */}

          {/* 게시판 부분 */}
          <DetailBoard />  {/* 게시판 컴포넌트 */}
        </div>

        {/* 오른쪽 1/3 부분: 추가적인 컨텐츠를 렌더링 */}
        <div className="col-span-4">
          {children} {/* 오른쪽 1/3에 들어갈 컴포넌트를 동적으로 렌더링 */}
        </div>
      </div>
    </div>
  );
};

export default MeetingContent;
