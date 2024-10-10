import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import emotionImage from '../../assets/images/emotion1.png'; 
import InputImage from '../../components/meet/InputImage'; 
import InputTag from '../../components/meet/InputTag';  
import InputDescription from '../../components/meet/InputDescription'; 
import InputBoard from '../../components/meet/InputBoard';  
import RoundedButton from '../../components/button/RoundedButton'; 
import useMeetStore from '../../stores/useMeetStore';  
import MeetSideMenu from '../../components/meet/MeetSideMenu';  

const MeetUpdate = () => {
  const { meetId } = useParams();  
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
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보 수정</h1>
      
          <InputImage image={image} setImage={setImage} />

          <InputTag tags={tags} setTags={setTags} />

          <InputDescription description={description} setDescription={setDescription} />

          <InputBoard details={details} setDetails={setDetails} />

          <RoundedButton onClick={handleSave}>
            저장하기
          </RoundedButton>
        </div>
        {/* MeetSideMenu 추가 */}
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetUpdate;
