import React from "react";
import { useAuth } from '../../../hooks/useAuth';
import useModalStore from '../../../stores/useModalStore';


const InfoModal = ({ buttonPosition, onClose }) => {
    const { isAuthenticated, logout } = useAuth();
    const { modals, closeModal, openModal } = useModalStore();

    const handleLoginClick = () => {
        closeModal('info');
        setTimeout(() => {
            openModal('login');
        }, 100);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleBackgroundClick = () => {
        onClose(); // 배경 클릭 시 InfoModal 닫기
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 mt-1" onClick={handleBackgroundClick}>
            <div
                className="absolute bg-white rounded-lg w-72 h-72 p-5 shadow-lg"
                onClick={handleModalClick}
                style={{
                    top: `${buttonPosition.top}px`,
                    left: `${buttonPosition.left}px`,
                }}
            >
                {isAuthenticated ? (
                    <>
                        <h2 className="text-xl font-bold text-black mb-5 text-center">환영합니다!</h2>
                        <div className="text-center">
                            <button className="mb-3 p-2 w-3/4 text-white bg-blue-500 rounded">내 정보</button>
                            <button 
                                onClick={logout} 
                                className="p-2 w-3/4 text-white bg-red-500 rounded"
                            >
                                로그아웃
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-black mb-5 mt-8 text-center">로그인 후 Meettify를 이용해 주세요.</h2>
                        <hr />
                        <div className="text-center">
                            <button 
                                onClick={handleLoginClick}
                                className="p-2 mt-5 w-3/4 text-white bg-blue-500 rounded"
                            >
                                로그인
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoModal;
