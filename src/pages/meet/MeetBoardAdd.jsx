import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useMeetBoardStore from '../../stores/useMeetBoardStore';  // 상태 관리 스토어
import useAuthStore from '../../stores/useAuthStore';  // 인증 스토어
import { useNavigate, useLocation } from 'react-router-dom';

// Quill 툴바 설정
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

const MeetBoardAdd = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const location = useLocation();
    const { meetId } = location.state || {};  // `state`로 전달된 `meetId`를 받음
    const { createPost } = useMeetBoardStore();  // useMeetBoardStore에서 createPost 함수 사용
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    useEffect(() => {
        if (!user || !user.memberEmail) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError(false);
    };

    const handleContentChange = (value) => {
        setContent(value);
        setContentError(false);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);  // 기존 파일에 새로운 파일 추가
    };    

    const handleFileRemove = (index) => {
        setFiles(files.filter((_, i) => i !== index));
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
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('meetId', meetId);
    
        // 파일이 있을 경우, formData에 파일 추가
        if (files.length > 0) {
            files.forEach(file => {
                formData.append('files', file);  // 서버에서 처리할 파일 필드 이름
            });
        } 
        try {
            // `meetId`를 확인하고 API 호출
            if (!meetId) {
                console.error("meetId가 없습니다.");
                return;
            }
            // 수정된 API 호출
            await createPost(formData, meetId);
            navigate(`/meetBoards/list/${meetId}`);  // 게시글 작성 후 목록으로 이동
        } catch (error) {
            console.error('게시글 작성 중 오류:', error);
        }
    };    
    
    const handleCancel = () => {
        setTitle('');
        setContent('');
        setFiles([]);
        setTitleError(false);
        setContentError(false);
        setFocusedField(null);
        navigate(`/meetBoards/list/${meetId}`);
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
                        {files.length === 0 ? (
                            <p className="text-gray-500">파일이 없습니다.</p>
                        ) : (
                            files.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        onClick={() => handleFileRemove(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* 버튼들 */}
            <div className="flex space-x-4 mt-6">
                <RoundedButton onClick={handleSubmit}>글쓰기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default MeetBoardAdd;
