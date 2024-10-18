import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MeetJoin from '../../components/meet/MeetJoin';  
import DetailImage from '../../components/meet/DetailImage';  // 이미지 컴포넌트
import DetailTag from '../../components/meet/DetailTag';  // 태그 컴포넌트
import DetailName from '../../components/meet/DetailName';  // 이름 컴포넌트
import DetailDescription from '../../components/meet/DetailDescription';  // 설명 컴포넌트
import RoundedButton from '../../components/button/RoundedButton';  
import { getMeetingDetail } from '../../api/meetAPI';  // 실제 API로 교체
import MeetSideMenu from '../../components/meet/MeetSideMenu';  

const MeetDetail = () => {
  const { meetId } = useParams(); // useParams로 meetId 가져오기
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null); // 모임 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // API로 모임 정보 가져오기
    const fetchData = async () => {
      try {
        const fetchedMeeting = await getMeetingDetail(meetId); // API 호출
        setMeeting(fetchedMeeting); // 모임 정보 설정
        setLoading(false); // 로딩 종료
      } catch (error) {
        console.error('모임 상세 정보 가져오기 오류:', error);
        setLoading(false); // 로딩 종료
      }
    };
    fetchData();
  }, [meetId]);

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  
  // 모임 정보가 없는 경우 처리
  if (!meeting || !meeting.meetDetailDTO) return <div>모임 정보를 불러올 수 없습니다.</div>;

  // 데이터에서 필요한 필드를 가져옵니다.
  const { meetName, meetDescription, images, meetLocation, category } = meeting.meetDetailDTO;
  const imageUrl = images && images.length > 0 ? images[0] : null; // 첫 번째 이미지를 사용

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          
          {/* 모임 이름 컴포넌트 */}
          <DetailName name={meetName} />

          {/* 이미지 컴포넌트 */}
          <DetailImage image={imageUrl} />

          {/* 태그 컴포넌트 */}
          <DetailTag tags={[meetLocation, category]} />

          {/* 설명 컴포넌트 */}
          <DetailDescription description={meetDescription} />

          {/* 수정 및 회원 조회 버튼 */}
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

                {/* "회원조회" 버튼 추가 */}
                <RoundedButton onClick={() => navigate(`/meet/${meetId}/accept`)}>
                  회원조회
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
