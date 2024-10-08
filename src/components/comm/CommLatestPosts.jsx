import React from "react";

const CommLatestPosts = () => {
    // 예시 데이터를 사용하여 최신 글 3개만 표시
    const posts = [
        { id: 1, title: "글 제목 1", author: "작성자", date: "2024. 10. 01", views: 13, replies: 3 },
        { id: 2, title: "글 제목 2", author: "작성자", date: "2024. 10. 01", views: 13, replies: 3 },
        { id: 3, title: "글 제목 3", author: "작성자", date: "2024. 10. 01", views: 13, replies: 3 },
    ];

    return (
        <div className="my-10">
            {posts.length === 0 ? (
                <div className="text-center p-5 text-gray-500">게시글이 없습니다.</div>
            ) : (
                <table className="w-full table-fixed border-t border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-center font-medium">번호</th>
                            <th className="p-3 text-left font-medium">제목</th>
                            <th className="p-3 text-center font-medium">작성자</th>
                            <th className="p-3 text-center font-medium">작성일</th>
                            <th className="p-3 text-center font-medium">조회수</th>
                            <th className="p-3 text-center font-medium">답글</th>
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
            )}
        </div>
    );

};

export default CommLatestPosts;
