import React, { useEffect } from 'react';
import useAdminStore from '../../stores/useAdminStore';
import RoundedButton from '../../components/button/RoundedButton';

const MemList = () => {
    const { memberList, fetchMemberList, loading, error, removeMember } = useAdminStore();

    useEffect(() => {
        fetchMemberList(); // 페이지 로드 시 회원 목록 조회
    }, [fetchMemberList]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>오류 발생: {error.message}</p>;
    if (!Array.isArray(memberList) || memberList.length === 0) {
        return <p>등록된 회원이 없습니다.</p>;
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div></div>
                <RoundedButton
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                    onClick={() => console.log('회원 등록')}
                >
                    회원 등록
                </RoundedButton>
            </div>

            <table className="w-full table-fixed border-t border-gray-300 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 text-center font-medium w-1/12">번호</th>
                        <th className="p-2 text-center font-medium w-2/12">이름</th>
                        <th className="p-2 text-center font-medium w-2/12">닉네임</th>
                        <th className="p-2 text-center font-medium w-3/12">이메일</th>
                        <th className="p-2 text-center font-medium w-2/12">주소</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map((member, index) => (
                        <tr key={member.memberId} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="p-2 text-center">{index + 1}</td>
                            <td className="p-2 text-center">{member.memberName}</td>
                            <td className="p-2 text-center">{member.nickName}</td>
                            <td className="p-2 text-center">{member.memberEmail}</td>
                            <td className="p-2 text-center">
                                {member.memberAddr?.memberAddr} {member.memberAddr?.memberAddrDetail}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemList;
