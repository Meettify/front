import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useNoticeStore from '../../stores/useNoticeStore';

//공지사항 등록
const NoticeAdd = () => {
  const navigate = useNavigate();
  const { createNotice } = useNoticeStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력하세요.');
      return;
    }
    try {
      await createNotice(title, content);
      alert('공지사항이 등록되었습니다.');
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error('공지사항 등록 실패:', error);
    }
  };

  return (
    <div className="container mx-auto bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">공지사항 등록</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
      ></textarea>
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)} // 이전 페이지로 이동
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default NoticeAdd;
