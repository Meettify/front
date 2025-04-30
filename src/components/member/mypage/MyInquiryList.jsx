import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyPage } from "../../../hooks/useMypage";

const MyInquiryList = () => {
  const navigate = useNavigate();
  const {
    inquirys,
    inquiryTotalPages,
    inquiryCurrentPage,
    setInquirys,
    setInquiryCurrentPage,
  } = useMyPage();

  const currentPage = inquiryCurrentPage ?? 1;

  const handlePageClick = (pageNum) => {
    setInquiryCurrentPage(pageNum);
    setInquirys([]); // 페이지 이동 시 기존 목록 초기화
  };

  const handleDetailClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }.${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
  };

  // 페이지네이션: 5개씩만 보여주기
  const maxButtons = 5;
  const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
  const endPage = Math.min(startPage + maxButtons - 1, inquiryTotalPages);

  return (
    <div className="ml-5">
      <h2 className="text-2xl font-semibold mb-10 text-left">
        내가 작성한 문의
      </h2>
      <div className="overflow-hidden">
        <table className="w-11/12 bg-white border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="w-1/8 px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">
                No
              </th>
              <th className="w-3/5 px-6 py-3 border-r border-l bg-gray-50 text-center text-sm font-medium text-gray-500">
                제목
              </th>
              <th className="w-1/4 px-6 py-3 border-r bg-gray-50 text-center text-sm font-medium text-gray-500">
                작성일
              </th>
              <th className="w-full px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {inquirys && inquirys.length > 0 ? (
              inquirys.map((question, index) => (
                <tr
                  key={question.questionId}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-gray-700 text-sm text-center">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="px-6 py-4 text-blue-500 text-sm text-left">
                    <p
                      className="cursor-pointer w-fit"
                      onClick={() => handleDetailClick(question.questionId)}
                    >
                      {question.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm text-center">
                    {formatDate(question.regTime)}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm whitespace-nowrap text-center ${
                      question.replyStatus === "답글 완료"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {question.replyStatus === "답글 완료"
                      ? "답변완료"
                      : "답변대기"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  작성한 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 space-x-2 w-4/5">
        {startPage > 1 && (
          <button
            onClick={() => handlePageClick(startPage - 1)}
            className="px-3 py-1 border rounded text-gray-500"
          >
            &lt;
          </button>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
          const page = startPage + idx;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}

        {endPage < inquiryTotalPages && (
          <button
            onClick={() => handlePageClick(endPage + 1)}
            className="px-3 py-1 border rounded text-gray-500"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MyInquiryList;
