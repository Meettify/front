import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GoFileMedia } from "react-icons/go";  // 파일 아이콘 불러오기
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';

// Custom Toolbar 컴포넌트 정의 (CommAdd와 동일)
const CommToolbar = ({ handleFileInputClick }) => (
    <div id="toolbar">
        <select className="ql-header" defaultValue="">
            <option value="1"></option>
            <option value="2"></option>
            <option value=""></option>
        </select>
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-file" onClick={handleFileInputClick}>
            <GoFileMedia size={20} />
        </button>
    </div>
);

const CommEdit = () => {
    const { id } = useParams(); // URL에서 게시글 ID를 가져옴
    const [title, setTitle] = useState('');  // 제목 상태
    const [content, setContent] = useState('');  // 내용 상태
    const [files, setFiles] = useState([]);  // 파일 상태
    const { fetchPostDetail, updatePost, postDetail } = useCommStore();  // 게시물 불러오기 및 수정 함수
    const { user } = useAuthStore(); // 현재 사용자 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.memberEmail) {
            // 사용자가 로그인하지 않았거나 이메일이 없는 경우 홈으로 이동
            navigate('/');
        } else {
            // 기존 게시물 데이터 불러오기
            fetchPostDetail(parseInt(id));
        }
    }, [id, user, navigate, fetchPostDetail]);

    useEffect(() => {
        if (postDetail) {
            // 게시물 데이터가 업데이트되면 상태를 초기화
            setTitle(postDetail.title);
            setContent(postDetail.content);
        }
    }, [postDetail]);

    // 제목 변경 핸들러
    const handleTitleChange = (e) => setTitle(e.target.value);

    // 내용 변경 핸들러
    const handleContentChange = (value) => setContent(value);

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));  // 파일 배열로 변환하여 상태에 저장
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = sessionStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access Token이 없습니다. 다시 로그인해주세요.');
            return;
        }

        // 요청 데이터 확인 로그
        console.log('수정 요청 데이터:', { id, title, content, files });

        try {
            await updatePost(id, title, content, []); // remainImgId는 빈 배열로 전달
            console.log('게시글 수정 성공');
            navigate('/comm');
        } catch (error) {
            console.error('게시글 수정 중 오류:', error);
        }
    };


    // 취소 버튼 핸들러
    const handleCancel = () => {
        setTitle('');  // 제목 초기화
        setContent('');  // 내용 초기화
        setFiles([]);  // 파일 초기화
        navigate('/comm');  // 취소 시 커뮤니티 페이지로 이동
    };

    // 파일 선택 버튼 클릭 시 파일 입력창 열기
    const handleFileInputClick = () => {
        document.getElementById('file-input').click();
    };

    if (!postDetail) {
        return <div>게시글을 불러오는 중입니다...</div>;
    }

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

            {/* 커스텀 툴바 적용 */}
            <CommToolbar handleFileInputClick={handleFileInputClick} />

            {/* 내용 입력 (ReactQuill 사용) */}
            <ReactQuill
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요."
                className="mb-4"
                theme="snow"
                modules={{
                    toolbar: {
                        container: "#toolbar",  // 커스텀 툴바 설정
                    }
                }}
                style={{ height: '500px' }}
            />

            {/* 파일 선택 입력 (숨김 상태) */}
            <input type="file" id="file-input" multiple onChange={handleFileChange} style={{ display: 'none' }} />

            {/* 수정 및 취소 버튼 */}
            <div className="flex space-x-4">
                <RoundedButton onClick={handleSubmit}>수정하기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default CommEdit;
