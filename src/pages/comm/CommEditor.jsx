import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 useNavigate 사용
import { createCommunityPost } from '../../api/commAPI';  // 수정된 import

const CommEditor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);  // 파일 상태 추가
    const { createPost } = useCommStore();
    const navigate = useNavigate();  // 페이지 이동 함수 가져오기

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (value) => setContent(value);

    // 파일 선택 처리 (선택된 파일 배열 저장)
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // 파일 배열로 변환 후 저장
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력하세요.');
            return;
        }

        // FormData 객체 생성
        const formData = new FormData();

        // JSON 데이터를 FormData에 추가 (문자열로 변환 후 append)
        const community = {
            title: title,
            content: content,
        };

        formData.append('community', new Blob([JSON.stringify(community)], { type: 'application/json' }));

        // 선택된 파일들을 FormData에 추가
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]); // files[i]는 실제 File 객체여야 합니다.
        }

        try {
            // 수정된 부분: createCommunityPost 호출
            const response = await createPost(title, content, files);

            console.log('Response:', response);
            navigate('/comm');  // 성공 시 /comm 경로로 이동
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setFiles([]);
        navigate('/comm');  // 취소 시 /comm 경로로 이동
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

            {/* 내용 입력 (리치 텍스트 에디터) */}
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요."
                className="mb-4"
                theme="snow"
            />

            {/* 파일 첨부 입력 */}
            <input type="file" multiple onChange={handleFileChange} />

            {/* 글쓰기 및 취소 버튼 */}
            <div className="flex space-x-4">
                <RoundedButton onClick={handleSubmit}>
                    글쓰기
                </RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>
                    취소
                </RoundedCancelButton>
            </div>
        </div>
    );
};

export default CommEditor;
