import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuList } from "react-icons/lu";
import useMeetBoardStore from "../../stores/useMeetBoardStore";

const MeetBoard = () => {
  const { meetId } = useParams();
  const { setMeetId } = useMeetBoardStore();
  const [boardList, setBoardList] = useState([]);
  const { posts, fetchPosts, loading, error } = useMeetBoardStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("최신순");
  const navigate = useNavigate();
  const location = useLocation();
  const meetName = location.state?.meetName || meetId;

  const goToMeetBoardWrite = () => {
    navigate("/meetBoards", { state: { meetId } });
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const sort = sortOrder === "최신순" ? "desc" : "asc";
        const response = await fetchPosts(currentPage, 10, sort, meetId);
        const {
          content,
          totalPages,
          currentPage: fetchedCurrentPage,
        } = response;

        setBoardList(content);
        setTotalPage(totalPages);
        setCurrentPage(fetchedCurrentPage);
      } catch (error) {
        console.error("페이지 데이터 가져오기 실패:", error);
        setBoardList([]);
        setTotalPage(0);
      }
    };

    fetchPageData();
    setMeetId(meetId);
  }, [meetId, currentPage, sortOrder, setMeetId, fetchPosts]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // 최신순 → 오래된순 등으로 state 변경
    setCurrentPage(1); // 정렬이 바뀌면 첫 페이지부터 다시 시작
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) setCurrentPage(page);
  };

  const [showRules, setShowRules] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 min-h-screen pb-32">
      <div className="text-3xl font-semibold mb-4 text-left">
        [{meetName}] 둘러보기
      </div>

      {/* 커뮤니티 안내 문구 + 규칙 */}
      <div className="bg-blue-50 border border-blue-300 p-4 rounded-md mb-6 shadow-sm">
        <p className="text-base font-semibold text-blue-800">
          모임 참여자들과 소통하고 싶은 이야기를 자유롭게 공유해보세요.
        </p>

        <div
          className={`transition-all duration-300 mt-3 text-sm text-gray-700 ${
            showRules ? "max-h-[500px]" : "max-h-[60px] overflow-hidden"
          }`}
        >
          <div className="mt-2">
            <p className="font-semibold text-gray-800">📌 커뮤니티 이용 규칙</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>욕설, 비방, 혐오 표현은 금지됩니다.</li>
              <li>음란물 또는 부적절한 콘텐츠는 허용되지 않습니다.</li>
              <li>타인의 개인정보(이름, 연락처, 주소 등)를 공유하지 마세요.</li>
              <li>광고, 홍보성 게시물은 관리자 승인 없이 금지됩니다.</li>
              <li>반복적인 도배나 무의미한 댓글 작성은 제한될 수 있습니다.</li>
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

      {/* 필터 + 글쓰기 */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <LuList size={16} />
          <span className="font-semibold">필터</span>
          <select
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된 순</option>
          </select>
        </div>
        <RoundedButton
          style={{ padding: "6px 14px", fontSize: "12px" }}
          onClick={goToMeetBoardWrite}
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
          {Array.isArray(boardList) && boardList.length > 0 ? (
            boardList.map((post, index) => {
              const pageIndex =
                currentPage && !isNaN(currentPage)
                  ? index + 1 + (currentPage - 1) * 10
                  : index + 1;

              return (
                <tr
                  key={post.boardId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-2 text-center">{pageIndex}</td>
                  <td className="p-2 text-left">
                    <Link
                      to={`/meetBoards/${post.meetBoardId}`}
                      state={{ meetId }}
                      className="text-black hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="p-2 text-center">{post.nickName}</td>
                  <td className="p-2 text-center">
                    {new Date(post.postDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">{post.viewCount}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                게시물이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <nav className="flex justify-center mt-10">
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
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium
                ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
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

export default MeetBoard;
