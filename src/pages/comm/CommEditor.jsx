import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';
import { useNavigate } from 'react-router-dom';

const CommEditor = () => {
    const { title, setTitle, content, setContent, titlePlaceholder, setTitlePlaceholder, editorFocused, setEditorFocused, resetEditor, addPost } = useCommStore();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const newPost = {
            title,
            content,
            author: "사용자X",
            date: new Date().toISOString().slice(0, 10),  // 작성일
            views: 0,
            replies: 0
        };

        addPost(newPost); // 상태에 새 글 추가
        resetEditor();    // 에디터 상태 초기화
        navigate('/comm'); // 커뮤니티 목록 페이지로 이동
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-20 p-10">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={titlePlaceholder}
                onFocus={() => setTitlePlaceholder('')}
                onBlur={() => !title && setTitlePlaceholder('제목을 입력하세요.')}
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-lg"
                style={{ borderWidth: '1px' }}
            />
            <div className={`border ${editorFocused ? 'border-black' : 'border-gray-300'} rounded-lg overflow-hidden mb-4`}>
                <div className="relative -m-1">
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className="text-left h-96 rounded-lg"
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link', 'image'],
                                [{ 'align': [] }]
                            ]
                        }}
                        formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'align']}
                        onFocus={() => setEditorFocused(true)}
                        onBlur={() => setEditorFocused(false)}
                    />
                </div>
            </div>
            <div className="flex justify-start space-x-4 mt-4">
                <RoundedButton onClick={handleSubmit}>글쓰기</RoundedButton>
                <RoundedCancelButton onClick={() => navigate('/comm')}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default CommEditor;
