import React, { useState } from 'react';

const MeetChatList = ({ onUserSelect }) => {  // onUserSelect를 props로 받음
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id, username) => {
    setSelectedId(id);
    onUserSelect(username); // 선택된 유저 이름을 상위 컴포넌트로 전달
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
    <div className="flex-none w-full md:w-1/4 mx-auto h-full md:h-5/6 overflow-hidden px-10">
      <div className="flex flex-col mt-5 overflow-y-auto h-full">
        {chatItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${selectedId === item.id ? 'border-l-4 border-blue-400' : ''}`}
            onClick={() => handleClick(item.id, item.username)}  // 클릭 시 유저 이름 전달
          >
            <div className="w-full">
              <div className="text-sm font-semibold">{item.username}</div>
              <span className="text-gray-500 text-sm">{item.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetChatList;
