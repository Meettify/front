import React from "react";
import { Link } from "react-router-dom"; // 페이지 이동을 위해 Link 사용
import RoundedButton from "../../components/button/RoundedButton";
import useCommStore from "../../stores/useCommStore";
import useNavigation from "../../hooks/useNavigation";

const CommPage = () => {
    const { posts } = useCommStore();
    const { goToEditor } = useNavigation(); // goToEditor 함수 사용

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

            <div className="flex justify-between items-center mb-4">
                <div></div>
                <div className="flex space-x-2">
                    <RoundedButton onClick={goToEditor}>글쓰기</RoundedButton>
                </div>
            </div>

            <table className="w-full table-fixed border-t border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-center font-medium w-1/12">번호</th>
                        <th className="p-3 text-left font-medium w-5/12">제목</th>
                        <th className="p-3 text-center font-medium w-2/12">작성자</th>
                        <th className="p-3 text-center font-medium w-2/12">작성일</th>
                        <th className="p-3 text-center font-medium w-1/12">조회수</th>
                        <th className="p-3 text-center font-medium w-1/12">답글</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3 text-center">{post.id}</td>
                            <td className="p-3 text-left">
                                <Link to={`/comm/detail/${post.id}`} className="text-blue-500 hover:underline">
                                    {post.title}
                                </Link>
                            </td>
                            <td className="p-3 text-center">{post.author}</td>
                            <td className="p-3 text-center">{post.date}</td>
                            <td className="p-3 text-center">{post.views}</td>
                            <td className="p-3 text-center">{post.replies}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-6">
                <nav className="flex space-x-1">
                    <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">1</button>
                </nav>
            </div>
        </div>
    );
};

export default CommPage;
