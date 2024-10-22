// CommDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CiRead } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import useCommStore from '../../stores/useCommStore';
import useAuthStore from '../../stores/useAuthStore';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import { increaseViewCount } from '../../api/commAPI';  // 뷰 카운트 함수 가져오기

const CommDetail = () => {
    const { id } = useParams();  // URL에서 id 값 가져옴
    const { fetchPostDetail, postDetail, addComment, deletePost } = useCommStore();  // Zustand에서 데이터 불러오기
    const { user } = useAuthStore();  // 로그인한 사용자 정보
    const navigate = useNavigate();  // useNavigate 사용
    const [comment, setComment] = useState('');  // 댓글 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                await fetchPostDetail(id);  // 게시글 정보 가져오기
                await increaseViewCount(id);  // 뷰 카운트 증가
            } catch (error) {
                console.error('뷰 카운트 증가 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id, fetchPostDetail]);

    const handleDelete = async () => {
        try {
            await deletePost(id);  // 게시글 삭제
            navigate('/comm');  // 삭제 후 커뮤니티 목록으로 이동
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);  // 댓글 입력 상태 업데이트
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            const newComment = {
                content: comment,
                nickName: user?.nickName || "익명",  // 로그인한 사용자 또는 익명으로 댓글 작성
                regTime: new Date().toLocaleString(),
            };
            addComment(parseInt(id), newComment);  // 댓글 추가
            setComment('');  // 댓글 입력 초기화
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
                    <span>{postDetail.viewCount}</span>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: postDetail.content }} className="text-gray-700 mb-6" />
            <div className="flex justify-end space-x-3 pb-5">
                {isAuthor && (
                    <>
                        <RoundedCancelButton style={{ padding: '6px 18px', fontSize: '12px' }} onClick={() => navigate(`/comm/edit/${id}`)}>수정</RoundedCancelButton>
                        <RoundedDeleteButton style={{ padding: '6px 18px', fontSize: '12px' }} onClick={handleDelete}>삭제</RoundedDeleteButton>
                    </>
                )}
            </div>

            {/* 댓글 입력 구간 */}
            <div className="border-t border-gray-200 pt-0 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gray-200"></div>
                <div className="flex items-center mb-2 bg-gray-100 p-2 border-t-0">
                    <TfiCommentAlt className="mr-2 text-gray-500 text-md" />
                </div>
                <div className="flex justify-between items-center border rounded-none p-2 bg-white">
                    <input
                        type="text"
                        className="flex-grow p-2 text-sm text-black bg-transparent outline-none"
                        placeholder="댓글을 입력하세요..."
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <RoundedButton
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={handleCommentSubmit}
                        disabled={!comment.trim()}
                    >
                        등록하기
                    </RoundedButton>
                </div>
            </div>

            {/* 댓글 리스트 */}
            <div className="text-left mt-5">
                {postDetail.comments && postDetail.comments.length > 0 ? (
                    <ul className="space-y-2">
                        {postDetail.comments.map((comment, index) => (
                            <li key={index} className="border-b pb-2">
                                <div className="text-md text-gray-700">{comment.nickName}</div>
                                <div className="text-gray-900">{comment.content}</div>
                                <div className="text-sm text-gray-400">{new Date(comment.regTime).toLocaleString()}</div>
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
