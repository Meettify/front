import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  // 이미지 파일 경로
import InputImage from '../../components/meet/InputImage';  // 이미지 입력 컴포넌트
import InputTag from '../../components/meet/InputTag';  // 태그 입력 컴포넌트
import InputDescription from '../../components/meet/InputDescription';  // 설명 입력 컴포넌트
import InputBoard from '../../components/meet/InputBoard';  // 세부 설명(게시판) 입력 컴포넌트
import RoundedButton from '../../components/button/RoundedButton';  // 기존 버튼 컴포넌트

const MeetUpdate = () => {
  // 상태 관리
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  const navigate = useNavigate();

  // useEffect로 초기 상태 설정 (백엔드 연결 전까지 고정값 사용)
  useEffect(() => {
    setImage(emotionImage);
    setTags(['운동', '서울']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, []);

  const handleSave = () => {
    alert('소모임 정보가 저장되었습니다.');
    navigate('/meet/detail');  // 저장 후 소모임 상세 페이지로 이동
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">소모임 정보 수정</h1>

      {/* 이미지 입력 섹션 */}
      <InputImage image={image} setImage={setImage} />

      {/* 태그 입력 섹션 */}
      <InputTag tags={tags} setTags={setTags} />

      {/* 모임 이름 입력 섹션 */}
      <InputDescription description={description} setDescription={setDescription} />

      {/* 게시판 설명 입력 섹션 */}
      <InputBoard details={details} setDetails={setDetails} />

      {/* 저장 버튼 (RoundedButton 컴포넌트 사용) */}
      <RoundedButton onClick={handleSave}>
        저장하기
      </RoundedButton>
    </div>
  );
};

export default MeetUpdate;
