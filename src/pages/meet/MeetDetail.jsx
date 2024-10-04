import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  // 이미지 파일 경로
import AgreementForm from '../../components/meet/MeetJoin';  // MeetingJoin.jsx에서 AgreementForm 불러오기
import MeetContent from '../../components/meet/MeetContent';  
import RoundedButton from '../../components/button/RoundedButton';  // 경로 수정: RoundedButton 불러오기

const MeetDetail = () => {
  // 상태 관리
  const [image, setImage] = useState(emotionImage);
  const [tags, setTags] = useState(['운동', '서울']);
  const [description, setDescription] = useState('종로 정겨운 러닝 모임');
  const [details, setDetails] = useState('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 회원 상태 및 모임장 상태 관리
  const [isMember, setIsMember] = useState(true); // 비회원 여부 설정 (false는 비회원)
  const [isHost, setIsHost] = useState(true); // 모임장 여부 설정 (false는 모임장 아님)

  // 모달 열기/닫기 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setImage(emotionImage);
    setTags(['운동', '서울']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, []);

  return (
    <div className="flex flex-col">
      <MeetContent 
        image={image}
        tags={tags}
        description={description}
        details={details}
      />
      
      {/* 컨텐츠 아래에 위치한 버튼 */}
      <div className="flex justify-center space-x-4 p-4 mt-4">
        {/* 비회원일 경우 가입 신청 버튼 */}
        {!isMember && !isHost && (
          <RoundedButton onClick={openModal}>
            가입 신청
          </RoundedButton>
        )}

        {/* 모임장일 경우 수정하기 버튼 */}
        {isHost && (
          <Link to="/meet/update">
            <RoundedButton>
              수정하기
            </RoundedButton>
          </Link>
        )}
      </div>

      {/* 모달창 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            {/* 모달 내에 AgreementForm 포함 */}
            <AgreementForm onSubmit={closeModal} /> {/* closeModal 전달 */}
            
            <div className="flex justify-end mt-4">
              <RoundedButton onClick={closeModal} style={{ backgroundColor: 'red', color: 'white' }}>
                취소
              </RoundedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetDetail;
