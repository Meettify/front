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
        setPage,
    } = useNoticeStore();

    const navigate = useNavigate();

    // 공지사항 클릭 시 디테일 페이지로 이동
    const goToNoticeDetail = (noticeId) => {
        console.log('클릭된 noticeId:', noticeId); // noticeId 디버깅 로그
        if (noticeId) {
            navigate(`/notice/${noticeId}`);  // noticeId가 존재할 때만 경로로 이동
        } else {
            console.error('Invalid noticeId:', noticeId);  // noticeId가 없으면 오류 로그 출력
        }
    };

    useEffect(() => {
        fetchNotices();
        console.log("공지사항 목록:", notices); // fetch 이후 데이터 확인
    }, [page]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">공지사항 관리</h1>
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
                            </tr>
                        </thead>
                        <tbody>
                            {(notices || []).map((notice, index) => (
                                <tr key={notice.noticeId || index} className="hover:bg-gray-100">
                                    <td className="p-2 text-center">{index + 1}</td>
                                    <td
                                        className="p-2 text-center text-blue-500 cursor-pointer"
                                        onClick={() => goToNoticeDetail(notice.noticeId)}
                                    >
                                        {notice.title}
                                    </td>
                                    <td className="p-2 text-center">{notice.content}</td>
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
