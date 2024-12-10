import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useMeetBoardStore from '../../stores/useMeetBoardStore';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';

const modules = {
    toolbar: {
        container: [
            ['bold', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['image'],
        ],
        handlers: {
            image: function () {
                document.getElementById('file-input').click();
            },
        },
    },
};

const MeetBoardEdit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [existingFiles, setExistingFiles] = useState([]); // 기존 이미지 상태
    const [newFiles, setNewFiles] = useState([]); // 새로 추가한 이미지 상태
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const { fetchPostDetail, updatePost, postDetail } = useMeetBoardStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    useEffect(() => {
        if (!user || !user.memberEmail) {
            navigate('/');
        } else {
            fetchPostDetail(parseInt(id));
        }
    }, [id, user, navigate, fetchPostDetail]);

    useEffect(() => {
        if (postDetail) {
            console.log('게시글 세부 정보:', postDetail);
            setTitle(postDetail.title);
            setContent(postDetail.content);
            setExistingFiles(postDetail.images || []);
            // 수정시 기존 이미지가 있을 때는 newFiles 초기화하지 않음
            setNewFiles([]); // 이미지를 추가하지 않을 경우 새로운 이미지 초기화
        }
    }, [postDetail]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError(false);
    };

    const handleContentChange = (value) => {
        setContent(value);
        setContentError(false);
    };

    const handleRemoveNewFile = (index) => {
        setNewFiles(newFiles.filter((_, i) => i !== index));
    };

    const handleRemoveExistingFile = (index) => {
        setExistingFiles(existingFiles.filter((_, i) => i !== index));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (selectedFiles.length > 0) {
            console.log('선택한 파일:', selectedFiles);
            setNewFiles(selectedFiles);
        } else {
            console.warn('새로 추가된 파일이 없습니다.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (!title.trim()) {
            setTitleError(true);
            hasError = true;
        }

        if (!content.trim()) {
            setContentError(true);
            hasError = true;
        }

        if (hasError) return;

        // 기존 이미지 ID 배열 생성
        const remainImgId = existingFiles.map(file => file.boardId);

        // API 요청에 따라 형식 변경
        try {
            // newFiles가 비어있을 경우에는 추가하지 않음
            await updatePost(id, title, content, remainImgId, newFiles.length > 0 ? newFiles : undefined);
            navigate(`/meetBoard/list/${meetId}`);
        } catch (error) {
            console.error('게시글 수정 중 오류:', error);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setNewFiles([]);
        setExistingFiles([]);
        setTitleError(false);
        setContentError(false);
        setFocusedField(null);
        navigate(`/meetBoard/list/${meetId}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* 제목 입력 필드 */}
            <input
                type="text"
                className={`w-full p-3 mb-6 border rounded-md text-md ${titleError ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                placeholder={
                    titleError && focusedField !== 'title'
                        ? '제목을 입력해주세요'
                        : '제목을 입력하세요'
                }
                value={title}
                onChange={handleTitleChange}
                onFocus={() => {
                    setFocusedField('title');
                    setTitleError(false); // 에러 초기화
                }}
                onBlur={() => setFocusedField(null)}
                style={{ color: titleError ? 'red' : 'black' }}
            />

            {/* Quill 에디터 */}
            <div
                className={`text-left border rounded-lg overflow-hidden mb-6 bg-white ${contentError ? 'border-red-500' : 'border-gray-300 focus-within:border-black'
                    }`}
                style={{ position: 'relative' }}
            >
                <div className="quill-toolbar">
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={handleContentChange}
                        placeholder={
                            focusedField === 'content'
                                ? ''
                                : contentError
                                    ? '내용을 입력해주세요'
                                    : '내용을 입력하세요'
                        }
                        onFocus={() => {
                            setFocusedField('content');
                            setContentError(false); // 에러 초기화
                        }}
                        onBlur={() => setFocusedField(null)}
                        modules={modules}
                        style={{ height: '300px' }}
                    />
                </div>
            </div>

            {/* 첨부 파일 섹션 */}
            <div className="mt-6">
                <label className="text-left block bg-gray-100 p-2 rounded-t-md text-gray-700">
                    첨부파일
                </label>
                <div className="border rounded-b-lg p-4 bg-white">
                    <input
                        type="file"
                        id="file-input"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div className="flex flex-wrap gap-4">
                        {/* 기존 파일 표시 */}
                        {existingFiles
                            .filter(file => file.uploadImgUrl && file.originalImgName !== 'blob') // 조건 추가
                            .map((file, index) => (
                                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                                    <img src={file.uploadImgUrl} alt={`preview-${index}`} className="w-full h-full object-cover" />
                                    <button
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        onClick={() => handleRemoveExistingFile(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}

                        {/* 새로 추가된 파일 표시 */}
                        {newFiles.map((file, index) => (
                            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                                <img src={URL.createObjectURL(file)} alt={`preview-new-${index}`} className="w-full h-full object-cover" />
                                <button
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    onClick={() => handleRemoveNewFile(index)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-4 mt-6">
                <RoundedButton onClick={handleSubmit}>수정하기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default MeetBoardEdit;
