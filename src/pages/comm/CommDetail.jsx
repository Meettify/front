import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCommStore from '../../stores/useCommStore';
import useCommentStore from '../../stores/useCommentStore';
import { useAuth } from '../../hooks/useAuth';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import { CiRead } from 'react-icons/ci';

const CommDetail = () => {
    const { id: communityId } = useParams();
    const { fetchPostDetail, postDetail, increasePostViewCount, deletePost } = useCommStore();
    const { comments, fetchComments, addComment, deleteComment } = useCommentStore();
    const { user } = useAuth();
    console.log('Logged-in user:', user);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
    const [editContent, setEditContent] = useState(''); // 수정할 댓글 내용


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await fetchPostDetail(communityId);
                await increasePostViewCount(communityId);
                await fetchComments(communityId);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [communityId, fetchPostDetail, increasePostViewCount, fetchComments]);

    const handleCommentChange = (e) => setCommentContent(e.target.value);

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;
        try {
            await addComment(communityId, commentContent, user.nickName);
            setCommentContent('');
        } catch (error) {
            console.error('댓글 등록 중 오류:', error);
        }
    };

    const handleEditComment = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditContent(content);
    };

    const handleEditSubmit = async () => {
        try {
            // 수정된 댓글을 서버에 업데이트하는 로직 (예: `updateCommentAPI` 호출 필요)
            console.log('수정된 댓글:', editContent);
            setEditingCommentId(null);
        } catch (error) {
            console.error('댓글 수정 중 오류:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(communityId, commentId);
        } catch (error) {
            console.error('댓글 삭제 중 오류:', error);
        }
    };

    if (loading || !postDetail) return <p>Loading...</p>;

    const isAuthor = postDetail.nickName === user?.nickName;

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
                    <span>{postDetail.viewCount || 0}</span>
                </div>
            </div>

            <div
                dangerouslySetInnerHTML={{ __html: postDetail.content }}
                className="text-gray-700 mb-6"
            />

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

            <div className="border-t border-gray-200 pt-0">
                <div className="flex items-center mb-2 bg-gray-100 p-2">
                    <span className="text-gray-700">댓글 작성</span>
                </div>
                <div className="flex justify-between items-center border p-2 bg-white">
                    <input
                        type="text"
                        className="flex-grow p-2"
                        placeholder="댓글을 입력하세요..."
                        value={commentContent}
                        onChange={handleCommentChange}
                    />
                    <RoundedButton onClick={handleCommentSubmit} disabled={!commentContent.trim()}>
                        등록하기
                    </RoundedButton>
                </div>
            </div>

            <div className="mt-5">
                {comments && comments.length > 0 ? (
                    <ul className="space-y-2">
                        {comments.map((c) => (
                            <li key={c.commentId} className="border-b pb-2">
                                {editingCommentId === c.commentId ? (
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            className="flex-grow p-2 border"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <RoundedButton onClick={handleEditSubmit}>
                                            완료
                                        </RoundedButton>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-md text-gray-700">{c.nickName}</div>
                                        <div className="text-gray-900">{c.comment}</div>
                                        <div className="text-sm text-gray-400">
                                            {new Date(c.createdAt).toLocaleString()}
                                        </div>
                                        {user?.nickName === c.nickName && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEditComment(c.commentId, c.comment)
                                                    }
                                                    className="text-blue-500 text-sm"
                                                >
                                                    수정
                                                </button>
                                                {/* {console.log('user.nickName:', user?.nickName, 'comment.nickName:', c.nickName)}
                                                {user?.nickName?.toLowerCase() === c.nickName?.toLowerCase() && (
                                                    <button
                                                        onClick={() => deleteComment(communityId, c.commentId)}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        삭제
                                                    </button>
                                                )} */}
                                                {user?.memberEmail === c.nickName && (
                                                    <button
                                                        onClick={() => handleDeleteComment(communityId, c.commentId)}
                                                        className="text-red-500 text-sm"
                                                    >
                                                        삭제
                                                    </button>
                                                )}


                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">댓글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CommDetail;
