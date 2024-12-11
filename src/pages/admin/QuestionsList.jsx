import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import useQuestionsStore from '../../stores/useQuestionsStore';

const QuestionsList = () => {
  const { questions, totalQuestions, loading, fetchQuestions, fetchTotalQuestions } = useQuestionsStore();
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지 크기

  useEffect(() => {
    fetchQuestions(page, pageSize); // 문의글 목록 가져오기
    fetchTotalQuestions(); // 전체 문의글 수 가져오기
  }, [page, pageSize, fetchQuestions, fetchTotalQuestions]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="text-3xl font-semibold mb-4 text-left">문의글</div>


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
          {questions.map((question, index) => (
            <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="p-2 text-center">{index + 1 + (page - 1) * pageSize}</td>
              <td className="p-2 text-left">
                <Link to={`/questions/detail/${question.id}`} className="text-black hover:underline">
                  {question.title}
                </Link>
              </td>
              <td className="p-2 text-center">작성자</td>
              <td className="p-2 text-center">{new Date().toLocaleDateString()}</td>
              <td className="p-2 text-center">조회수</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPage={Math.ceil(totalQuestions / pageSize)}
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
            className={`w-4 h-4 border rounded-sm flex items-center justify-center ${currentPage === 1 ? 'border-gray-300 text-gray-300' : 'border-gray-300 text-blue-500'}`}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`w-5 h-4 flex items-center justify-center ${currentPage === number ? 'text-black' : 'text-gray-500'}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPage}
            className={`w-4 h-4 border rounded-sm flex items-center justify-center ${currentPage === totalPage ? 'border-gray-300 text-gray-300' : 'border-gray-300 text-blue-500'}`}
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default QuestionsList;
