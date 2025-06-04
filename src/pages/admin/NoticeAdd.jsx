import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNoticeStore from "../../stores/useNoticeStore";

const NoticeAdd = () => {
  const navigate = useNavigate();
  const { createNotice } = useNoticeStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    try {
      await createNotice(title, content);
      alert("공지사항이 등록되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          공지사항 등록
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 mb-2">
            내용
          </label>
          <textarea
            id="content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full h-32 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded mr-3"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeAdd;
