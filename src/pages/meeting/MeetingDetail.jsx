import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emotionImage from '../../assets/emotion1.png';  // 이미지 파일 경로
import Recomend from '../../components/meeting/Recomend';
import AgreementForm from './MeetingJoin';  // MeetingJoin.jsx에서 AgreementForm 불러오기

const MeetingDetail = () => {
  // 상태 관리
  const [image, setImage] = useState(emotionImage);
  const [tags, setTags] = useState(['운동', '서울', '맴버80']);
  const [description, setDescription] = useState('종로 정겨운 러닝 모임');
  const [details, setDetails] = useState('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setImage(emotionImage);
    setTags(['운동', '서울', '맴버80']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, []);

  return (
    <div className="container mx-auto p-4 w-2/3">
      {/* 페이지 전체를 3등분으로 나눈 그리드 레이아웃 */}
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

        {/* 오른쪽 1/3: 가입 신청 및 수정하기 버튼 */}
        <div className="col-span-4">
          <div className="flex flex-col space-y-4">
            {/* 가입 신청 버튼 클릭 시 모달 열기 */}
            <button 
              onClick={openModal}
              className="bg-gray-100 h-10 w-full rounded-lg text-center flex items-center justify-center">
              가입 신청
            </button>

            <Link
              to="/meeting/update"
              className="bg-blue-500 text-white h-10 w-full rounded-lg text-center flex items-center justify-center"
            >
              수정하기
            </Link>
          </div>
        </div>
      </div>

      {/* 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            {/* 모달 내에 AgreementForm 포함 */}
            <AgreementForm /> {/* 동의 폼 컴포넌트 */}
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingDetail;
