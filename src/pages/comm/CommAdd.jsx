import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';
import { useNavigate } from 'react-router-dom';

const CommAdd = () => {
    const [title, setTitle] = useState('');  // 제목 상태
    const [content, setContent] = useState('');  // 내용 상태
    const [files, setFiles] = useState([]);  // 파일 상태
    const { createPost } = useCommStore();  // Zustand에서 createPost 함수 불러오기
    const navigate = useNavigate();

    // 제목 변경 핸들러
    const handleTitleChange = (e) => setTitle(e.target.value);

    // 내용 변경 핸들러
    const handleContentChange = (value) => setContent(value);

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));  // 파일 배열로 변환하여 상태에 저장
    };

    // 게시글 작성 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost(title, content, files);  // Zustand의 createPost 호출
            navigate('/comm');  // 성공 시 커뮤니티 페이지로 이동
        } catch (error) {
            console.error('게시글 작성 중 오류:', error);
        }
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        setTitle('');  // 제목 초기화
        setContent('');  // 내용 초기화
        setFiles([]);  // 파일 초기화
        navigate('/comm');  // 취소 시 커뮤니티 페이지로 이동
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* 제목 입력 */}
            <input
                type="text"
                className="w-full p-2 mb-4 border rounded-md text-sm"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
            />

            {/* 내용 입력 (ReactQuill 사용) */}
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요."
                className="mb-4"
                theme="snow"
            />

            {/* 파일 선택 입력 */}
            <input type="file" multiple onChange={handleFileChange} />

            {/* 글쓰기 및 취소 버튼 */}
            <div className="flex space-x-4">
                <RoundedButton onClick={handleSubmit}>글쓰기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default CommAdd;
