import React from "react";
import LoginForm from "./LoginForm";
import useModalStore from "../../../stores/useModalStore";

const LoginModal = () => {
  const { modals, closeModal } = useModalStore();

  const isOpen = modals["login"];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg pt-10 pl-10 pr-10 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-4xl font-bold text-black mb-5 text-center">
          로그인
        </h2>
        <h5 className="text-black mb-5 text-center">MEETTIFY에 로그인하세요</h5>
        <LoginForm />

        <div className="text-center">
          <button
            onClick={() => closeModal("login")}
            className="mt-5 mb-5 p-2 w-1/5 text-white border border-red-500 bg-red-500 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
