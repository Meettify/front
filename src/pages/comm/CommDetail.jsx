import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCommStore from '../../stores/useCommStore';
import useCommentStore from '../../stores/useCommentStore';
import { useAuth } from '../../hooks/useAuth';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton'
import { CiRead } from 'react-icons/ci';

const CommDetail = () => {
    const { id: communityId } = useParams();
    const { fetchPostDetail, postDetail, deletePost } = useCommStore();
    const { comments = [], fetchComments, addComment } = useCommentStore(); // 초기값 설정
    const { user } = useAuth();
    const navigate = useNavigate();

    const [commentContent, setCommentContent] = useState('');

    // 게시물 상세 정보 및 댓글 가져오기
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

    const goToCommEdit = () => {
        navigate(`/comm/edit/${communityId}`); // 게시물 수정 페이지로 이동
    };

    const handleDeletePost = async () => {
        try {
            console.log('게시물 삭제 시작:', communityId);
            await deletePost(communityId);
            console.log('게시물 삭제 완료');
            navigate('/comm');
        } catch (error) {
            console.error('게시물 삭제 중 오류:', error.response || error);
        }
    };


    if (!postDetail) return <p>Loading...</p>;

    const isAuthor = user?.nickName === postDetail.nickName; // 작성자 확인

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
                    <span>{postDetail.viewCount}</span> {/* 조회수 표시 */}
                </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: postDetail.content }} className="text-gray-700 mb-6" />

            {isAuthor && (
                <div className="flex justify-end space-x-3 pb-5">
                    <RoundedCancelButton onClick={() => navigate(`/comm/edit/${communityId}`)}>
                        수정
                    </RoundedCancelButton>
                    <RoundedDeleteButton onClick={handleDeletePost}>삭제</RoundedDeleteButton>

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

            {/* comments 배열 안전하게 렌더링 */}
            <ul className="mt-5 space-y-2">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.commentId} className="border-b pb-2">
                            <div className="text-md font-semibold">{comment.nickName}</div>
                            <div>{comment.comment}</div>
                            <div className="text-sm text-gray-400">
                                {new Date(comment.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default CommDetail;
