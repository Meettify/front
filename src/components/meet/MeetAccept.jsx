import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMembersList, updateMemberRole } from '../../api/meetAPI';  // API 함수들
import DetailImage from './DetailImage';
import DetailTag from './DetailTag';
import DetailDescription from './DetailDescription';
import RoundedButton from '../button/RoundedButton';

const MeetAccept = () => {
  const navigate = useNavigate();
  const { meetId } = useParams();  
  const [pendingMembers, setPendingMembers] = useState([]);  
  const [adminMembers, setAdminMembers] = useState([]);  
  const [regularMembers, setRegularMembers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (!meetId) {
          throw new Error("올바르지 않은 meetId가 전달되었습니다.");  
        }

        const response = await getMembersList(meetId);  
        if (response && Array.isArray(response)) {
          const pending = response.filter(member => member.meetRole === "WAITING");
          const admins = response.filter(member => member.meetRole === "ADMIN");
          const members = response.filter(member => member.meetRole === "MEMBER");

          setPendingMembers(pending);  
          setAdminMembers(admins);     
          setRegularMembers(members);  
        } else {
          throw new Error("회원 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setLoading(false);  
      } catch (error) {
        console.error('회원 리스트 조회 오류:', error);
        setError(error.message);
        setLoading(false);  
      }
    };

    fetchMembers();
  }, [meetId]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    return <div>{error}</div>;  
  }

  const approveMember = async (id) => {
    const member = pendingMembers.find((member) => member.meetMemberId === id);
    try {
      const response = await updateMemberRole(meetId, id, "MEMBER");  
      if (response.status === 200) {
        setRegularMembers([...regularMembers, { ...member, meetRole: "MEMBER" }]);
        setPendingMembers(pendingMembers.filter((member) => member.meetMemberId !== id));
        alert('회원 역할이 성공적으로 업데이트되었습니다.');
      } else {
        alert('회원 역할 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원 승인 오류:', error);
      alert('회원 승인 중 오류가 발생했습니다.');
    }
  };

  const rejectMember = (id) => {
    setPendingMembers(pendingMembers.filter((member) => member.meetMemberId !== id));
  };

  const removeMember = (id) => {
    setRegularMembers(regularMembers.filter((member) => member.meetMemberId !== id));
  };

  const handleSave = () => {
    alert('변경 사항이 저장되었습니다.');
    navigate(`/meet/detail/${meetId}`);  
  };

  const handleCancel = () => {
    navigate(-1);  // 이전 페이지로 이동
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          {/* 가입 승인 대기 명단 */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-4">가입 승인 대기 명단</h2>
            <ul>
              {pendingMembers.length > 0 ? (
                pendingMembers.map((member) => (
                  <li key={member.meetMemberId} className="flex justify-between items-center mb-2">
                    <span>{member.nickName}</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => approveMember(member.meetMemberId)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => rejectMember(member.meetMemberId)}
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

          {/* 관리자 명단 */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">관리자 명단</h2>
            <ul>
              {adminMembers.length > 0 ? (
                adminMembers.map((member) => (
                  <li key={member.meetMemberId} className="flex justify-between items-center mb-2">
                    <span>{member.nickName} (관리자)</span>
                  </li>
                ))
              ) : (
                <p>관리자가 없습니다.</p>
              )}
            </ul>
          </div>

          {/* 일반 회원 명단 */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">일반 회원 명단</h2>
            <ul>
              {regularMembers.map((member) => (
                <li key={member.meetMemberId} className="flex justify-between items-center mb-2">
                  <span>{member.nickName} (회원)</span>
                  <button
                    onClick={() => removeMember(member.meetMemberId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    강퇴
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 저장하기, 취소하기 버튼 */}
          <div className="flex justify-end space-x-4">
            <RoundedButton onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              저장하기
            </RoundedButton>
            <RoundedButton onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
              취소하기
            </RoundedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetAccept;
