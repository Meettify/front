// C:\project3\front\src\pages\MeetUpdate.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useParams 추가
import emotionImage from '../../assets/images/emotion1.png';  // 이미지 파일 경로
import InputImage from '../../components/meet/InputImage';  // 이미지 입력 컴포넌트
import InputTag from '../../components/meet/InputTag';  // 태그 입력 컴포넌트
import InputDescription from '../../components/meet/InputDescription';  // 설명 입력 컴포넌트
import InputBoard from '../../components/meet/InputBoard';  // 세부 설명(게시판) 입력 컴포넌트
import RoundedButton from '../../components/button/RoundedButton';  // 기존 버튼 컴포넌트
import useMeetStore from '../../stores/useMeetStore';  // Zustand 저장소 import

const MeetUpdate = () => {
  const { meetId } = useParams();  // meetId 파라미터 가져오기
  const navigate = useNavigate();

  // Zustand에서 상태와 상태 변경 함수 가져오기
  const { image, tags, description, details, setImage, setTags, setDescription, setDetails } = useMeetStore();

  // 초기 상태 설정
  useEffect(() => {
    setImage(emotionImage);
    setTags(['운동', '서울']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, [setImage, setTags, setDescription, setDetails]);

  const handleSave = () => {
    alert('수정 완료.');
    
    navigate(`/meet/detail/${meetId}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">소모임 정보 수정</h1>
   
      <InputImage image={image} setImage={setImage} />

      <InputTag tags={tags} setTags={setTags} />

      <InputDescription description={description} setDescription={setDescription} />

      <InputBoard details={details} setDetails={setDetails} />

      <RoundedButton onClick={handleSave}>
        저장하기
      </RoundedButton>
    </div>
  );
};

export default MeetUpdate;
