import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMembersList, updateMemberRole } from "../../api/meetAPI";
import RoundedButton from "../button/RoundedButton";

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
        if (!meetId) throw new Error("올바르지 않은 meetId가 전달되었습니다.");
        const response = await getMembersList(meetId);
        if (Array.isArray(response)) {
          setPendingMembers(response.filter((m) => m.meetRole === "WAITING"));
          setAdminMembers(response.filter((m) => m.meetRole === "ADMIN"));
          setRegularMembers(response.filter((m) => m.meetRole === "MEMBER"));
        } else {
          throw new Error("회원 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMembers();
  }, [meetId]);

  const approveMember = async (id) => {
    const member = pendingMembers.find((m) => m.meetMemberId === id);
    try {
      const response = await updateMemberRole(meetId, id, "MEMBER");
      if (response.status === 200) {
        setRegularMembers([
          ...regularMembers,
          { ...member, meetRole: "MEMBER" },
        ]);
        setPendingMembers(pendingMembers.filter((m) => m.meetMemberId !== id));
        alert("회원 역할이 성공적으로 업데이트되었습니다.");
      } else {
        alert("회원 역할 업데이트에 실패했습니다.");
      }
    } catch (error) {
      alert("회원 승인 중 오류가 발생했습니다.");
    }
  };

  const rejectMember = (id) => {
    setPendingMembers(pendingMembers.filter((m) => m.meetMemberId !== id));
  };

  const removeMember = (id) => {
    setRegularMembers(regularMembers.filter((m) => m.meetMemberId !== id));
  };

  const handleSave = () => {
    alert("변경 사항이 저장되었습니다.");
    navigate(`/meet/detail/${meetId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-20">{error}</div>;

  const renderSection = (title, members, type) => (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
      <ul className="space-y-4">
        {members.length > 0 ? (
          members.map((member) => (
            <li
              key={member.meetMemberId}
              className="flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">
                {member.nickName}
                {type === "admin" && " (관리자)"}
                {type === "regular" && " (회원)"}
              </span>
              {type === "pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => approveMember(member.meetMemberId)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-xl"
                  >
                    수락
                  </button>
                  <button
                    onClick={() => rejectMember(member.meetMemberId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl"
                  >
                    거절
                  </button>
                </div>
              )}
              {type === "regular" && (
                <button
                  onClick={() => removeMember(member.meetMemberId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl"
                >
                  강퇴
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-400">표시할 사용자가 없습니다.</p>
        )}
      </ul>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {renderSection("가입 승인 대기 명단", pendingMembers, "pending")}
        {renderSection("관리자 명단", adminMembers, "admin")}
        {renderSection("일반 회원 명단", regularMembers, "regular")}

        <div className="flex justify-end space-x-4 mt-6">
          <RoundedButton
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            저장하기
          </RoundedButton>
          <RoundedButton
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl"
          >
            취소하기
          </RoundedButton>
        </div>
      </div>
    </div>
  );
};

export default MeetAccept;
