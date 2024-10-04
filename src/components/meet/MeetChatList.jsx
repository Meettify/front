import React, { useState } from 'react';

const MeetChatList = () => {
  const [selectedId, setSelectedId] = useState(null); // 클릭된 항목을 저장할 상태

  const handleClick = (id) => {
    setSelectedId(id); // 클릭된 항목의 ID를 저장
  };

  const chatItems = [
    { id: 1, username: 'Luis1994', message: 'Pick me at 9:00 Am' },
    { id: 2, username: 'Everest Trip 2021', message: 'Hi Sam, Welcome' },
    { id: 3, username: 'MERN Stack', message: 'Lusi : Thanks Everyone' },
    { id: 4, username: 'Javascript Indonesia', message: 'Evan : someone can fix this' },
    { id: 5, username: 'Javascript Indonesia', message: 'Evan : someone can fix this' },
    { id: 6, username: 'Javascript Indonesia', message: 'Evan : someone can fix this' },
  ];

  return (
    <div className="flex-none w-1/4"> 
      <div className="flex flex-col mt-5 overflow-y-auto">
        {chatItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${selectedId === item.id ? 'border-l-4 border-blue-400' : ''}`} // 클릭된 항목에만 스타일 추가
            onClick={() => handleClick(item.id)} // 클릭 이벤트 핸들러
          >
            <div className="w-full">
              <div className="text-lg font-semibold">{item.username}</div>
              <span className="text-gray-500">{item.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetChatList;
