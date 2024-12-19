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
    const [courseImage, setCourseImage] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    
    // roots와 rootImages 상태 추가
    const [roots, setRoots] = useState([]);
    const [rootImages, setRootImages] = useState([]);

    const location = useLocation();
    const { meetId } = location.state || {};  
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
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };
    
    const handleFileRemove = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleCourseImageChange = (e) => {
        const file = e.target.files[0];  
        if (file && file.type.startsWith('image/')) {
            setCourseImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;

        // 입력 값 검증
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

        // courseImage가 존재하면 FormData에 추가
        if (courseImage) {
            formData.append('courseImage', courseImage);
        }

        // 코스 데이터 추가
        const courseData = {
            title: title,
            content: content,
        };
        formData.append('course', new Blob([JSON.stringify(courseData)], { type: 'application/json' }));

        // roots가 존재하면 FormData에 추가
        if (roots && roots.length > 0) {
            formData.append('roots', new Blob([JSON.stringify(roots)], { type: 'application/json' }));
        }

        // 루트 이미지 추가
        rootImages.forEach((image) => {
            if (image) {
                formData.append('rootImages', image);
            }
        });

        // meetBoard 데이터를 JSON으로 Blob으로 감싸서 전송
        const meetBoardData = {
            meetId: meetId,
            meetBoardTitle: title,
            meetBoardContent: content,
        };
        formData.append('meetBoard', new Blob([JSON.stringify(meetBoardData)], { type: 'application/json' }));

        // 이미지 파일들을 'images' 필드로 추가
        files.forEach(file => {
            formData.append('images', file);
        });

        console.log('FormData:', formData); // FormData 내용 확인

        try {
            if (!meetId) {
                console.error("meetId가 없습니다.");
                return;
            }

            // 게시글 작성 API 호출
            const response = await createPost(formData, meetId);

            if (response && response.success) {
                navigate(`/meetBoards/list/${meetId}`);  
            } else {
                console.error('게시글 작성 실패:', response?.message || '알 수 없는 오류');
            }
        } catch (error) {
            console.error('게시글 작성 중 오류:', error.message || error);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setFiles([]);
        setCourseImage(null);  
        setRoots([]); 
        setRootImages([]); 
        setTitleError(false);
        setContentError(false);
        setFocusedField(null);
        navigate(`/meetBoards/list/${meetId}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <input
                type="text"
                className={`w-full p-3 mb-6 border rounded-md text-md ${titleError ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-black'}`}
                placeholder={
                    titleError && focusedField !== 'title'
                        ? '제목을 입력해주세요'
                        : '제목을 입력하세요'
                }
                value={title}
                onChange={handleTitleChange}
                onFocus={() => {
                    setFocusedField('title');
                    setTitleError(false); 
                }}
                onBlur={() => setFocusedField(null)}
                style={{ color: titleError ? 'red' : 'black' }}
            />

            <div className={`text-left border rounded-lg overflow-hidden mb-6 bg-white ${contentError ? 'border-red-500' : 'border-gray-300 focus-within:border-black'}`} style={{ position: 'relative' }}>
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
                            setContentError(false); 
                        }}
                        onBlur={() => setFocusedField(null)}
                        modules={modules}
                        style={{ height: '300px' }}
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="text-left block bg-gray-100 p-2 rounded-t-md text-gray-700">
                    코스 이미지
                </label>
                <div className="border rounded-b-lg p-4 bg-white">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCourseImageChange}
                    />
                    {courseImage && (
                        <div className="mt-4">
                            <img
                                src={URL.createObjectURL(courseImage)}
                                alt="Course Image Preview"
                                className="w-48 h-48 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>

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

            <div className="flex space-x-4 mt-6">
                <RoundedButton onClick={handleSubmit}>글쓰기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default MeetBoardAdd;
