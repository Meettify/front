import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMembersList, updateMemberRole } from '../../api/meetAPI';  // 새로운 API 함수 추가
import DetailImage from './DetailImage';
import DetailTag from './DetailTag';
import DetailDescription from './DetailDescription';
import RoundedButton from '../button/RoundedButton';

const MeetAccept = () => {
  const navigate = useNavigate();
  const { meetId } = useParams();  // URL에서 meetId 가져오기
  const [pendingMembers, setPendingMembers] = useState([]);  // 가입 대기 중인 회원들 상태
  const [adminMembers, setAdminMembers] = useState([]);  // 관리자 상태
  const [regularMembers, setRegularMembers] = useState([]);  // 일반 회원들 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가
  const [error, setError] = useState(null);  // 에러 상태 추가

  // 회원 목록을 가져오는 API 호출 함수
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (!meetId) {
          throw new Error("올바르지 않은 meetId가 전달되었습니다.");  // meetId가 유효하지 않으면 에러 처리
        }

        const response = await getMembersList(meetId);  // API 호출
        if (response && Array.isArray(response)) {
          // 가입 대기 중인 회원 (WAITING)
          const pending = response.filter(member => member.meetRole === "WAITING");

          // 관리자 (ADMIN)와 일반 멤버 (MEMBER)
          const admins = response.filter(member => member.meetRole === "ADMIN");
          const members = response.filter(member => member.meetRole === "MEMBER");

          setPendingMembers(pending);  // 대기 중인 회원들 설정
          setAdminMembers(admins);     // 관리자 설정
          setRegularMembers(members);  // 일반 멤버 설정
        } else {
          throw new Error("회원 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setLoading(false);  // 로딩 완료
      } catch (error) {
        console.error('회원 리스트 조회 오류:', error);
        setError(error.message);
        setLoading(false);  // 로딩 완료 (오류 발생 시에도)
      }
    };

    fetchMembers();
  }, [meetId]);

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중 표시
  }

  if (error) {
    return <div>{error}</div>;  // 에러 메시지 표시
  }

  // 가입 승인 처리 함수
  const approveMember = async (id) => {
    const member = pendingMembers.find((member) => member.meetMemberId === id);
    try {
      const response = await updateMemberRole(meetId, id, "MEMBER");  // 역할을 MEMBER로 업데이트
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

  // 가입 거절 처리 함수
  const rejectMember = (id) => {
    setPendingMembers(pendingMembers.filter((member) => member.meetMemberId !== id));
  };

  // 기존 회원 강퇴 처리 함수
  const removeMember = (id) => {
    setRegularMembers(regularMembers.filter((member) => member.meetMemberId !== id));
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

          {/* 저장하기 버튼 */}
          <div className="flex justify-end">
            <RoundedButton onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              저장하기
            </RoundedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetAccept;
