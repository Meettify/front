import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CiRead } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import useCommStore from '../../stores/useCommStore';
import RoundedButton from '../../components/button/RoundedButton';

const CommDetail = () => {
    const { id } = useParams();  // URL에서 id 값을 가져옴
    const { fetchPost, selectedPost, addComment } = useCommStore();  // Zustand에서 데이터 불러오기
    const [comment, setComment] = useState('');  // 댓글 상태

    useEffect(() => {
        fetchPost(parseInt(id));  // 게시글 선택
    }, [id, fetchPost]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);  // 댓글 입력 상태 업데이트
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            const newComment = {
                content: comment,
                nickName: "익명",  // 익명 닉네임 사용
                regTime: new Date().toLocaleString(),
            };
            addComment(parseInt(id), newComment);  // Zustand로 댓글 추가
            setComment('');  // 댓글 입력 초기화
        }
    };

    if (!selectedPost) {
        return <div>게시글을 불러오는 중입니다...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2 text-left">{selectedPost.title}</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-500 text-left">
                    <span className="block">{selectedPost.nickName}</span> {/* 작성자 */}
                    <span className="block text-sm">작성일 {new Date(selectedPost.regTime).toLocaleDateString()}</span> {/* 작성일 */}
                </div>
                <div className="flex items-center text-right">
                    <CiRead className="mr-1" />
                    <span>{selectedPost.views}</span> {/* 조회수 */}
                </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-left mb-6">
                {selectedPost.content} {/* 게시글 내용 */}
            </p>

            {/* 댓글 입력 구간 */}
            <div className="border-t border-gray-200 pt-0 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
                <div className="flex items-center mb-2 bg-gray-100 p-2 border-t-0">
                    <TfiCommentAlt className="mr-2 text-gray-300 text-xl" />
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

            <div className="text-left mt-5">
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    <ul className="space-y-2">
                        {selectedPost.comments.map((comment, index) => (
                            <li key={index} className="border-b pb-2">
                                <div className="text-md text-gray-700">{comment.nickName}</div> {/* 댓글 작성자 */}
                                <div className="text-gray-900">{comment.content}</div> {/* 댓글 내용 */}
                                <div className="text-sm text-gray-400">{new Date(comment.regTime).toLocaleString()}</div> {/* 댓글 작성 시간 */}
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
