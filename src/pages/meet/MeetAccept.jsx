import React, { useState } from 'react';
import DetailImage from '../../components/meet/DetailImage';  // 모임 이미지
import DetailTag from '../../components/meet/DetailTag';  // 모임 태그
import DetailDescription from '../../components/meet/DetailDescription';  // 모임 이름

const MemberManagement = () => {
  // 상태 관리
  const [pendingMembers, setPendingMembers] = useState([
    { id: 1, name: '홍길동' },
    { id: 2, name: '김철수' },
  ]);
  const [approvedMembers, setApprovedMembers] = useState([
    { id: 3, name: '이영희' },
    { id: 4, name: '박민수' },
  ]);

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

  return (
    <div className="container mx-auto p-4">
      {/* 모임 이미지, 태그, 이름 부분 */}
      <DetailImage image="/path/to/image" />
      <DetailTag tags={['운동', '서울', '러닝']} />
      <DetailDescription details="종로 정겨운 러닝 모임" />

      {/* 가입 승인 대기 명단 */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">가입 승인 대기 명단</h2>
        <ul>
          {pendingMembers.map((member) => (
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
          ))}
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
    </div>
  );
};

export default MemberManagement;
