import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailImage from '../../components/meet/DetailImage';
import { getMeetingDetail, deleteMeet } from '../../api/meetAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';
import RoundedButton from '../../components/button/RoundedButton'; 

const MeetDetail = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMeeting = await getMeetingDetail(meetId);
        setMeeting(fetchedMeeting);
        setLoading(false);
      } catch (error) {
        console.error('모임 상세 정보 가져오기 오류:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [meetId]);

  if (loading) return <div>Loading...</div>;
  if (!meeting || !meeting.meetDetailDTO) return <div>모임 정보를 불러올 수 없습니다.</div>;

  const { meetName, meetDescription, meetMaximum, meetLocation, images } = meeting.meetDetailDTO;
  const imageUrl = images && images.length > 0 ? images[0] : null;
  const { meetPermissionDTO } = meeting;

  const handleEdit = () => {
    navigate(`/meet/update/${meetId}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 모임을 삭제하시겠습니까?')) {
      try {
        await deleteMeet(meetId);
        alert('모임이 성공적으로 삭제되었습니다.');
        navigate('/meet/list');
      } catch (error) {
        console.error('모임 삭제 오류:', error);
        alert('모임 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보</h1>

          <div className="mb-4">
            {imageUrl ? <DetailImage image={imageUrl} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
          </div>

          <h2 className="text-lg font-semibold mb-2">모임 이름</h2>
          <div className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4">
            {meetName}
          </div>

          <div className="flex space-x-2 mb-4">
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              {meetLocation || ''}
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">모임 설명</h2>
          <div className="text-gray-700 bg-gray-200 p-4 rounded-lg w-full mb-4">
            {meetDescription}
          </div>

          <div className="flex space-x-2 mb-4">
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">
              {meetMaximum}
            </div>
          </div>

          {/* 수정하기와 삭제하기 버튼을 양옆으로 배치 */}
          <div className="flex space-x-4"> {/* 버튼들을 가로로 배치 */}
            {meetPermissionDTO.canEdit && (
              <RoundedButton onClick={handleEdit} style={{ padding: '6px 14px', fontSize: '12px', width: '20%' }}>
                수정하기
              </RoundedButton>
            )}
            
            {meetPermissionDTO.canDelete && (
              <RoundedButton onClick={handleDelete} style={{ padding: '6px 14px', fontSize: '12px', width: '20%' }}>
                삭제하기
              </RoundedButton>
            )}
          </div>
        </div>
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetDetail;
