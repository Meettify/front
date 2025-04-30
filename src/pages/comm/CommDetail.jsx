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
  const { id: communityId } = useParams();
  const { fetchPostDetail, postDetail, deletePost } = useCommStore();
  const {
    comments = [],
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
  } = useCommentStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const isFirstLoad = useRef(true); // 첫 로드 확인을 위한 useRef 사용

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        console.log("fetchDetail 호출");
        await fetchPostDetail(communityId);
        await fetchComments(communityId);
      } catch (error) {
        console.error("게시물 조회 실패:", error);
      }
    };

    if (communityId && isFirstLoad.current) {
      fetchDetail();
      isFirstLoad.current = false;
    }
  }, [communityId]);

  const handleCommentChange = (e) => setCommentContent(e.target.value);
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    try {
      await addComment(communityId, commentContent);
      setCommentContent("");
    } catch (error) {
      console.error("댓글 등록 중 오류:", error);
    }
  };

  const handleReplyChange = (e) => setReplyContent(e.target.value);
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.comment);
  };

  const handleEditChange = (e) => setEditingContent(e.target.value);
  const confirmEdit = async () => {
    try {
      await updateComment(communityId, editingCommentId, editingContent);
      setEditingCommentId(null);
      setEditingContent("");
      await fetchComments(communityId);
    } catch (error) {
      console.error("댓글 수정 중 오류:", error);
    }
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(communityId, commentId);
      await fetchComments(communityId);
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  const handleReply = (commentId) => {
    if (replyingCommentId === commentId) {
      setReplyingCommentId(null);
    } else {
      setReplyingCommentId(commentId);
      setReplyContent("");
    }
  };

  const submitReply = async () => {
    if (!replyContent.trim()) return;
    try {
      await addComment(communityId, replyContent, replyingCommentId);
      setReplyingCommentId(null);
      setReplyContent("");
      await fetchComments(communityId);
    } catch (error) {
      console.error("답글 등록 중 오류:", error);
    }
  };

  if (!postDetail) return <p>Loading...</p>;

  const isAuthor = user?.nickName === postDetail.nickName;

  return (
    <div className="text-left max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{postDetail.title}</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          <span>{postDetail.nickName}</span>
          <span className="block text-sm">
            작성일: {new Date(postDetail.regTime).toLocaleString()}{" "}
            {/* 날짜와 시간 포맷 */}
          </span>
        </div>
        <div className="flex items-center">
          <CiRead className="mr-1" />
          <span>{postDetail.viewCount}</span>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
        className="text-gray-700 mb-6"
      />

      {Array.isArray(postDetail.images) && postDetail.images.length > 0 && (
        <div className="mt-4">
          {postDetail.images
            .filter(
              (image) => image.uploadImgUrl && image.originalImgName !== "blob"
            ) // 조건 추가
            .map((image, index) => (
              <img
                key={index}
                src={image.uploadImgUrl}
                alt={`첨부 이미지 ${index + 1}`}
                className="w-full mb-4 rounded"
              />
            ))}
        </div>
      )}

      {isAuthor && (
        <div className="flex justify-end space-x-3 pb-5">
          <RoundedCancelButton
            onClick={() => navigate(`/comm/edit/${communityId}`)}
          >
            수정
          </RoundedCancelButton>
          <RoundedDeleteButton
            onClick={async () => {
              await deletePost(communityId);
              navigate("/comm");
            }}
          >
            삭제
          </RoundedDeleteButton>
        </div>
      )}

      <div className="border-t border-gray-200 pt-5">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="댓글을 입력하세요..."
          value={commentContent}
          onChange={handleCommentChange}
        />
        <RoundedButton
          onClick={handleCommentSubmit}
          disabled={!commentContent.trim()}
        >
          등록하기
        </RoundedButton>
      </div>

      <div className="mt-5 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const isCommentAuthor = user?.nickName === comment.nickName;
            const isEditing = editingCommentId === comment.commentId;
            const isReplying = replyingCommentId === comment.commentId;

            return (
              <div
                key={comment.commentId}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {comment.nickName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {isCommentAuthor && !isEditing && (
                    <div className="flex gap-2 text-sm text-gray-500">
                      <button
                        onClick={() => handleReply(comment.commentId)}
                        className="hover:text-blue-500"
                      >
                        <BiReplyAll className="inline-block mr-1" />
                        답글
                      </button>
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="hover:text-green-500"
                      >
                        <LiaEdit className="inline-block mr-1" />
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="hover:text-red-500"
                      >
                        <TiDelete className="inline-block mr-1" />
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={editingContent}
                      onChange={handleEditChange}
                      className="flex-grow border p-2 rounded"
                    />
                    <button onClick={confirmEdit} className="text-green-600">
                      확인
                    </button>
                    <button onClick={cancelEdit} className="text-red-600">
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 text-gray-700 whitespace-pre-line">
                    {comment.comment}
                  </div>
                )}

                {isReplying && (
                  <div className="mt-3 ml-4">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={handleReplyChange}
                      placeholder="답글을 입력하세요..."
                      className="w-full border p-2 rounded mb-2"
                    />
                    <RoundedButton
                      onClick={submitReply}
                      disabled={!replyContent.trim()}
                    >
                      답글 등록
                    </RoundedButton>
                  </div>
                )}

                {comment.children &&
                  comment.children.map((child) => (
                    <div
                      key={child.commentId}
                      className="ml-4 mt-4 p-3 border-l-4 border-gray-200 bg-gray-50 rounded"
                    >
                      <div className="font-medium text-sm text-gray-800">
                        {child.nickName}
                      </div>
                      <div className="text-gray-700 text-sm mt-1">
                        {child.comment}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(child.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CommDetail;
