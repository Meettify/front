import React from "react";
import { useAuth } from '../../../hooks/useAuth';
import useModalStore from '../../../stores/useModalStore';
import useNavigation from "../../../hooks/useNavigation";


const InfoModal = ({ buttonPosition, onClose }) => {
    const { isAuthenticated, logout, user } = useAuth();
    const { modals, closeModal, openModal } = useModalStore();
    const {goToMyInfo} = useNavigation();

    const handleLoginClick = () => {
        closeModal('info');
        setTimeout(() => {
            openModal('login');
        }, 100);
    };

    const handleMyifoClick = () => {
        closeModal('info');
        goToMyInfo();
    }

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
                        <h2 className="text-xl font-bold text-yellow-400 mb-5 mt-5 text-center">{user.nickName} <p className="text-xl font-bold text-black inline">님</p></h2>
                        <h2 className="text-xl font-bold text-black text-center">환영합니다!</h2>
                        <div className="text-center">
                            <button 
                            className="mt-8 mb-3 p-2 w-3/4
                             border border-blue-400 text-white bg-blue-400 rounded
                             transition-colors duration-200 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                            onClick={handleMyifoClick}
                            >내 정보</button>
                            <button 
                                onClick={logout} 
                                className="p-2 w-3/4 
                                border border-red-400 text-white bg-red-400 rounded
                                transition-colors duration-200 hover:bg-red-500 hover:text-white hover:border-red-500"
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
