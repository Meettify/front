import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"; // 아이콘 사용
import useCommStore from "../../stores/useCommStore";

const CommPage = () => {
    const { posts, fetchPosts, loading, error } = useCommStore(); // Zustand 스토어 사용
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수

    const navigate = useNavigate(); // useNavigate 훅 사용

    const goToCommAdd = () => {
        console.log('글쓰기 페이지로 이동합니다.');
        navigate('/comm/add');
    };


    // 페이지 데이터 가져오기
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const total = await fetchPosts(currentPage); // 전체 페이지 수 반환
                setTotalPage(total); // 전체 페이지 수 설정
            } catch (error) {
                console.error('페이지 데이터 가져오기 실패:', error);
            }
        };
        fetchPageData();
    }, [currentPage, fetchPosts]);


    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) setCurrentPage(page);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="max-w-5xl mx-auto mt-12 px-4">
            <div className="text-3xl font-semibold mb-4 text-left">커뮤니티 둘러보기.</div>

            <div className="bg-gray-100 p-4 rounded-md mb-4 text-left">
                <p className="text-base mb-1">
                    유용한 답변을 공유하고 싶으신가요? 추천 기능을 이용해 보세요!
                </p>
                <p className="text-sm text-gray-600">
                    문제 해결에 도움이 된 답변에 추천을 눌러보세요.
                    <a href="#" className="text-blue-500 ml-1">Meettify 커뮤니티 더 알아보기</a>
                </p>
            </div>

            <div className="flex justify-end mb-3">
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
                    {posts.map((post, index) => (
                        <tr key={post.boardId} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="p-2 text-center">{index + 1 + (currentPage - 1) * 10}</td>
                            <td className="p-2 text-left">
                                <Link to={`/comm/detail/${post.boardId}`} className="text-black hover:underline">
                                    {post.title}
                                </Link>
                            </td>
                            <td className="p-2 text-center">{post.nickName}</td>
                            <td className="p-2 text-center">{new Date(post.regTime).toLocaleDateString()}</td>
                            <td className="p-2 text-center">{post.viewCount || 0}</td>
                        </tr>
                    ))}
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

export default CommPage;
