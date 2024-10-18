import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

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

const CommAdd = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const { createPost } = useCommStore();
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
        setFiles([...files, ...selectedFiles]);
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

        try {
            await createPost(title, content, files);
            navigate('/comm');
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
        navigate('/comm');
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

export default CommAdd;
