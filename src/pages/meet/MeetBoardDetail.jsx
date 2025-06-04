import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useMeetBoardStore from "../../stores/useMeetBoardStore";
import { useAuth } from "../../hooks/useAuth";
import RoundedButton from "../../components/button/RoundedButton";
import RoundedCancelButton from "../../components/button/RoundedCancelButton";
import RoundedDeleteButton from "../../components/button/RoundedDeleteButton";
import { CiRead } from "react-icons/ci";
import { getMeetBoardDetail, deleteMeetBoard } from "../../api/meetAPI";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../api/meetCommentAPI";

const MeetBoardDetail = () => {
  const { meetBoardId } = useParams();
  const { setMeetId, meetId, setPostDetail, setLoading, postDetail, loading } =
    useMeetBoardStore();
  const [meetBoardPermission, setMeetBoardPermission] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const location = useLocation();
  const meetIdFromState = location.state?.meetId;
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observer = useRef();

  useEffect(() => {
    console.log("meetBoardId 체크 : ", meetBoardId);
    if (!meetId && meetIdFromState) {
      setMeetId(meetIdFromState);
    }
  }, [meetId, meetIdFromState, setMeetId]);

  useEffect(() => {
    if (!meetBoardId || !meetId) return;
    fetchMeetBoardWithComments(page === 0); // 페이지 변경 시마다 호출
  }, [page, meetBoardId, meetId]);

  const lastCommentElementRef = useCallback(
    (node) => {
      if (loading || !hasNext) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasNext]
  );

  const fetchMeetBoardWithComments = async (reset = false) => {
    setLoading(true);
    try {
      const response = await getMeetBoardDetail(meetBoardId, page + 1); // 1-based로 통일
      const { meetBoardDetailsDTO, meetBoardPermissionDTO } = response;

      if (meetBoardDetailsDTO) {
        if (reset) {
          setPostDetail(meetBoardDetailsDTO);
          setPage(0); // 초기화할 때 명확히 page도 초기화
        } else {
          setPostDetail((prev) => ({
            ...prev,
            comments: {
              ...meetBoardDetailsDTO.comments,
              content: [
                ...(prev?.comments?.content || []),
                ...meetBoardDetailsDTO.comments.content,
              ],
            },
          }));
        }
        setHasNext(meetBoardDetailsDTO.comments.hasNext);
        setMeetBoardPermission(meetBoardPermissionDTO);
      }
    } catch (error) {
      console.error("게시물 상세 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim() || !meetId) return;
    try {
      await createComment(meetId, meetBoardId, {
        content: commentContent,
        parentComment: replyTo,
      });
      setCommentContent("");
      setReplyTo(null);
      setPage(0);
      setHasNext(true);
      await fetchMeetBoardWithComments(true);
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/meetBoards/${meetBoardId}/edit`, { state: { meetId } });
  };

  const handleDelete = async () => {
    try {
      const response = await deleteMeetBoard(meetId, meetBoardId);
      if (response === "게시물을 삭제했습니다.") {
        navigate(`/meetBoards/list/${meetId}`);
      } else {
        console.error(
          "게시물 삭제 실패:",
          response?.message || "알 수 없는 오류"
        );
      }
    } catch (error) {
      console.error(
        "게시물 삭제 실패:",
        error?.message || "알 수 없는 오류 발생"
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setPage(0);
      setHasNext(true);
      await fetchMeetBoardWithComments(true);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await updateComment(editingCommentId, { comment: editContent });
      setEditingCommentId(null);
      setEditContent("");
      setPage(0);
      setHasNext(true);
      await fetchMeetBoardWithComments(true);
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  };

  const renderComments = (comments = [], parentId = null, level = 0) => {
    const filteredComments = comments.filter(
      (comment) => comment.parentCommentId === parentId
    );

    return filteredComments.map((comment, index) => {
      const isLast = index === filteredComments.length - 1;
      const safePermission = comment.permissionDTO || {
        canEdit: false,
        canDelete: false,
      };

      return (
        <li
          key={comment.commentId}
          ref={parentId === null && isLast ? lastCommentElementRef : null}
          className="border-b pb-4"
          style={{ marginLeft: `${level * 20}px` }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-sm">
              {comment.commentNickName}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.postDate).toLocaleString()}
            </span>
          </div>

          {editingCommentId === comment.commentId ? (
            <>
              <textarea
                className="w-full border rounded p-2 mt-1"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-1">
                <RoundedCancelButton onClick={() => setEditingCommentId(null)}>
                  취소
                </RoundedCancelButton>
                <RoundedButton onClick={handleUpdateComment}>
                  수정 완료
                </RoundedButton>
              </div>
            </>
          ) : (
            <div className="text-gray-800 text-sm whitespace-pre-wrap text-left">
              {comment.isDeleted ? "삭제된 댓글입니다." : comment.comment}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-2 text-xs">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setReplyTo(comment.commentId)}
            >
              답글 달기
            </button>
            {safePermission.canEdit && (
              <>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setEditingCommentId(comment.commentId);
                    setEditContent(comment.content);
                  }}
                >
                  수정
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteComment(comment.commentId)}
                >
                  삭제
                </button>
              </>
            )}
          </div>

          {replyTo === comment.commentId && (
            <div className="mt-2">
              <textarea
                rows={2}
                placeholder="답글을 입력하세요..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
              <div className="flex justify-end gap-2 mt-1">
                <RoundedCancelButton onClick={() => setReplyTo(null)}>
                  취소
                </RoundedCancelButton>
                <RoundedButton onClick={handleCommentSubmit}>
                  답글 등록
                </RoundedButton>
              </div>
            </div>
          )}

          <ul className="mt-2">
            {renderComments(comments, comment.commentId, level + 1)}
          </ul>
        </li>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!postDetail) return <p>게시물 정보를 찾을 수 없습니다.</p>;
  if (!meetBoardPermission) return <p>권한 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow w-full max-w-screen-lg mx-auto px-6 mt-20 pb-32">
        <div className="border-b pb-4 mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {postDetail.meetBoardTitle}
          </h1>
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span className="mr-3">{postDetail.nickName}</span>
              <span>{new Date(postDetail.postDate).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <CiRead className="mr-1" />
              <span>{postDetail.viewCount}</span>
            </div>
          </div>
        </div>

        <div
          className="prose prose-base max-w-none text-gray-800 mb-10"
          dangerouslySetInnerHTML={{ __html: postDetail.meetBoardContent }}
        />

        {postDetail.images?.length > 0 && (
          <div className="mt-4">
            {postDetail.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`첨부 이미지 ${index + 1}`}
                className="w-full mb-6 rounded"
              />
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-3 pb-5">
          {meetBoardPermission?.canEdit && (
            <RoundedCancelButton onClick={handleEdit}>수정</RoundedCancelButton>
          )}
          {meetBoardPermission?.canDelete && (
            <RoundedDeleteButton onClick={handleDelete}>
              삭제
            </RoundedDeleteButton>
          )}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-2 items-start">
          <textarea
            rows={3}
            placeholder="댓글을 입력하세요..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="flex-grow w-full border border-gray-300 rounded p-2 resize-none"
          />
          <RoundedButton
            className="px-4 py-2 bg-blue-500 text-white rounded whitespace-nowrap self-end sm:self-auto"
            onClick={() => {
              setReplyTo(null);
              handleCommentSubmit();
            }}
          >
            등록하기
          </RoundedButton>
        </div>
        {/* 댓글 개수 표시 */}
        <h2 className="text-xl font-semibold mt-12 mb-4 text-left">
          댓글 ({postDetail.comments?.content?.length || 0})
        </h2>

        {/* 댓글 리스트 */}
        <ul className="space-y-4 min-h-[200px]">
          {postDetail.comments?.content?.length > 0 ? (
            renderComments(postDetail.comments.content)
          ) : (
            <p className="text-gray-500">댓글이 없습니다.</p>
          )}
        </ul>
      </main>
    </div>
  );
};

export default MeetBoardDetail;
