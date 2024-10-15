import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
import useCommStore from "../../stores/useCommStore";
import useNavigation from "../../hooks/useNavigation";

const CommPage = () => {
    const { posts, fetchPosts, loading, error } = useCommStore();  // Zustand에서 데이터 불러오기
    const { goToCommAdd } = useNavigation();

    useEffect(() => {
        fetchPosts();  // 컴포넌트 마운트 시 게시글 목록 불러오기
    }, [fetchPosts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto mt-20">
            <div className="text-4xl font-bold mb-6 text-left">커뮤니티 둘러보기.</div>
            <div className="bg-gray-100 p-6 rounded-md mb-6 text-left max-w-7xl">
                <p className="text-lg mb-2">
                    유용한 답변을 다른 사람들과도 공유하고 싶으신가요? 그렇다면 추천 기능을 이용해 보세요!
                </p>
                <p className="text-sm text-gray-700">
                    회원님이 문제를 해결할 수 있도록 도움을 주신 분이 있으신가요? 아니면 다른 사람의 답변이 도움이 되었다면 추천해 주세요.
                    <a href="#" className="text-blue-500 ml-1"> 모임 더 알아보기 - Meettify 커뮤니티</a>
                </p>
            </div>

            {/* 글쓰기 버튼 */}
            <div className="flex justify-between items-center mb-4">
                <div></div>
                <div className="flex space-x-2">
                    <RoundedButton onClick={() => goToCommAdd("/comm/add")}>글쓰기</RoundedButton>
                </div>
            </div>

            {/* 글 목록 테이블 */}
            <table className="w-full table-fixed border-t border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-center font-medium w-1/12">번호</th>
                        <th className="p-3 text-left font-medium w-5/12">제목</th>
                        <th className="p-3 text-center font-medium w-2/12">작성자</th>
                        <th className="p-3 text-center font-medium w-2/12">작성일</th>
                        <th className="p-3 text-center font-medium w-1/12">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.boardId} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3 text-center">{index + 1}</td>
                            <td className="p-3 text-left">
                                <Link to={`/comm/detail/${post.boardId}`} className="text-blue-500 hover:underline">
                                    {post.title}
                                </Link>
                            </td>
                            <td className="p-3 text-center">{post.nickName}</td>
                            <td className="p-3 text-center">{new Date(post.regTime).toLocaleDateString()}</td>
                            <td className="p-3 text-center">{post.views || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommPage;
