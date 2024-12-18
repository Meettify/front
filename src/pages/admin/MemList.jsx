import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import useAdminMainStore from '../../stores/useAdminMainStore';
import { deleteMember } from '../../api/memberAPI';
import MemberDetailModal from '../../components/admin/MemberDetailModal';

const MemList = () => {
    const { allMemberLists, totalMemberListsPage } = useAdminMainStore();
    const [displayedMembers, setDisplayedMembers] = useState([]);
    const [sortOrder, setSortOrder] = useState('old');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { ref, inView } = useInView();

    // 정렬된 데이터를 반환
    const getSortedMembers = useCallback(() => {
        return [...allMemberLists].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'new' ? dateB - dateA : dateA - dateB;
        });
    }, [allMemberLists, sortOrder]);

    // 초기 데이터 로드
    useEffect(() => {
        const initializeData = async () => {
            setDisplayedMembers([]);
            setPage(1);
            setHasMore(true);
            setLoading(true);

            const sortedMembers = getSortedMembers();
            const initialData = sortedMembers.slice(0, 10);

            setDisplayedMembers(initialData);

            if (initialData.length < 10 || totalMemberListsPage === 1) {
                setHasMore(false);
            }

            setLoading(false);
        };

        initializeData();
    }, [sortOrder, getSortedMembers, totalMemberListsPage]);

    useEffect(() => {
        if (page === 1 || !hasMore || loading) return;

        const loadMoreData = async () => {
            setLoading(true);

            const sortedMembers = getSortedMembers();
            const nextPageData = sortedMembers.slice((page - 1) * 10, page * 10);

            // 중복 제거 로직
            const filteredData = nextPageData.filter(
                (newMember) =>
                    !displayedMembers.some((existingMember) => existingMember.memberId === newMember.memberId)
            );

            // 데이터 로드에 1초 지연 적용
            setTimeout(() => {
                setDisplayedMembers((prev) => [...prev, ...filteredData]);

                if (filteredData.length < 10 || page >= totalMemberListsPage) {
                    setHasMore(false); // 더 이상 불러올 데이터가 없을 때
                }

                setLoading(false);
            }, 1000);
        };

        loadMoreData();
    }, [page, getSortedMembers, hasMore, totalMemberListsPage, loading, displayedMembers]);

    // 스크롤 이벤트 감지
    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, hasMore, loading]);

    const handleDelete = async(memberId) => {
        console.log(`삭제: ${memberId}`);
        const confirmation = window.confirm("회원을 삭제하시겠습니까?");
        if(confirmation) {
            const response = await deleteMember(memberId);
            if(response.status === 200){
                alert("회원이 삭제되었습니다.");
            }else{
                alert("회원 삭제에 실패하였습니다.")
            }
        }
    };

    const openModal = (member) => {
        console.log('모달 표시:', member);
        setSelectedMember(member);
        setIsModalOpen(true);

    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMember(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-4 min-w-[630px]">
            <div className="flex justify-end mb-4">
                <button
                    className={`px-3 py-2 mx-1 rounded ${sortOrder === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setSortOrder('new')}
                >
                    최신순
                </button>
                <button
                    className={`px-3 py-2 mx-1 rounded ${sortOrder === 'old' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => setSortOrder('old')}
                >
                    오래된순
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border border-gray-300">NO</th>
                        <th className="p-2 border border-gray-300">이메일</th>
                        <th className="p-2 border border-gray-300">이름</th>
                        <th className="p-2 border border-gray-300">닉네임</th>
                        <th className="p-2 border border-gray-300">가입날짜</th>
                        <th className="p-2 border border-gray-300">등급</th>
                        <th className="p-2 border border-gray-300">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedMembers.map((member, index) => (
                        <tr key={`${member.memberId}-${index}`} className="hover:bg-gray-100">
                            <td className="p-2 border border-gray-300">{index + 1}</td>
                            <td
                                className="p-2 border border-gray-300 text-blue-600 cursor-pointer"
                                onClick={() => openModal(member)}
                            >
                                {member.memberEmail}
                            </td>
                            <td className="p-2 border border-gray-300">{member.memberName}</td>
                            <td className="p-2 border border-gray-300">{member.nickName}</td>
                            <td className="p-2 border border-gray-300">
                                {formatDate(member.createdAt)}
                            </td>
                            <td className="p-2 border border-gray-300">{member.memberRole}</td>
                            <td className="p-2 border border-gray-300 text-center">
                                <button
                                    onClick={() => handleDelete(member.memberId)}
                                    className="text-red-600 font-bold"
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                    {hasMore && (
                        <tr ref={ref}>
                            <td colSpan="7"></td>
                        </tr>
                    )}
                    {!hasMore && (
                        <tr>
                            <td colSpan="7" className="text-center py-4">더 이상 불러올 데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loading && (
                <div className="flex justify-center py-4">
                    <div className="loader">로딩 중...</div>
                </div>
            )}

            {/* 모달 */}
            {isModalOpen && (
                <MemberDetailModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    selectedMember={selectedMember}
                />
            )}
        </div>
    );
};

export default MemList;
