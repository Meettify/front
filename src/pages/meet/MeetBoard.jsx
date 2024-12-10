import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuList } from "react-icons/lu"; // LuList 아이콘 임포트
import useMeetBoardStore from "../../stores/useMeetBoardStore";
import { MeetBoardList } from "../../api/meetAPI";

const MeetBoard = () => {
    const { meetId } = useParams();
    const [boardList, setBoardList] = useState([]); // 게시판 리스트 상태
    const { posts, fetchPosts, loading, error } = useMeetBoardStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("최신순"); // 정렬 상태 유지
    const navigate = useNavigate();

    const goToMeetBoardWrite = () => {
        console.log('글쓰기 페이지로 이동합니다.');
        navigate('/meetBoards');
    };

    // 게시판 데이터 불러오기
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const sort = sortOrder === "최신순" ? "desc" : "asc";
                console.log(`Fetching posts for meetId: ${meetId} with sort order: ${sort}`);
                
                // API에서 데이터 가져오기
                const response = await fetchPosts(currentPage, 10, sort, meetId);
    
                // 응답이 정상적인지 확인하고, content와 totalPages 존재 여부 확인
                if (response && response.content && response.totalPages !== undefined) {
                    setBoardList(response.content);  // 게시판 리스트 상태 업데이트
                    setTotalPage(response.totalPages); // 전체 페이지 수 설정
                } else {
                    // 응답 데이터가 없거나 예상과 다른 형식일 경우 처리
                    console.error("응답 형식이 잘못되었습니다.", response);
                    setBoardList([]); // 빈 배열로 초기화
                    setTotalPage(0);  // 전체 페이지 수를 0으로 설정
                }
            } catch (error) {
                console.error("페이지 데이터 가져오기 실패:", error);
                setBoardList([]); // 오류 발생 시 빈 배열로 초기화
                setTotalPage(0);  // 오류 발생 시 전체 페이지 수 0으로 설정
            }
        };
    
        fetchPageData();
    }, [currentPage, sortOrder, meetId]); // `meetId`, `sortOrder` 변경 시마다 데이터 갱신

    const handleSortChange = (event) => {
        setSortOrder(event.target.value); // 정렬 상태 변경
        setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) setCurrentPage(page);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-5xl mx-auto mt-12 px-4">
            <div className="text-3xl font-semibold mb-4 text-left"> {meetId} 게시판 둘러보기.</div>

            <div className="bg-gray-100 p-4 rounded-md mb-4 text-left">
                <p className="text-base mb-1">유용한 답변을 공유하고 싶으신가요? 추천 기능을 이용해 보세요!</p>
                <p className="text-sm text-gray-600">
                    문제 해결에 도움이 된 답변에 추천을 눌러보세요.
                    <a href="#" className="text-blue-500 ml-1">Meettify 커뮤니티 더 알아보기</a>
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
                        style={{ transform: 'translateY(3px)' }}
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
                {/* posts가 배열인지 확인한 후 map 사용 */}
                {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post, index) => (
                    <tr key={post.boardId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-2 text-center">{index + 1 + (currentPage - 1) * 10}</td>
                    <td className="p-2 text-left">
                        <Link to={`/meetBoards/${post.boardId}`} className="text-black hover:underline">
                        {post.title}
                        </Link>
                    </td>
                    <td className="p-2 text-center">{post.nickName}</td>
                    <td className="p-2 text-center">{new Date(post.regTime).toLocaleDateString()}</td>
                    <td className="p-2 text-center">{post.viewCount}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">게시물이 없습니다.</td>
                </tr>
                )}
            </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
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
                        className={`w-4 h-4 border rounded-sm flex items-center justify-center
                            ${currentPage === 1 ? 'border-gray-300 text-gray-300' : 'border-gray-300 text-blue-500'}
                        `}
                    >
                        <MdKeyboardArrowLeft />
                    </button>
                </li>
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`w-5 h-4 flex items-center justify-center
          ${currentPage === number ? 'text-black' : 'text-gray-500'}
      `}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPage}
                        className={`w-4 h-4 border rounded-sm flex items-center justify-center
                            ${currentPage === totalPage ? 'border-gray-300 text-gray-300' : 'border-gray-300 text-blue-500'}
                        `}
                    >
                        <MdKeyboardArrowRight />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default MeetBoard;
