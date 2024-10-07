import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import RoundedButton from '../../components/button/RoundedButton';  

const DetailBoard = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleMoreClick = () => {
    navigate('/meet/post'); // MeetComm 페이지로 이동
  };

  return (
    <div className="col-span-8">
      <div className="bg-gray-100 p-4 rounded-lg relative">
        {/* 게시판 제목과 버튼을 담는 영역 */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">게시판</h2>
          <RoundedButton onClick={handleMoreClick}>더보기</RoundedButton>
        </div>

        <ul>
          <li>공지: 모임 운영 수칙</li>
          <li>공지: 모임 운영 방침</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailBoard;
