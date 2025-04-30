import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuList, LuSearch } from "react-icons/lu";
import useCommStore from "../../stores/useCommStore";

const CommPage = () => {
  const { posts, fetchPosts, searchPosts, loading, error } = useCommStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const goToCommAdd = () => {
    console.log("글쓰기 페이지로 이동합니다.");
    navigate("/comm/add");
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const sort = sortOrder === "최신순" ? "desc" : "asc";
        const total = searchQuery
          ? await searchPosts(currentPage, 10, sort, searchQuery)
          : await fetchPosts(currentPage, 10, sort);
        setTotalPage(total);

        const sortedPosts = [...posts].sort((a, b) => {
          if (sort === "desc") {
            return new Date(b.regTime) - new Date(a.regTime);
          } else {
            return new Date(a.regTime) - new Date(b.regTime);
          }
        });
        console.log("Sorted posts on client:", sortedPosts);
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

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        searchPosts(
          currentPage,
          10,
          sortOrder === "최신순" ? "desc" : "asc",
          searchQuery
        );
      } else {
        setSearchQuery("");
        fetchPosts(currentPage, 10, sortOrder === "최신순" ? "desc" : "asc");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {" "}
      {/* 전체 높이 확보 */}
      <div className="flex-grow w-full px-10 mt-12 min-h-[600px]">
        {" "}
        {/* 넓게 사용 + 최소 높이 */}
        <div className="text-3xl font-semibold mb-4 text-left">
          커뮤니티 둘러보기.
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4 text-left">
          <p className="text-base mb-1">
            유용한 답변을 공유하고 싶으신가요? 추천 기능을 이용해 보세요!
          </p>
          <p className="text-sm text-gray-600">
            문제 해결에 도움이 된 답변에 추천을 눌러보세요.
            <a href="#" className="text-blue-500 ml-1">
              Meettify 커뮤니티 더 알아보기
            </a>
          </p>
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
            {posts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-10 text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr
                  key={post.boardId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2 text-center">
                    {index + 1 + (currentPage - 1) * 10}
                  </td>
                  <td className="p-2 text-left">
                    <Link
                      to={`/comm/detail/${post.boardId}`}
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
  return (
    <nav className="flex justify-center mt-10 mb-10">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-6 h-6 border rounded-sm flex items-center justify-center
              ${
                currentPage === 1
                  ? "border-gray-300 text-gray-300"
                  : "border-gray-300 text-blue-500"
              }`}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`w-6 h-6 flex items-center justify-center text-sm
                ${
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
            className={`w-6 h-6 border rounded-sm flex items-center justify-center
              ${
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
