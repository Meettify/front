import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCommStore from "../../stores/useCommStore";
import useCommentStore from "../../stores/useCommentStore";
import { useAuth } from "../../hooks/useAuth";
import RoundedButton from "../../components/button/RoundedButton";
import RoundedCancelButton from "../../components/button/RoundedCancelButton";
import RoundedDeleteButton from "../../components/button/RoundedDeleteButton";
import { BiReplyAll, BiMessageDetail } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { TiDelete } from "react-icons/ti";

const CommDetail = () => {
  const { id: communityId } = useParams();
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

  useEffect(() => {
    const fetchDetail = async () => {
      await fetchPostDetail(communityId);
      await fetchComments(communityId, currentPage);
    };
    if (communityId && isFirstLoad.current) {
      fetchDetail();
      isFirstLoad.current = false;
    }
  }, [communityId]);

  useEffect(() => {
    if (communityId) fetchComments(communityId, currentPage);
  }, [currentPage]);

  const deleteComm = async (boardId) => {
    try {
      await deletePost(boardId);
      navigate("/comm");
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    await addComment(communityId, commentContent);
    setCommentContent("");
    fetchComments(communityId, currentPage);
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyContent.trim()) return;
    await addComment(communityId, replyContent, parentId);
    setReplyContent("");
    setReplyingCommentId(null);
    fetchComments(communityId, currentPage);
  };

  const confirmEdit = async () => {
    await updateComment(communityId, editingCommentId, editingContent);
    setEditingCommentId(null);
    setEditingContent("");
    fetchComments(communityId, currentPage);
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(communityId, commentId);
    fetchComments(communityId, currentPage);
  };

  const renderComment = (comment, depth = 0) => {
    const isAuthor = user?.id === comment.memberId;
    const isEditing = editingCommentId === comment.commentId;
    const isReplying = replyingCommentId === comment.commentId;

    return (
      <div
        key={comment.commentId}
        className={`p-4 rounded-xl border bg-white shadow-sm transition hover:shadow-md ${
          depth > 0 ? "ml-6 border-l-4 border-blue-200" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-800">{comment.nickName}</p>
            <p className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex gap-2 text-sm text-gray-600">
              <button
                className="hover:text-blue-600"
                onClick={() => setReplyingCommentId(comment.commentId)}
              >
                <BiReplyAll />
                답글
              </button>
              <button
                className="hover:text-green-600"
                onClick={() => {
                  setEditingCommentId(comment.commentId);
                  setEditingContent(comment.comment);
                }}
              >
                <LiaEdit />
                수정
              </button>
              <button
                className="hover:text-red-500"
                onClick={() => handleDeleteComment(comment.commentId)}
              >
                <TiDelete />
                삭제
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
          <p className="mt-2 text-sm text-gray-800 whitespace-pre-line text-left">
            {comment.comment}
          </p>
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* 제목 + 작성자 정보 */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{postDetail.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div className="flex gap-2">
            <span>{postDetail.nickName}</span>
            <span>· {new Date(postDetail.regTime).toLocaleDateString()}</span>
            <span>
              ·{" "}
              {new Date(postDetail.regTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>· 조회수 {postDetail.viewCount ?? 0}</span>
          </div>
          {user?.nickName === postDetail.nickName && (
            <div className="flex gap-2">
              <RoundedButton
                onClick={() => navigate(`/comm/edit/${communityId}`)}
              >
                수정
              </RoundedButton>
              <RoundedDeleteButton onClick={() => deleteComm(communityId)}>
                삭제
              </RoundedDeleteButton>
            </div>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div
        className="prose prose-lg text-gray-800 mb-12"
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      />

      {/* 첨부 이미지 */}
      {postDetail.images &&
        postDetail.images.filter(
          (img) =>
            typeof img.uploadImgUrl === "string" &&
            img.uploadImgUrl.trim() !== ""
        ).length > 0 && (
          <div className="my-6">
            {postDetail.images
              .filter(
                (img) =>
                  typeof img.uploadImgUrl === "string" &&
                  img.uploadImgUrl.trim() !== ""
              )
              .map((img, index) => (
                <img
                  key={index}
                  src={img.uploadImgUrl}
                  alt="첨부 이미지"
                  className="w-full rounded-xl mb-4 max-h-[400px] object-contain"
                />
              ))}
          </div>
        )}

      {/* 댓글 입력 */}
      <div className="border-t pt-6 mt-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-3">
          <BiMessageDetail className="text-blue-500" /> 댓글 ({comments.length})
        </h2>
        <div className="flex gap-2 items-start">
          <textarea
            className="flex-1 border rounded p-2 resize-none min-h-[80px]"
            placeholder="댓글을 입력하세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <RoundedButton
            onClick={handleCommentSubmit}
            disabled={!commentContent.trim()}
            className="whitespace-nowrap px-4 py-2"
          >
            등록
          </RoundedButton>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-8 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-gray-400 text-center py-8">
            아직 댓글이 없습니다.
          </p>
        )}
      </div>

      {renderPagination()}
    </div>
  );
};

export default CommDetail;
