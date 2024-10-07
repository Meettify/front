// C:\project3\front\src\pages\MeetDetail.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  
import MeetJoin from '../../components/meet/MeetJoin';  
import MeetContent from '../../components/meet/MeetContent';  
import RoundedButton from '../../components/button/RoundedButton';  
import useMeetStore from '../../stores/useMeetStore';  // 경로 수정

const MeetDetail = () => {
  const { meetId } = useParams();

  // Zustand에서 상태와 상태 변경 함수 가져오기
  const { image, tags, description, details, isMember, isHost, setImage, setTags, setDescription, setDetails, setIsMember, setIsHost } = useMeetStore();

  useEffect(() => {
    // 초기 상태 설정
    setImage(emotionImage);
    setTags(['운동', '서울']);
    setIsMember(true);  // 임시로 회원 상태 설정
    setIsHost(true);    // 임시로 모임장 상태 설정

    // meetId에 따라 동적으로 상태 변경
    if (meetId === "0") {
      setDescription('첫 번째 모임 상세 정보');
      setDetails('첫 번째 모임에 대한 상세 설명입니다.');
    } else {
      setDescription(`모임 ID ${meetId}의 상세 정보`);
      setDetails(`모임 ID ${meetId}에 대한 상세 설명입니다.`);
    }
  }, [meetId, setImage, setTags, setDescription, setDetails, setIsMember, setIsHost]);

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
          <MeetJoin meetId={meetId} onSubmit={() => alert('가입 신청이 완료되었습니다. 모임장의 승인을 기다려주세요.')} />
        )}

        {/* 모임장일 경우 수정하기 버튼 */}
        {isHost && (
          <Link to={`/meet/update/${meetId}`}>
            <RoundedButton>
              수정하기
            </RoundedButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MeetDetail;
