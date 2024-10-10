import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import emotionImage from '../../assets/images/emotion1.png';  
import MeetJoin from '../../components/meet/MeetJoin';  
import MeetContent from '../../components/meet/MeetContent';  
import RoundedButton from '../../components/button/RoundedButton';  
import { getMeetingById, deleteMeeting } from '../../mocks/mockAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';  // MeetSideMenu 임포트

const MeetDetail = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    // Mock API로 데이터 가져오기
    const fetchData = async () => {
      const fetchedMeeting = await getMeetingById(meetId);
      setMeeting(fetchedMeeting);
    };
    fetchData();
  }, [meetId]);

  // 삭제하기 버튼 클릭 핸들러
  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말로 모임을 삭제하시겠습니까?');
    if (isConfirmed) {
      const success = await deleteMeeting(meetId);  // Mock API로 삭제 처리
      if (success) {
        alert('모임이 성공적으로 삭제되었습니다.');
        navigate('/meet/list');
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (!meeting) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <MeetContent 
            image={emotionImage}
            tags={meeting.tags}
            description={meeting.description}
            details={meeting.details}
          />
          
          <div className="flex justify-center space-x-4 p-4 mt-4">
            {!meeting.isMember && !meeting.isHost && (
              <MeetJoin meetId={meetId} onSubmit={() => alert('가입 신청이 완료되었습니다. 모임장의 승인을 기다려주세요.')} />
            )}

            {(meeting.isHost || meeting.isAdmin) && (
              <>
                <Link to={`/meet/update/${meetId}`}>
                  <RoundedButton>
                    수정하기
                  </RoundedButton>
                </Link>

                <RoundedButton onClick={handleDelete}>
                  삭제하기
                </RoundedButton>
              </>
            )}
          </div>
        </div>
        {/* MeetSideMenu 추가 */}
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetDetail;
