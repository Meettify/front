import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCommStore from '../../stores/useCommStore';
import useCommentStore from '../../stores/usecommentStore';
import { useAuth } from '../../hooks/useAuth';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import { CiRead } from 'react-icons/ci';

const CommDetail = () => {
    const { id: communityId } = useParams(); // 커뮤니티 ID 추출
    const { fetchPostDetail, postDetail, increasePostViewCount, deletePost } = useCommStore();
    const { comments, fetchComments, addComment, deleteCommentInStore } = useCommentStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [commentContent, setCommentContent] = useState(''); // 댓글 입력 상태

    // 게시글 및 댓글 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('게시글 및 댓글 데이터 불러오기 시작');
                await fetchPostDetail(communityId);
                await increasePostViewCount(parseInt(communityId)); // 조회수 증가 요청
                await fetchComments(communityId);
                console.log('게시글 및 댓글 데이터 불러오기 완료');
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
            await addComment(communityId, commentContent);
            setCommentContent('');
            console.log('댓글 등록 성공');
        } catch (error) {
            console.error('댓글 등록 중 오류:', error);
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
                    <CiRead className="mr-1" /> {/* 조회수 아이콘 */}
                    <span>{postDetail.views || 0}</span> {/* 조회수 표시 */}
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
                    <RoundedButton
                        onClick={handleCommentSubmit}
                        disabled={!commentContent.trim()}
                    >
                        등록하기
                    </RoundedButton>
                </div>
            </div>

            <div className="mt-5">
                {comments.length > 0 ? (
                    <ul className="space-y-2">
                        {comments.map((c) => (
                            <li key={c.commentId} className="border-b pb-2">
                                <div className="text-md text-gray-700">{c.nickName}</div>
                                <div className="text-gray-900">{c.comment}</div>
                                <div className="text-sm text-gray-400">
                                    {new Date(c.createdAt).toLocaleString()}
                                </div>
                                {user?.nickName === c.nickName && (
                                    <button
                                        onClick={() => deleteCommentInStore(communityId, c.commentId)}
                                        className="text-red-500 text-sm"
                                    >
                                        삭제
                                    </button>
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
