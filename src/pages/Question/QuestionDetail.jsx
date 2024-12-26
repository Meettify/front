import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../../api/questionsAPI';
import useCommentStore from '../../stores/useCommentStore';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import { CiRead } from 'react-icons/ci';
import { LiaEdit } from "react-icons/lia";
import { TiDelete } from "react-icons/ti";
import { BiReplyAll } from "react-icons/bi";

const QuestionDetail = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const { questionId } = useParams();  // URL에서 questionId 추출
  const { comments = [], fetchComments, addComment, updateComment, deleteComment } = useCommentStore();

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const questionData = await getQuestion(questionId);
        setQuestion(questionData);
        await fetchComments(questionId);  // 댓글도 함께 가져오기
      } catch (err) {
        console.error('문의 조회 중 오류 발생:', err);
        setError('문의 조회 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, fetchComments]);

  const handleCommentChange = (e) => setCommentContent(e.target.value);
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    try {
      await addComment(questionId, commentContent);  // 댓글 등록
      setCommentContent('');
    } catch (error) {
      console.error('댓글 등록 중 오류:', error);
    }
  };

  const handleReplyChange = (e) => setReplyContent(e.target.value);
  const handleEditChange = (e) => setEditingContent(e.target.value);

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.comment);
  };

  const confirmEdit = async () => {
    try {
      await updateComment(questionId, editingCommentId, editingContent);  // 댓글 수정
      setEditingCommentId(null);
      setEditingContent('');
      await fetchComments(questionId);
    } catch (error) {
      console.error('댓글 수정 중 오류:', error);
    }
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(questionId, commentId);  // 댓글 삭제
      await fetchComments(questionId);
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  const handleReply = (commentId) => {
    if (replyingCommentId === commentId) {
      setReplyingCommentId(null);
    } else {
      setReplyingCommentId(commentId);
      setReplyContent('');
    }
  };

  const submitReply = async () => {
    if (!replyContent.trim()) return;
    try {
      await addComment(questionId, replyContent, replyingCommentId);  // 답글 등록
      setReplyingCommentId(null);
      setReplyContent('');
      await fetchComments(questionId);
    } catch (error) {
      console.error('답글 등록 중 오류:', error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!question) {
    return <p>문의글을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="text-left max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          <span>{question.nickName}</span>
          <span className="block text-sm">
            작성일: {new Date(question.regTime).toLocaleString()}
          </span>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: question.content }} className="text-gray-700 mb-6" />

      <div className="border-t border-gray-200 pt-5">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="댓글을 입력하세요..."
          value={commentContent}
          onChange={handleCommentChange}
        />
        <RoundedButton onClick={handleCommentSubmit} disabled={!commentContent.trim()}>
          등록하기
        </RoundedButton>
      </div>

      <ul className="mt-5 space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const isEditing = editingCommentId === comment.commentId;
            const isReplying = replyingCommentId === comment.commentId;

            return (
              <li key={comment.commentId} className="border-b pb-2">
                <div className="text-md font-semibold">{comment.nickName}</div>

                {isEditing ? (
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={editingContent}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                    <button
                      className="flex items-center text-green-500"
                      onClick={confirmEdit}
                    >
                      확인
                    </button>
                    <button
                      className="flex items-center text-red-500"
                      onClick={cancelEdit}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div>{comment.comment}</div>
                )}

                <div className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>

                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="flex items-center text-gray-500"
                    onClick={() => handleReply(comment.commentId)}
                  >
                    <BiReplyAll className="mr-1" />
                    답글
                  </button>
                  <button
                    className="flex items-center text-blue-500"
                    onClick={() => handleEditComment(comment)}
                  >
                    <LiaEdit className="mr-1" />
                    수정
                  </button>
                  <button
                    className="flex items-center text-red-500"
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    <TiDelete className="mr-1" />
                    삭제
                  </button>
                </div>

                {isReplying && (
                  <div className="ml-4 mt-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={handleReplyChange}
                      placeholder="답글을 입력하세요..."
                      className="w-full p-2 border rounded mb-2"
                    />
                    <RoundedButton onClick={submitReply} disabled={!replyContent.trim()}>
                      답글 등록
                    </RoundedButton>
                  </div>
                )}

                {comment.children && comment.children.map((child) => (
                  <div key={child.commentId} className="ml-8 mt-2">
                    <div className="text-sm font-semibold text-gray-700">{child.nickName}</div>
                    <div>{child.comment}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(child.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </li>
            );
          })
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionDetail;
