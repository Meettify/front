// components/chat/CreateChatRoomModal.jsx
import React, { useState } from "react";

const CreateChatRoomModal = ({ isOpen, onClose, onConfirm, defaultName }) => {
  const [roomName, setRoomName] = useState(defaultName || "");

  const handleConfirm = () => {
    if (!roomName.trim()) {
      alert("채팅방 이름을 입력해주세요");
      return;
    }
    onConfirm(roomName);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">채팅방 이름 입력</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="채팅방 이름"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatRoomModal;
