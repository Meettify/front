import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuList } from 'react-icons/lu';
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
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [replyStatus, setReplyStatus] = React.useState('');

  useEffect(() => {
    console.log('Fetching questions:', { currentPage, sortOrder, replyStatus }); // 디버깅 추가
    fetchQuestions(currentPage, 10, sortOrder, replyStatus);
  }, [currentPage, sortOrder, replyStatus, fetchQuestions]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    console.log('정렬 변경:', event.target.value); // 디버깅 추가
    setCurrentPage(0);
  };

  const handleReplyStatusChange = (event) => {
    setReplyStatus(event.target.value);
    console.log('답변 상태 변경:', event.target.value); // 디버깅 추가
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      console.log('페이지 변경:', page); // 디버깅 추가
      setCurrentPage(page);
    }
  };

  if (loading) {
    console.log('Loading 상태 활성화'); // 디버깅 추가
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Error 상태:', error); // 디버깅 추가
    return <p>Error: {error.message || '문제가 발생했습니다.'}</p>;
  }

  console.log('렌더링 데이터:', { questions, totalPages }); // 디버깅 추가

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="text-3xl font-semibold mb-4">문의 관리</div>

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
          {/* <span className="font-semibold">답변 상태</span>
          <select
            className="p-2 border border-gray-300 rounded-lg text-sm"
            value={replyStatus}
            onChange={handleReplyStatusChange}
          >
            <option value="">전체</option>
            <option value="answered">답변 완료</option>
            <option value="unanswered">미답변</option>
          </select> */}
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
          {Array.isArray(questions) &&
            questions.map((question, index) => (
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
