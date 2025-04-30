import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../stores/useQuestionsStore";

const MyQuestionsPage = () => {
  const navigate = useNavigate();
  const { questions, fetchMyQuestions, loading, error } = useQuestionsStore();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMyQuestions(page, 10); // 한 페이지에 10개
      if (result?.totalPage !== undefined) {
        setTotalPages(result.totalPage);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-5xl mx-auto mt-12 px-4 text-left">
        <h2 className="text-4xl font-bold mb-8 text-center">내 문의 목록</h2>

        {loading ? (
          <p className="text-center">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">에러: {error}</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-600">작성한 문의가 없습니다.</p>
        ) : (
          <>
            {/* 카드형 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions.map((question) => (
                <div
                  key={question.questionId}
                  onClick={() => navigate(`/question/${question.questionId}`)}
                  className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {question.content}
                  </p>
                  {question.regTime && (
                    <p className="text-xs text-gray-400 mt-2">
                      작성일: {question.regTime}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* 페이징 UI */}
            <div className="mt-10 flex justify-center items-center space-x-4 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MyQuestionsPage;
