import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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
  } = useNoticeStore();

  const navigate = useNavigate();

  // 페이지 버튼 생성
  const getPageNumbers = (nowPageNumber, totalPage, blockSize = 5) => {
    const currentBlock = Math.floor((nowPageNumber - 1) / blockSize);
    const start = currentBlock * blockSize + 1;
    const end = Math.min(start + blockSize - 1, totalPage);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers(nowPageNumber, totalPage);

  // 공지사항 클릭 → 상세 페이지로 이동
  const goToNoticeDetail = (noticeId) => {
    if (noticeId) {
      navigate(`/notice/${noticeId}`);
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
                    onClick={() => goToNoticeDetail(notice.noticeId)}
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

      {/* ✅ 상세 라우트용 렌더링 영역 */}
      <Outlet />
    </div>
  );
};

export default NoticePage;
