import React from 'react';

const MeetingContent = ({ image, tags, description, details, children }) => {
  return (
    <div className="container mx-auto p-4 w-2/3"> {/* 공통 레이아웃 적용 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 왼쪽 2/3: 이미지 및 정보 */}
        <div className="col-span-8">
          <img src={image} alt="Emotion" className="w-full h-80 rounded-lg mb-4 object-contain" />

          <div className="flex space-x-2 mb-4">
            {tags.map((tag, index) => (
              <div key={index} className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
                {tag}
              </div>
            ))}
          </div>

          <div>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{description}</p>
          </div>

          {/* 설명 및 게시판 */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">러닝모임 설명</h2>
            <p>{details}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">게시판</h2>
            <ul>
              <li>공지: 모임 운영 수칙</li>
              <li>공지: 모임 운영 방침</li>
            </ul>
          </div>
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
