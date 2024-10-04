import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  
import AgreementForm from '../../components/meet/MeetJoin';  
import MeetContent from '../../components/meet/MeetContent';  
import RoundedButton from '../../components/button/RoundedButton';  

const MeetDetail = () => {
  const { meetId } = useParams();  // URL에서 meetId를 가져옴
  
  // 상태 관리
  const [image, setImage] = useState(emotionImage);
  const [tags, setTags] = useState(['운동', '서울']);
  const [description, setDescription] = useState('종로 정겨운 러닝 모임');
  const [details, setDetails] = useState('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 회원 상태 및 모임장 상태 관리
  const [isMember, setIsMember] = useState(false); // 비회원 여부 설정 (false는 비회원)
  const [isHost, setIsHost] = useState(false); // 모임장 여부 설정 (false는 모임장 아님)

  // 모달 열기/닫기 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // meetId에 따라 데이터를 동적으로 설정
    // 실제로는 API 호출 등을 통해 meetId에 맞는 데이터를 가져오면 됩니다
    if (meetId === "0") {
      setDescription('첫 번째 모임 상세 정보');
      setDetails('첫 번째 모임에 대한 상세 설명입니다.');
    } else {
      setDescription(`모임 ID ${meetId}의 상세 정보`);
      setDetails(`모임 ID ${meetId}에 대한 상세 설명입니다.`);
    }
  }, [meetId]);

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
