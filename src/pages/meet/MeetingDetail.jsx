import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  // 이미지 파일 경로
import AgreementForm from '../../components/meet/MeetingJoin';;  // MeetingJoin.jsx에서 AgreementForm 불러오기
import MeetingContent from '../../components/meet/MeetingContent';  // MeetingContent 경로 수정
import RoundedButton from '../../components/button/RoundedButton';  // 경로 수정: RoundedButton 불러오기

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
    <MeetingContent 
      image={image}
      tags={tags}
      description={description}
      details={details}
    >
      {/* 오른쪽 1/3: 가입 신청 및 수정하기 버튼 */}
      <div className="flex flex-col space-y-4">
        {/* 가입 신청 버튼 클릭 시 모달 열기 */}
        <RoundedButton onClick={openModal}>
          가입 신청
        </RoundedButton>

        <Link to="/meeting/update" className="w-full">
          <RoundedButton>
            수정하기
          </RoundedButton>
        </Link>
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
    </MeetingContent>
  );
};

export default MeetingDetail;
