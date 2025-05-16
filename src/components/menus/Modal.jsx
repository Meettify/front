import React from "react";
import ReactMarkdown from "react-markdown";

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-11/12 max-w-xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫힘 방지
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="text-gray-800 whitespace-pre-wrap max-h-[60vh] overflow-y-auto leading-relaxed">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
