import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCommStore from '../../stores/useCommStore';
import useCommentStore from '../../stores/useCommentStore';
import { useAuth } from '../../hooks/useAuth';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import { CiRead } from 'react-icons/ci';
import { LiaEdit } from "react-icons/lia";
import { TiDelete } from "react-icons/ti";

const CommDetail = () => {
    const { id: communityId } = useParams();
    const { fetchPostDetail, postDetail, deletePost } = useCommStore();
    const { comments = [], fetchComments, addComment, updateComment, deleteComment } = useCommentStore();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [commentContent, setCommentContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글 ID
    const [editingContent, setEditingContent] = useState(''); // 수정 중인 댓글 내용

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                await fetchPostDetail(communityId);
                await fetchComments(communityId);
            } catch (error) {
                console.error('게시물 조회 실패:', error);
            }
        };
        fetchDetail();
    }, [communityId, fetchPostDetail, fetchComments]);

    const handleCommentChange = (e) => setCommentContent(e.target.value);

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;
        try {
            await addComment(communityId, commentContent);
            setCommentContent('');
        } catch (error) {
            console.error('댓글 등록 중 오류:', error);
        }
    };

    const handleEditComment = (comment) => {
        console.log("Editing comment:", comment.commentId);  // 콘솔 출력 추가
        setEditingCommentId(comment.commentId);
        setEditingContent(comment.comment); // 현재 댓글 내용을 수정 input에 설정
    };

    const handleEditChange = (e) => setEditingContent(e.target.value);

    const confirmEdit = async () => {
        console.log("Confirming edit for commentId:", editingCommentId);  // 추가 로그
        try {
            await updateComment(communityId, editingCommentId, editingContent);
            setEditingCommentId(null); // 수정 모드 종료
            setEditingContent(''); // 수정 내용 초기화
            await fetchComments(communityId); // 갱신된 댓글 목록을 불러옵니다.
        } catch (error) {
            console.error('댓글 수정 중 오류:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(communityId, commentId);
            await fetchComments(communityId); // 댓글 목록 갱신
        } catch (error) {
            console.error("댓글 삭제 중 오류:", error);
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
                        작성일: {new Date(postDetail.regTime).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center">
                    <CiRead className="mr-1" />
                    <span>{postDetail.viewCount}</span>
                </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: postDetail.content }} className="text-gray-700 mb-6" />

            {isAuthor && (
                <div className="flex justify-end space-x-3 pb-5">
                    <RoundedCancelButton onClick={() => navigate(`/comm/edit/${communityId}`)}>
                        수정
                    </RoundedCancelButton>
                    <RoundedDeleteButton
                        onClick={async () => {
                            await deletePost(communityId);
                            navigate('/comm');
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
                <RoundedButton onClick={handleCommentSubmit} disabled={!commentContent.trim()}>
                    등록하기
                </RoundedButton>
            </div>
            <ul className="mt-5 space-y-2">
                {comments.length > 0 ? (
                    comments.map((comment) => {
                        const isCommentAuthor = user?.nickName === comment.nickName;
                        const isEditing = editingCommentId === comment.commentId;

                        return (
                            <li key={comment.commentId} className="border-b pb-2">
                                <div className="text-md font-semibold">{comment.nickName}</div>

                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingContent}
                                            onChange={handleEditChange}
                                            className="w-full p-2 border rounded mb-2"
                                        />
                                        <button
                                            className="flex items-center text-green-500"
                                            onClick={confirmEdit}
                                        >
                                            확인
                                        </button>
                                    </>
                                ) : (
                                    <div>{comment.comment}</div>
                                )}

                                <div className="text-sm text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </div>

                                {isCommentAuthor && !isEditing && (
                                    <div className="flex justify-end space-x-2 mt-2">
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
                                )}
                            </li>
                        );
                    })
                ) : (
                    <p>댓글이 없습니다.</p> // 댓글이 없을 때 표시
                )}
            </ul>
        </div>
    );
};

export default CommDetail;
