import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';  // Header 컴포넌트 import
import emotionImage from '../../assets/emotion1.png';  // 이미지 파일 경로

const MeetingDetail = () => {
  // 상태 관리
  const [image, setImage] = useState(emotionImage);
  const [tags, setTags] = useState(['운동', '서울', '맴버80']);
  const [description, setDescription] = useState('종로 정겨운 러닝 모임');
  const [details, setDetails] = useState('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');

  // useEffect를 사용하여 초기값을 설정 (나중에 API로 변경 가능)
  useEffect(() => {
    // 나중에 백엔드에서 데이터를 불러올 때 이곳에 API 호출 코드를 넣습니다.
    // 현재는 고정값을 사용하고 있습니다.
    setImage(emotionImage);
    setTags(['운동', '서울', '맴버80']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, []);  // 빈 배열을 주면 컴포넌트가 처음 렌더링될 때 한 번만 실행

  return (
    <div className="container mx-auto p-4">
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-12 gap-4">
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
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="col-span-4">
          <div className="bg-gray-200 h-96 mb-4 rounded-lg">광고</div>
          <button className="bg-gray-100 h-8 w-full rounded-lg text-center flex items-center justify-center">
            가입 신청
          </button>

          {/* 수정 버튼 */}
          <Link
            to="/meetingupdate"
            className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center mt-2"
          >
            수정하기
          </Link>
        </div>
      </div>

      {/* 설명 및 게시판 */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">러닝모임</h2>
            <p>{details}</p>
          </div>
        </div>
        <div className="col-span-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">게시판</h2>
            <ul>
              <li>공지 모임 운영 수칙</li>
              <li>공지 모임 운영 방침</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
