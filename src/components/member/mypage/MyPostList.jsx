import React from "react";
import { useMyPage } from "../../../hooks/useMypage";
import useNavigation from "../../../hooks/useNavigation";

const MyPostList = () => {
  const { posts, currentPage, totalPages, setCurrentPage, setPosts } =
    useMyPage();
  const { goToCommDetail } = useNavigation();

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    setPosts([]); // 새 페이지 데이터 요청을 위해 초기화
  };

  const handleDetailClick = (boardId) => {
    goToCommDetail(boardId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${
      date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }.${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
  };

  // ✅ 페이지네이션 계산
  const maxButtons = 5;
  const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  return (
    <div className="ml-5">
      <h2 className="text-2xl font-semibold mb-10 text-left">내가 작성한 글</h2>
      <div className="overflow-hidden">
        <table className="w-4/5 bg-white border border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="w-1/6 px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">
                No
              </th>
              <th className="w-3/5 px-6 py-3 border-r border-l bg-gray-50 text-center text-sm font-medium text-gray-500">
                제목
              </th>
              <th className="w-full px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="min-h-[512px]">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.boardId} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-700 text-sm text-center">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="px-6 py-4 text-blue-500 text-sm text-left">
                    <p
                      className="cursor-pointer w-fit"
                      onClick={() => handleDetailClick(post.boardId)}
                    >
                      {post.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm text-center">
                    {formatDate(post.regTime)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  작성된 글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ 페이지네이션 */}
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
        {endPage < totalPages && (
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

export default MyPostList;
