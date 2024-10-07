import React from "react";
import RoundedButton from "../../components/button/RoundedButton";

const CommPage = () => {
    // 목업 데이터
    const posts = [
        { id: 1, title: "첫 번째 글", author: "사용자1", date: "2024. 10. 01", views: 25, replies: 4 },
        { id: 2, title: "두 번째 글", author: "사용자2", date: "2024. 10. 02", views: 30, replies: 5 },
        { id: 3, title: "세 번째 글", author: "사용자3", date: "2024. 10. 03", views: 10, replies: 2 },
        { id: 4, title: "네 번째 글", author: "사용자4", date: "2024. 10. 04", views: 15, replies: 3 },
        { id: 5, title: "다섯 번째 글", author: "사용자5", date: "2024. 10. 05", views: 20, replies: 1 },
    ];

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
                    <RoundedButton>글쓰기</RoundedButton>
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
                            <td className="p-3 text-left">{post.title}</td>
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
