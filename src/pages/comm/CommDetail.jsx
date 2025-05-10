import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCommStore from "../../stores/useCommStore";
import useCommentStore from "../../stores/useCommentStore";
import { useAuth } from "../../hooks/useAuth";
import RoundedButton from "../../components/button/RoundedButton";
import RoundedCancelButton from "../../components/button/RoundedCancelButton";
import RoundedDeleteButton from "../../components/button/RoundedDeleteButton";
import { CiRead } from "react-icons/ci";
import { LiaEdit } from "react-icons/lia";
import { TiDelete } from "react-icons/ti";
import { BiReplyAll } from "react-icons/bi";

const CommDetail = () => {
  const { id: boardId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchPostDetail, postDetail, deletePost } = useCommStore();
  const {
    comments = [],
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    pagination,
  } = useCommentStore();

  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstLoad = useRef(true);

  console.log("id 체크 :", user.id);
  console.log("user 전체 구조:", user);

  useEffect(() => {
    const fetchDetail = async () => {
      await fetchPostDetail(boardId);
      await fetchComments(boardId, currentPage);
    };

    if (boardId && isFirstLoad.current) {
      fetchDetail();
      isFirstLoad.current = false;
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) fetchComments(boardId, currentPage);
  }, [currentPage]);

  const deleteComm = async (boardId) => {
    try {
      await deletePost(boardId);
      navigate("/comm");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    await addComment(boardId, commentContent);
    setCommentContent("");
    fetchComments(boardId, currentPage);
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyContent.trim()) return;
    await addComment(boardId, replyContent, parentId);
    setReplyContent("");
    setReplyingCommentId(null);
    fetchComments(boardId, currentPage);
  };

  const confirmEdit = async () => {
    await updateComment(boardId, editingCommentId, editingContent);
    setEditingCommentId(null);
    setEditingContent("");
    fetchComments(boardId, currentPage);
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(boardId, commentId);
    fetchComments(boardId, currentPage);
  };

  const renderComment = (comment, depth = 0) => {
    const isAuthor = user?.id === comment.memberId;
    const isEditing = editingCommentId === comment.commentId;
    const isReplying = replyingCommentId === comment.commentId;

    return (
      <div
        key={comment.commentId}
        className={`mt-4 p-4 rounded border ${
          depth > 0 ? "ml-4 bg-gray-50 border-l-4 border-gray-200" : "bg-white"
        }`}
      >
        <div className="flex justify-between">
          <div>
            <strong>{comment.nickName}</strong>
            <div className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex gap-2 text-sm">
              <button onClick={() => setReplyingCommentId(comment.commentId)}>
                <BiReplyAll /> 답글
              </button>
              <button
                onClick={() => {
                  setEditingCommentId(comment.commentId);
                  setEditingContent(comment.comment);
                }}
              >
                <LiaEdit /> 수정
              </button>
              <button onClick={() => handleDeleteComment(comment.commentId)}>
                <TiDelete /> 삭제
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <RoundedCancelButton onClick={() => setEditingCommentId(null)}>
                취소
              </RoundedCancelButton>
              <RoundedButton onClick={confirmEdit}>수정 완료</RoundedButton>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-left">{comment.comment}</div>
        )}

        {isReplying && (
          <div className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글 입력"
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end mt-2 gap-2">
              <RoundedCancelButton onClick={() => setReplyingCommentId(null)}>
                취소
              </RoundedCancelButton>
              <RoundedButton
                onClick={() => handleReplySubmit(comment.commentId)}
              >
                답글 등록
              </RoundedButton>
            </div>
          </div>
        )}

        {comment.children?.map((child) => renderComment(child, depth + 1))}
      </div>
    );
  };

  const renderPagination = () => {
    const totalPage = pagination?.totalPage || 1;
    if (totalPage <= 1) return null;

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return (
      <div className="flex justify-center mt-6 gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-300"
          >
            &lt;
          </button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-300"
          >
            &gt;
          </button>
        )}
      </div>
    );
  };

  if (!postDetail) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        {postDetail.title}
      </h1>

      <div className="flex justify-between items-start mb-4 mt-10">
        {/* 왼쪽: 닉네임 + 날짜 + 조회수 */}
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {postDetail.nickName}
          </p>
          <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
            <span>{new Date(postDetail.regTime).toLocaleDateString()}</span>
            <span className="text-gray-400">·</span>
            <span>
              {new Date(postDetail.regTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-gray-400">·</span>
            <span>조회수 {postDetail.viewCount ?? 0}</span>
          </div>
        </div>

        {/* 오른쪽: 수정/삭제 버튼 */}
        {user?.nickName === postDetail.nickName && (
          <div className="flex gap-2">
            <RoundedButton onClick={() => navigate(`/comm/edit/${boardId}`)}>
              수정
            </RoundedButton>
            <RoundedDeleteButton onClick={() => deleteComm(boardId)}>
              삭제
            </RoundedDeleteButton>
          </div>
        )}
      </div>

      <div
        className="mb-6 mt-20"
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      />

      {postDetail.images && postDetail.images.length > 0 && (
        <div className="mb-6">
          {postDetail.images
            .filter((img) => img.uploadImgUrl && img.originalImgName !== "blob")
            .map((img, index) => (
              <img
                key={index}
                src={img.uploadImgUrl}
                alt="첨부 이미지"
                className="mb-4 w-full rounded"
              />
            ))}
        </div>
      )}

      {/* 댓글 입력 */}
      <div className="border-t pt-4 mt-6">
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="댓글 입력"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <RoundedButton
          onClick={handleCommentSubmit}
          disabled={!commentContent.trim()}
        >
          댓글 등록
        </RoundedButton>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-6">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-gray-500">댓글이 없습니다.</p>
        )}
      </div>

      {renderPagination()}
    </div>
  );
};

export default CommDetail;
