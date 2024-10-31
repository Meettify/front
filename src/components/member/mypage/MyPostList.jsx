import React, { useEffect, useState } from 'react';

const mockGetMyPostList = async () => {
  return [
    {
      boardId: 1,
      title: "React 상태 관리 기법",
      regTime: "2023-08-10T14:25:00",
    },
    {
      boardId: 5,
      title: "JavaScript 클로저 이해하기",
      regTime: "2023-07-20T09:12:00",
    },
    {
      boardId: 3,
      title: "TailwindCSS로 반응형 디자인 구현",
      regTime: "2023-06-15T17:45:00",
    },
    {
      boardId: 4,
      title: "Node.js와 Express로 API 서버 만들기",
      regTime: "2023-05-05T08:30:00",
    },
    {
      boardId: 2,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
    {
      boardId: 9,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
    {
      boardId: 6,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
    {
      boardId: 7,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
    {
      boardId: 8,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
    {
      boardId: 10,
      title: "Java 기초 문법 정리",
      regTime: "2023-04-01T11:00:00",
    },
  ];
};

const MyPostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await mockGetMyPostList();
        const sortedPosts = response.sort((a, b) => b.boardId - a.boardId);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handleDetailClick = (postId) => {
    console.log("글 디테일", postId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.
        ${date.getMonth()+1 >= 10 ? (date.getMonth()+1) : '0'+ (date.getMonth()+1)}.
        ${date.getDate() >= 10 ? (date.getDate()) : '0'+(date.getDate()+1)}`;
  };

  return (
    <div className='ml-5'>
      <h2 className="text-2xl font-semibold mb-10 text-left">내가 작성한 글</h2>
      <div className="overflow-hidden">
        <table className="w-4/5 h-[555px] bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="w-1/6 px-6 py-3 border-b bg-gray-50 text-center text-sm font-medium text-gray-500">No</th>
              <th className="w-3/5 px-6 py-3 border-b bg-gray-50 text-center text-sm font-medium text-gray-500">제목</th>
              <th className="w-full px-6 py-3 border-b bg-gray-50 text-center text-sm font-medium text-gray-500">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.boardId} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b text-gray-700 text-sm">{posts.length - index}</td>
                  <td className="px-6 py-4 border-b text-blue-500 text-sm  text-left" >
                    <p className='cursor-pointer w-fit' onClick={() => handleDetailClick(post.boardId)}>{post.title}</p>
                  </td>
                  <td className="px-6 py-4 border-b text-gray-700 text-sm">{formatDate(post.regTime)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500 text-sm">
                  작성된 글이 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2 w-4/5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          이전 페이지
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default MyPostList;