import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import useAdminQuestionsStore from '../../stores/useAdminQuestionsStore';
import { useAuth } from '../../hooks/useAuth';

const QuestionsList = () => {
  const {
    questions,
    totalPages,
    loading,
    error,
    fetchQuestions,
  } = useAdminQuestionsStore();

  const { user } = useAuth();
  const navigate = useNavigate(); // useNavigate 초기화
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [replyStatus, setReplyStatus] = React.useState('');

  useEffect(() => {
    fetchQuestions(currentPage, 10, sortOrder, replyStatus);
  }, [currentPage, sortOrder, replyStatus, fetchQuestions]);

  const handleRowClick = (id) => {
    if (id) {
      console.log('Navigating to:', `/admin/questions/${id}`); // 디버깅 추가
      navigate(`/admin/questions/${id}`); // 페이지 이동
    } else {
      console.warn('Invalid question ID:', id);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || '문제가 발생했습니다.'}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="text-3xl font-semibold mb-4">문의 관리</div>

      <table className="w-full table-auto border-t border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-center font-medium">번호</th>
            <th className="p-2 text-left font-medium">질문</th>
            <th className="p-2 text-center font-medium">작성일</th>
            <th className="p-2 text-center font-medium">답변</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(questions) &&
            questions.map((question, index) => (
              <tr
                key={question.questionId} // 여기에서 key prop을 추가
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(question.questionId)} // 클릭 시 이동
              >
                <td className="p-2 text-center">{index + 1 + currentPage * 10}</td>
                <td className="p-2 text-left">{question.content}</td>
                <td className="p-2 text-center">
                  {new Date(question.regTime).toLocaleDateString()}  {/* 작성일 필드 수정 */}
                </td>
                <td className="p-2 text-center">
                  {question.answered ? (
                    <span className="text-green-500">답변</span>
                  ) : (
                    <span className="text-red-500">미답변</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
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

export default QuestionsList;
