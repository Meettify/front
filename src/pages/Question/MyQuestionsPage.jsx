import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuestionsStore from "../../stores/useQuestionsStore";  // 질문을 가져오는 store
import RoundedButton from "../../components/button/RoundedButton";  // 버튼 컴포넌트

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

              {/* 관리자 답변 출력 */}
              {question.adminResponse && (
                <div className="mt-4">
                  <h4 className="font-semibold">관리자 답변:</h4>
                  <p>{question.adminResponse}</p>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyQuestionsPage;
