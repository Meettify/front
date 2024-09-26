
import React from 'react';
import LoginForm from './LoginForm';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 absolute z-50 ">
        <h2 className="text-4xl font-bold text-black mb-5">로그인</h2>
        <LoginForm />
        <p className="mt-4 text-black">
          계정이 없으신가요? 
          <button 
            onClick={() => window.location.href = '/signup'} // 회원가입 페이지로 이동
            className="text-blue-500 underline bg-white">
            회원가입
          </button>
        </p>
        <button 
          onClick={onClose} 
          className="mt-4 text-red-500">
          닫기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
