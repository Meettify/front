import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useAdminQuestionsStore from "../../stores/useAdminQuestionsStore";
import { useAuth } from "../../hooks/useAuth";

const QuestionsList = () => {
  const { questions, totalPages, loading, error, fetchQuestions } =
    useAdminQuestionsStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [currentBlockStart, setCurrentBlockStart] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [replyStatus, setReplyStatus] = useState("");

  useEffect(() => {
    fetchQuestions(currentPage, 10, sortOrder, replyStatus);
  }, [currentPage, sortOrder, replyStatus, fetchQuestions]);

  const handleRowClick = (id) => {
    if (id) {
      navigate(`/admin/questions/${id}`);
    } else {
      console.warn("Invalid question ID:", id);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "문제가 발생했습니다."}</p>;

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
                key={question.questionId}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(question.questionId)}
              >
                <td className="p-2 text-center">
                  {index + 1 + currentPage * 10}
                </td>
                <td className="p-2 text-left">{question.content}</td>
                <td className="p-2 text-center">
                  {new Date(question.regTime).toLocaleDateString()}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        currentBlockStart={currentBlockStart}
        setCurrentBlockStart={setCurrentBlockStart}
      />
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  currentBlockStart,
  setCurrentBlockStart,
}) => {
  const blockSize = 5;

  const startPage = currentBlockStart;
  const endPage = Math.min(startPage + blockSize, totalPages);

  const handlePrevBlock = () => {
    if (startPage - blockSize >= 0) {
      setCurrentBlockStart(startPage - blockSize);
      onPageChange(startPage - blockSize);
    }
  };

  const handleNextBlock = () => {
    if (startPage + blockSize < totalPages) {
      setCurrentBlockStart(startPage + blockSize);
      onPageChange(startPage + blockSize);
    }
  };

  return (
    <nav className="flex justify-center mt-10">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            onClick={handlePrevBlock}
            disabled={startPage === 0}
            className="w-8 h-8 border rounded flex items-center justify-center"
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>

        {Array.from(
          { length: endPage - startPage },
          (_, i) => startPage + i
        ).map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {page + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={handleNextBlock}
            disabled={startPage + blockSize >= totalPages}
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
