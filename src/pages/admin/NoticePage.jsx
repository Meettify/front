import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    hasNextPage,
    hasPreviousPage,
    nowPageNumber,
    isFirstPage,
    isLastPage,
  } = useNoticeStore();

  const navigate = useNavigate();

  // 페이지 범위 계산
  const getPageNumbers = (nowPageNumber, totalPage, blockSize = 5) => {
    const currentBlock = Math.floor((nowPageNumber - 1) / blockSize);
    const start = currentBlock * blockSize + 1;
    const end = Math.min(start + blockSize - 1, totalPage);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers(nowPageNumber, totalPage); // 계산된 페이지 리스트

  // 공지사항 클릭 시 디테일 페이지로 이동
  const goToNoticeDetail = (noticeId) => {
    console.log("클릭된 noticeId:", noticeId); // noticeId 디버깅 로그
    if (noticeId) {
      navigate(`/notice/${noticeId}`); // noticeId가 존재할 때만 경로로 이동
    } else {
      console.error("Invalid noticeId:", noticeId); // noticeId가 없으면 오류 로그 출력
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
                <tr
                  key={notice.noticeId || index}
                  className="hover:bg-gray-100"
                >
                  <td className="p-2 text-center">
                    {(page - 1) * pageSize + index + 1}
                  </td>
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
        <div className="flex justify-center items-center gap-1 mt-6">
          {/* << 처음 */}
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ≪
          </button>

          {/* < 이전 블록의 마지막 페이지 */}
          <button
            onClick={() => setPage(Math.max(1, pageNumbers[0] - 1))}
            disabled={pageNumbers[0] === 1}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>

          {/* 페이지 번호들 */}
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

          {/* > 다음 블록의 첫 페이지 */}
          <button
            onClick={() =>
              setPage(
                Math.min(totalPage, pageNumbers[pageNumbers.length - 1] + 1)
              )
            }
            disabled={pageNumbers[pageNumbers.length - 1] === totalPage}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>

          {/* >> 마지막 페이지 */}
          <button
            onClick={() => setPage(totalPage)}
            disabled={page === totalPage}
            className="px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            ≫
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
