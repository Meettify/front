import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNoticeStore from "../../stores/useNoticeStore";

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
        setError(err.message || "공지사항을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadNotice();
  }, [noticeId, fetchNoticeDetails]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">오류: {error}</div>;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-12 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-4xl border border-gray-200">
        {/* 제목 + 작성일 */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{notice.title}</h1>
          <div className="text-sm text-gray-500">
            작성일: {new Date(notice.regTime).toLocaleDateString("ko-KR")}
          </div>
        </div>

        {/* 본문 내용 (자동 확장, 좌측 정렬) */}
        <div className="text-gray-800 text-base whitespace-pre-wrap text-left leading-relaxed">
          {notice.content}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
