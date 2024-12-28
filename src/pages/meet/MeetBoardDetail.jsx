import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMeetBoardStore from '../../stores/useMeetBoardStore';
import { useAuth } from '../../hooks/useAuth';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import RoundedDeleteButton from '../../components/button/RoundedDeleteButton';
import { CiRead } from 'react-icons/ci';
import { getMeetBoardDetail, deleteMeetBoard, updateMeetBoard } from '../../api/meetAPI'; // API 요청 함수
import { createComment } from '../../api/meetCommentAPI';
import { Navigate } from 'react-router-dom';


const MeetBoardDetail = () => {
    const { meetBoardId } = useParams();  // URL에서 meetBoardId 가져오기
    const { setMeetId, meetId, setPostDetail, setLoading, postDetail, loading } = useMeetBoardStore();
    const [meetBoardPermission, setMeetBoardPermission] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');
    
    // meetBoardId를 가져온 후 meetId를 Zustand에 설정
    useEffect(() => {
        if (meetBoardId && meetId) {
            setMeetId(meetId);  // Zustand의 meetId를 설정
        }
    }, [meetId, setMeetId, meetBoardId]);  // meetBoardId가 변경될 때마다 실행

    // 게시물 상세 및 댓글을 가져오는 함수
    const fetchMeetBoardWithComments = async () => {
        setLoading(true);
        try {
            const response = await getMeetBoardDetail(meetBoardId);  // API 호출
    
            // 응답에서 meetBoardDetailsDTO와 meetBoardPermissionDTO를 분리
            const { meetBoardDetailsDTO, meetBoardPermissionDTO } = response;
    
            // 댓글이 포함된 게시물 상세 데이터를 setPostDetail로 설정
            if (meetBoardDetailsDTO) {
                console.log('meetBoardDetailsDTO : ', meetBoardDetailsDTO);
                setPostDetail({
                    ...meetBoardDetailsDTO,
                    comments: meetBoardDetailsDTO.comments || [],
                });
                setMeetBoardPermission(meetBoardPermissionDTO);
            } else {
                    console.error('게시글을 불러올 수 없습니다.');
                }
        } catch (error) {
            console.error('게시물 상세 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (meetBoardId) {
            fetchMeetBoardWithComments();  // meetBoardId로 게시물 상세 조회
        }
    }, [meetBoardId]);  // meetBoardId가 변경될 때마다 실행

    if (loading) return <p>Loading...</p>;
    if (!postDetail) return <p>게시물 정보를 찾을 수 없습니다.</p>;
    if (!meetBoardPermission) return <p>권한 정보를 찾을 수 없습니다.</p>;

    const isAuthor = user?.nickName === postDetail.nickName;

    // 댓글 등록
    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;
        try {
            const response = await createComment(meetId, meetBoardId, { content: commentContent });
            setCommentContent('');
            fetchMeetBoardWithComments(); // 댓글 추가 후 게시물 데이터 새로고침
        } catch (error) {
            console.error('댓글 등록 실패:', error);
        }
    };
    
    // 게시물 수정 처리
    const handleEdit = () => {
        navigate(`/meetBoards/${meetBoardId}/edit`,  { state: { meetId } });
        /*meetBoardId가 넘어가면서 meetId로 전달되는 오류.,,*/
    };

    // 게시물 삭제 처리
    const handleDelete = async () => {
        console.log(`meetId : ${meetId}, meetBoardId : ${meetBoardId}`);
        try {
            const response = await deleteMeetBoard(meetId, meetBoardId);
            if (response === '게시물을 삭제했습니다.') {
                navigate(`/meetBoards/list/${meetId}`);
                
            } else {
                console.error('게시물 삭제 실패:', response?.message || '알 수 없는 오류');
            }
        } catch (error) {
            console.error('게시물 삭제 실패:', error?.message || '알 수 없는 오류 발생');
        }
    };
    

    // 댓글 렌더링
    const renderComments = (comments = [], parentId = null) => {
        return comments
            .filter((comment) => comment.parentCommentId === parentId)
            .map((comment) => (
                <li key={comment.commentId} className="border-b pb-2 pl-4">
                    <div className="text-md font-semibold">{comment.commentNickName}</div>
                    <div>{comment.content}</div>
                    <div className="text-sm text-gray-400">
                        {new Date(comment.postDate).toLocaleString()}
                    </div>
                    {comment.replies && comment.replies.length > 0 && (
                        <ul className="mt-2">{renderComments(comment.replies, comment.commentId)}</ul>
                    )}
                </li>
            ));
    };
    
    return (
        <div className="text-left max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">{postDetail.meetBoardTitle}</h1>
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-500">
                    <span>{postDetail.nickName}</span>
                    <span className="block text-sm">
                        작성일: {new Date(postDetail.postDate).toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center">
                    <CiRead className="mr-1" />
                    <span>{postDetail.viewCount}</span>
                </div>
            </div>

            <div
                dangerouslySetInnerHTML={{
                    __html: postDetail.meetBoardContent,
                }}
                className="text-gray-700 mb-6"
            />

            {postDetail.images?.length > 0 && (
                <div className="mt-4">
                    {postDetail.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`첨부 이미지 ${index + 1}`}
                            className="w-full mb-4 rounded"
                        />
                    ))}
                </div>
            )}

            <div className="flex justify-end space-x-3 pb-5">
                {meetBoardPermission?.canEdit && (
                    <RoundedCancelButton onClick={handleEdit}>
                        수정
                    </RoundedCancelButton>
                )}
                {meetBoardPermission?.canDelete && (
                    <RoundedDeleteButton onClick={handleDelete}>
                        삭제
                    </RoundedDeleteButton>
                )}
            </div>

            <div className="border-t border-gray-200 pt-5">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded"
                    placeholder="댓글을 입력하세요..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                />
                <RoundedButton 
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                    onClick={handleCommentSubmit}
                >
                    등록하기
                </RoundedButton>
            </div>

            <ul className="mt-5 space-y-2">
                {postDetail?.comments && postDetail.comments.length > 0 ? (
                    renderComments(postDetail.comments)
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default MeetBoardDetail;
