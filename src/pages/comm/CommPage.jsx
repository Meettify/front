import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuList, LuSearch } from "react-icons/lu";
import useCommStore from "../../stores/useCommStore";

const CommPage = () => {
  const {
    posts = [],
    fetchPosts,
    searchPosts,
    loading,
    error,
    totalPage,
  } = useCommStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const totalKeyword = searchParams.get("totalKeyword");
  const [showRules, setShowRules] = useState(false);

  const goToCommAdd = () => {
    navigate("/comm/add");
  };

  useEffect(() => {
    const fetchInitial = async () => {
      if (totalKeyword) {
        setSearchQuery(totalKeyword);
        setCurrentPage(1);
        const response = await searchPosts(
          1,
          10,
          sortOrder === "최신순" ? "desc" : "asc",
          totalKeyword.trim()
        );
      }
    };
    fetchInitial();
  }, [totalKeyword]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const sort = sortOrder === "최신순" ? "desc" : "asc";
        const response = searchQuery
          ? await searchPosts(currentPage, 10, sort, searchQuery)
          : await fetchPosts(currentPage, 10, sort);
      } catch (error) {
        console.error("페이지 데이터 가져오기 실패:", error);
      }
    };
    fetchPageData();
  }, [currentPage, sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchQuery.trim();
      setCurrentPage(1);

      const sort = sortOrder === "최신순" ? "desc" : "asc";

      if (query) {
        const response = await searchPosts(1, 10, sort, query);
      } else {
        const response = await fetchPosts(1, 10, sort);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow w-full px-10 mt-12 min-h-[600px]">
        <div className="text-3xl font-semibold mb-4 text-left">
          커뮤니티 둘러보기.
        </div>
        {/* 커뮤니티 안내 및 규칙 */}
        <div className="bg-blue-50 border border-blue-300 p-4 rounded-md mb-6 shadow-sm">
          <p className="text-base font-semibold text-blue-800">
            소통하고 싶은 이야기를 자유롭게 공유해보세요.
          </p>

          <div
            className={`transition-all duration-300 mt-3 text-sm text-gray-700 ${
              showRules ? "max-h-[500px]" : "max-h-[60px] overflow-hidden"
            }`}
          >
            <div className="mt-2">
              <p className="font-semibold text-gray-800">
                📌 커뮤니티 이용 규칙
              </p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>욕설, 비방, 혐오 표현은 금지됩니다.</li>
                <li>음란물 또는 부적절한 콘텐츠는 허용되지 않습니다.</li>
                <li>
                  타인의 개인정보(이름, 연락처, 주소 등)를 공유하지 마세요.
                </li>
                <li>광고, 홍보성 게시물은 관리자 승인 없이 금지됩니다.</li>
                <li>
                  반복적인 도배나 무의미한 댓글 작성은 제한될 수 있습니다.
                </li>
              </ol>
            </div>
          </div>

          <button
            className="text-blue-500 mt-2 text-sm hover:underline"
            onClick={() => setShowRules(!showRules)}
          >
            {showRules ? "간략히 보기 ▲" : "전체 규칙 보기 ▼"}
          </button>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <LuList size={16} />
            <span className="font-semibold">필터</span>
            <select
              className="p-2 border border-gray-300 rounded-lg text-sm"
              value={sortOrder}
              onChange={handleSortChange}
              style={{ transform: "translateY(3px)" }}
            >
              <option value="최신순">최신순</option>
              <option value="오래된순">오래된 순</option>
            </select>
          </div>
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="검색어 입력 후 Enter"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className="p-2 pl-10 border border-gray-300 rounded-full text-sm w-full"
            />
            <LuSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <RoundedButton
            style={{ padding: "6px 14px", fontSize: "12px" }}
            onClick={goToCommAdd}
          >
            글쓰기
          </RoundedButton>
        </div>
        <table className="w-full table-auto border-t border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-center font-medium w-1/12">번호</th>
              <th className="p-2 text-left font-medium w-5/12">제목</th>
              <th className="p-2 text-center font-medium w-2/12">작성자</th>
              <th className="p-2 text-center font-medium w-2/12">작성일</th>
              <th className="p-2 text-center font-medium w-1/12">조회수</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-10 text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr
                  key={post.communityId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2 text-center">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="p-2 text-left">
                    <Link
                      to={`/comm/detail/${post.communityId}`}
                      className="text-black hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-2 text-center">{post.nickName}</td>
                  <td className="p-2 text-center">
                    {new Date(post.regTime).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">{post.viewCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const getPageNumbers = (current, total) => {
    const blockSize = 5;
    const blockStart = Math.floor((current - 1) / blockSize) * blockSize + 1;
    const blockEnd = Math.min(blockStart + blockSize - 1, total);
    return Array.from(
      { length: blockEnd - blockStart + 1 },
      (_, i) => blockStart + i
    );
  };

  const pageNumbers = getPageNumbers(currentPage, totalPage);

  return (
    <nav className="flex justify-center mt-10 mb-10">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-6 h-6 border rounded-sm flex items-center justify-center ${
              currentPage === 1
                ? "border-gray-300 text-gray-300"
                : "border-gray-300 text-blue-500"
            }`}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`w-6 h-6 flex items-center justify-center text-sm ${
                currentPage === number
                  ? "text-black font-bold"
                  : "text-gray-500"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
            className={`w-6 h-6 border rounded-sm flex items-center justify-center ${
              currentPage === totalPage
                ? "border-gray-300 text-gray-300"
                : "border-gray-300 text-blue-500"
            }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CommPage;
