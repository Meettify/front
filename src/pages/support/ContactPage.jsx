import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import { createQuestion } from '../../api/questionsAPI'; // 문의하기 API 호출

const ContactPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setTitleError(false);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setContentError(false);
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
            await createQuestion(title, content);
            alert('문의가 성공적으로 등록되었습니다.');
            navigate('/support'); // 문의 등록 후 고객센터 페이지로 이동
        } catch (error) {
            console.error('문의 작성 중 오류 발생:', error);
            alert('문의 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        setTitleError(false);
        setContentError(false);
        setFocusedField(null);
        navigate('/support'); // 취소 시 고객센터 페이지로 이동
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* 제목 입력 필드 */}
            <input
                type="text"
                className={`w-full p-3 mb-6 border rounded-md text-md ${titleError ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                placeholder={titleError && focusedField !== 'title' ? '제목을 입력해주세요' : '제목을 입력하세요'}
                value={title}
                onChange={handleTitleChange}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                style={{ color: titleError ? 'red' : 'black' }}
            />

            {/* 내용 입력 필드 */}
            <textarea
                className={`w-full p-3 h-40 mb-6 border rounded-md text-md ${contentError ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-black'
                    }`}
                placeholder={
                    contentError && focusedField !== 'content' ? '내용을 입력해주세요' : '내용을 입력하세요'
                }
                value={content}
                onChange={handleContentChange}
                onFocus={() => setFocusedField('content')}
                onBlur={() => setFocusedField(null)}
                style={{ color: contentError ? 'red' : 'black' }}
            />

            {/* 버튼들 */}
            <div className="flex space-x-4 mt-6">
                <RoundedButton onClick={handleSubmit}>문의하기</RoundedButton>
                <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default ContactPage;
