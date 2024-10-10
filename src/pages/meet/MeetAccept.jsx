import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import { mockData } from '../../mocks/mockData';  
import DetailImage from '../../components/meet/DetailImage';  
import DetailTag from '../../components/meet/DetailTag';  
import DetailDescription from '../../components/meet/DetailDescription';  
import MeetSideMenu from '../../components/meet/MeetSideMenu';  
import RoundedButton from '../../components/button/RoundedButton';  

const MemberAccept = () => {
  const { meetId } = useParams();  
  const navigate = useNavigate();  
  const [meeting, setMeeting] = useState(null);
  const [pendingMembers, setPendingMembers] = useState([]);  // 대기 중인 회원들 상태
  const [approvedMembers, setApprovedMembers] = useState([]);  // 초기값 설정

  useEffect(() => {
  
    const foundMeeting = mockData.find(meeting => meeting.id === parseInt(meetId));
    if (foundMeeting) {
      setMeeting(foundMeeting);
      setPendingMembers(foundMeeting.pendingMembers || []);  // 대기 중인 회원들 설정
      setApprovedMembers(foundMeeting.members || []);  // 기존 회원들 설정
    }
  }, [meetId]);

  if (!meeting) {
    return <div>Loading...</div>;  // 데이터를 불러오는 동안 로딩 표시
  }

  // 가입 승인 처리 함수
  const approveMember = (id) => {
    const member = pendingMembers.find((member) => member.id === id);
    setApprovedMembers([...approvedMembers, member]);
    setPendingMembers(pendingMembers.filter((member) => member.id !== id));
  };

  // 가입 거절 처리 함수
  const rejectMember = (id) => {
    setPendingMembers(pendingMembers.filter((member) => member.id !== id));
  };

  // 기존 회원 강퇴 처리 함수
  const removeMember = (id) => {
    setApprovedMembers(approvedMembers.filter((member) => member.id !== id));
  };

  // 저장하기 버튼 클릭 핸들러
  const handleSave = () => {
    alert('변경 사항이 저장되었습니다.');
    navigate(`/meet/detail/${meetId}`);  // 저장 후 모임 상세 페이지로 이동
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          {/* 모임 이미지, 태그, 이름 부분 */}
          <DetailImage image={meeting.image} /> {/* meeting.image 속성을 전달 */}
          <DetailTag tags={meeting.tags} />
          <DetailDescription details={meeting.description} />

          {/* 가입 승인 대기 명단 */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-4">가입 승인 대기 명단</h2>
            <ul>
              {pendingMembers.length > 0 ? (
                pendingMembers.map((member) => (
                  <li key={member.id} className="flex justify-between items-center mb-2">
                    <span>{member.name}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => approveMember(member.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => rejectMember(member.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        거절
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>가입 승인 대기 중인 회원이 없습니다.</p>
              )}
            </ul>
          </div>

          {/* 기존 회원 관리 */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">기존 회원 명단</h2>
            <ul>
              {approvedMembers.map((member) => (
                <li key={member.id} className="flex justify-between items-center mb-2">
                  <span>{member.name}</span>
                  <button
                    onClick={() => removeMember(member.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    강퇴
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 저장하기 버튼 */}
          <div className="flex justify-end">
            <RoundedButton onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              저장하기
            </RoundedButton>
          </div>
        </div>
        {/* MeetSideMenu 추가 */}
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MemberAccept;
