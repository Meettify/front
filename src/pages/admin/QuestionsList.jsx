import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAnswerStore from '../../stores/useAnswerStore';
import { LuList } from 'react-icons/lu';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const QuestionsList = () => {
  const { questions, fetchQuestions, loading, error } = useAnswerStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const loadAnswers = async () => {
      const total = await fetchQuestions(currentPage, 10, sortOrder);
      setTotalPages(total);
    };
    loadAnswers();
  }, [currentPage, sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="text-3xl font-semibold mb-4">답변 관리</div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <LuList size={16} />
          <span className="font-semibold">정렬</span>
          <select
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="desc">최신순</option>
            <option value="asc">오래된순</option>
          </select>
        </div>
      </div>

      <table className="w-full table-auto border-t border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-center font-medium">번호</th>
            <th className="p-2 text-left font-medium">질문</th>
            <th className="p-2 text-left font-medium">답변 상태</th>
            <th className="p-2 text-center font-medium">작성일</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(questions) && questions.map((question, index) => (
            <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="p-2 text-center">{index + 1 + currentPage * 10}</td>
              <td className="p-2 text-left">
                <Link to={`/admin/questions/${question.id}`} className="text-black hover:underline">
                  {question.content}
                </Link>
              </td>
              <td className="p-2 text-left">
                {question.answered ? '답변 완료' : '미답변'}
              </td>
              <td className="p-2 text-center">
                {new Date(question.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="flex justify-center mt-10">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="w-8 h-8 border rounded flex items-center justify-center"
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              className={`w-8 h-8 flex items-center justify-center ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="w-8 h-8 border rounded flex items-center justify-center"
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default QuestionsList;
