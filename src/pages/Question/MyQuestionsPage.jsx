import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../stores/useQuestionsStore";  // 질문을 가져오는 store

const MyQuestionsPage = () => {
  const navigate = useNavigate();
  const { questions, loading, error, fetchMyQuestions } = useQuestionsStore();  // 질문 목록과 불러오기 함수

  useEffect(() => {
    fetchMyQuestions(0, 10);  // 첫 번째 페이지, 10개 항목
  }, [fetchMyQuestions]);

  console.log("Questions:", questions); // 디버깅: 받아온 데이터 확인

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>문제를 가져오는 중 오류가 발생했습니다: {error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 text-left">
      <h2 className="text-4xl font-bold mb-6">내 문의 목록</h2>

      {/* 질문 목록을 출력 */}
      <ul>
        {questions.length === 0 ? (
          <li>작성한 문의가 없습니다.</li>
        ) : (
          questions.map((question) => (
            <li key={question.questionId} className="mb-4 border p-4 rounded-md shadow-sm">
              <h3 className="font-semibold">{question.title}</h3>
              <p>{question.content}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyQuestionsPage;
