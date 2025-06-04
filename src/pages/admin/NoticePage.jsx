import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // ✅ Outlet 추가
import useNoticeStore from "../../stores/useNoticeStore";
import RoundedButton from "../../components/button/RoundedButton";

const NoticePage = () => {
  const {
    notices,
    page,
    loading,
    fetchNotices,
    setPage,
    pageSize,
    totalPage,
    nowPageNumber,
    fetchNoticeDetails,
    deleteNotice,
  } = useNoticeStore();

  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const navigate = useNavigate();

  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  const handleClickNotice = async (noticeId) => {
    if (selectedNoticeId === noticeId) {
      setSelectedNoticeId(null);
      setSelectedNotice(null);
    } else {
      try {
        const detail = await fetchNoticeDetails(noticeId);
        setSelectedNoticeId(noticeId);
        setSelectedNotice(detail);
      } catch (e) {
        console.error("상세 조회 실패", e);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteNotice(selectedNoticeId);
      setSelectedNoticeId(null);
      setSelectedNotice(null);
      fetchNotices();
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);

  return (
    <div className="container mx-auto pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">공지사항 관리</h1>
        <RoundedButton
          onClick={() => navigate("add")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + 공지사항 등록
        </RoundedButton>
      </div>

      {/* 목록 */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <table className="w-full table-auto border-t border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-center">번호</th>
                <th className="p-2 text-center">제목</th>
                <th className="p-2 text-center">내용</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-400">
                    등록된 공지사항이 없습니다.
                  </td>
                </tr>
              ) : (
                notices.map((notice, index) => (
                  <tr
                    key={notice.noticeId}
                    onClick={() => handleClickNotice(notice.noticeId)}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-2 text-center">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="p-2 text-center text-blue-500">
                      {notice.title}
                    </td>
                    <td className="p-2 text-center">{notice.content}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* 상세 내용 */}
      {selectedNotice && (
        <div className="mt-10 bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto border">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold">{selectedNotice.title}</h2>
            <span className="text-sm text-gray-500">
              작성일:{" "}
              {new Date(selectedNotice.regTime).toLocaleDateString("ko-KR")}
            </span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap text-left mb-6">
            {selectedNotice.content}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 페이지네이션 */}
      {notices.length > 0 && (
        <div className="flex justify-center items-center gap-1 mt-6">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ≪
          </button>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded ${
                p === page ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPage, page + 1))}
            disabled={page === totalPage}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
          <button
            onClick={() => setPage(totalPage)}
            disabled={page === totalPage}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ≫
          </button>
        </div>
      )}

      {/* ✅ 하위 라우트 렌더링 영역 */}
      <Outlet />
    </div>
  );
};

export default NoticePage;
