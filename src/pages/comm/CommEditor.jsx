import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCommunityPost, getCommunityPost, updateCommunityPost } from '../../api/commAPI';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useCommStore from '../../stores/useCommStore';

const CommEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, setTitle, content, setContent, resetEditor, files, setFiles } = useCommStore();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const communityId = location.pathname.split('/').pop();
        if (communityId && communityId !== 'editor') {
            console.log(`Fetching community post with ID: ${communityId}`);
            getCommunityPost(communityId).then(data => {
                setTitle(data.title);
                setContent(data.content);
            }).catch(error => {
                console.error('Error fetching community post:', error);
            });
        } else {
            resetEditor();
        }
    }, [location, resetEditor, setTitle, setContent]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles.length ? selectedFiles : []);
        console.log(`Selected files: ${selectedFiles.length}`);
    };

    const handleSubmit = async () => {
        console.log("글쓰기 버튼 클릭됨");
        const communityId = location.pathname.split('/').pop();

        if (!title || !content) {
            console.warn('Title or content is empty');
            setErrorMessage("제목과 내용을 입력해야 합니다.");
            return;
        }

        try {
            let newPost;
            if (communityId && communityId !== 'editor') {
                console.log(`Updating community post with ID: ${communityId}`);
                newPost = await updateCommunityPost(communityId, title, content, files);
            } else {
                console.log('Creating a new community post');
                newPost = await createCommunityPost(title, content, files);
            }

            useCommStore.getState().addPost(newPost); // 새로운 글 추가

            resetEditor();
            navigate('/comm');
        } catch (error) {
            console.error("커뮤니티 등록/수정 실패:", error);
            setErrorMessage("글 등록/수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-20 p-10">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg text-lg"
            />
            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    className="text-left h-96 rounded-lg"
                />
            </div>
            <input type="file" multiple onChange={handleFileChange} />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex justify-start space-x-4 mt-4">
                <RoundedButton onClick={handleSubmit}>글쓰기</RoundedButton>
                <RoundedCancelButton onClick={() => navigate('/comm')}>취소</RoundedCancelButton>
            </div>
        </div>
    );
};

export default CommEditor;
