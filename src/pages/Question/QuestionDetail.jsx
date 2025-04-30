import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questionsAPI";
import useAnswerStore from "../../stores/useAnswerStore";
import RoundedButton from "../../components/button/RoundedButton";
import { LiaEdit } from "react-icons/lia";
import { TiDelete } from "react-icons/ti";

const QuestionDetail = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");

  const { questionId } = useParams();
  const {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    questions,
    loading: answerLoading,
  } = useAnswerStore();

  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!questionId) {
        setLoading(false);
        return;
      }
      try {
        const questionData = await getQuestion(questionId);
        setQuestion(questionData);
      } catch (err) {
        console.error("문의 조회 중 오류 발생:", err);
        setError("문의 조회 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId]);

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) return;
    try {
      await createAnswer(Number(questionId), answer);
      setAnswer("");
    } catch (err) {
      console.error("답변 등록 중 오류:", err);
    }
  };

  const handleAnswerEdit = (answerId, content) => {
    setEditingAnswerId(answerId);
    setEditingContent(content);
  };

  const handleAnswerUpdate = async () => {
    try {
      await updateAnswer(Number(questionId), editingAnswerId, editingContent);
      setEditingAnswerId(null);
      setEditingContent("");
    } catch (err) {
      console.error("답변 수정 오류:", err);
    }
  };

  const handleAnswerDelete = async (answerId) => {
    try {
      await deleteAnswer(Number(questionId), answerId);
    } catch (err) {
      console.error("답변 삭제 오류:", err);
    }
  };

  const currentQuestion = questions.find((q) => q.id === Number(questionId));
  const answers = currentQuestion?.answers || [];

  if (loading) return <p className="text-center mt-10">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!question)
    return <p className="text-center mt-10">문의글을 찾을 수 없습니다.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow w-full px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow min-h-[600px]">
          <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            작성자: <span className="font-medium">{question.nickName}</span> |{" "}
            {new Date(question.regTime).toLocaleString()}
          </div>

          <div className="text-gray-800 mb-12 whitespace-pre-wrap min-h-[200px] border p-4 rounded">
            <div dangerouslySetInnerHTML={{ __html: question.content }} />
          </div>

          <div className="border-t pt-6 mb-8">
            <textarea
              className="w-full p-4 border rounded mb-2 min-h-[100px] resize-none"
              placeholder="답변을 입력하세요..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <RoundedButton
              onClick={handleAnswerSubmit}
              disabled={!answer.trim()}
            >
              등록하기
            </RoundedButton>
          </div>

          <ul className="space-y-6">
            {answers.length > 0 ? (
              answers.map((ans) => (
                <li key={ans.id} className="bg-gray-100 p-4 rounded">
                  <div className="text-sm font-semibold text-gray-700">
                    {ans.writerName}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(ans.createdAt).toLocaleString()}
                  </div>

                  {editingAnswerId === ans.id ? (
                    <div className="flex flex-col gap-2 mb-2">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAnswerUpdate}
                          className="text-green-600 font-medium"
                        >
                          확인
                        </button>
                        <button
                          onClick={() => setEditingAnswerId(null)}
                          className="text-red-500"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{ans.comment}</p>
                  )}

                  <div className="flex justify-end space-x-3 text-sm mt-3">
                    <button
                      onClick={() => handleAnswerEdit(ans.id, ans.comment)}
                      className="text-blue-500 flex items-center"
                    >
                      <LiaEdit className="mr-1" /> 수정
                    </button>
                    <button
                      onClick={() => handleAnswerDelete(ans.id)}
                      className="text-red-500 flex items-center"
                    >
                      <TiDelete className="mr-1" /> 삭제
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400">답변이 없습니다.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetail;
