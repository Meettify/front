import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNoticeStore from '../../stores/useNoticeStore';
import RoundedButton from '../../components/button/RoundedButton';

const NoticePage = () => {
    const {
        notices,
        page,
        loading,
        fetchNotices,
        createNotice,
        updateNotice,
        deleteNotice,
        setPage,
    } = useNoticeStore();

    const navigate = useNavigate();

    const goToNoticeAdd = () => {
        navigate('/admin/notice/noticeAdd');
    };

    useEffect(() => {
        fetchNotices();
        console.log("공지사항 목록:", notices); // notices 상태가 업데이트 되었는지 확인
    }, [page]);

    const handleDelete = async (noticeId) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteNotice(noticeId);
            alert('공지사항이 삭제되었습니다.');
        } catch (error) {
            console.error('공지사항 삭제 실패:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">공지사항 관리</h1>
                <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }} onClick={goToNoticeAdd}>
                    공지사항 등록
                </RoundedButton>
            </div>

            <div>
                {loading ? (
                    <p>로딩 중...</p>
                ) : (
                    <table className="w-full table-fixed border-t border-gray-300 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-center">번호</th>
                                <th className="p-2 text-center">제목</th>
                                <th className="p-2 text-center">내용</th>
                                <th className="p-2 text-center">삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(notices || []).map((notice, index) => (
                                <tr key={notice.id} className="hover:bg-gray-100">
                                    <td className="p-2 text-center">{index + 1}</td>
                                    <td className="p-2 text-center">{notice.title}</td>
                                    <td className="p-2 text-center">{notice.content}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            onClick={() => handleDelete(notice.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="flex justify-between mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                    >
                        이전
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticePage;
