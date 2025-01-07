import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useNoticeStore from '../../stores/useNoticeStore';

const NoticeDetailPage = () => {
    const { noticeId } = useParams();
    const { fetchNoticeDetails } = useNoticeStore();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNotice = async () => {
            try {
                const data = await fetchNoticeDetails(noticeId);
                setNotice(data);
            } catch (err) {
                setError(err.message || '공지사항을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadNotice();
    }, [noticeId, fetchNoticeDetails]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-6 px-4">
            <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>
            <div className="text-gray-600 text-sm mb-6">
                작성일: {new Date(notice.createdAt).toLocaleDateString()}
            </div>
            <div className="text-gray-800">{notice.content}</div>
        </div>
    );
};

export default NoticeDetailPage;
