import React from "react";
import { useAuth } from '../../../hooks/useAuth';
import useModalStore from '../../../stores/useModalStore';
import useNavigation from "../../../hooks/useNavigation";
import { HiUserCircle } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";


const InfoModal = ({ buttonPosition, onClose }) => {
    const { isAuthenticated, logout, user } = useAuth();
    const { modals, closeModal, openModal } = useModalStore();
    const {goToMyPage} = useNavigation();

    const handleLoginClick = () => {
        closeModal('info');
        setTimeout(() => {
            openModal('login');
        }, 100);
    };

    const handleMyifoClick = () => {
        closeModal('info');
        goToMyPage();
    }

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleBackgroundClick = () => {
        onClose(); // 배경 클릭 시 InfoModal 닫기
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-10 mt-1"
            style={{ zIndex: 999 }}
            onClick={handleBackgroundClick}>
            <div
                className="absolute bg-white rounded-lg w-72 h-64 p-5 shadow-lg"
                onClick={handleModalClick}
                style={{
                    top: `${buttonPosition.top}px`,
                    left: `${buttonPosition.left}px`,
                    zIndex: 1000,
                }}
            >
                {isAuthenticated ? (
                    <>
                        <div className="ml-2 text-left text-md">
                            <h2 className="text-zinc-800 ">{user.nickName}</h2>
                            <h2 className="text-zinc-500 mb-3">{user.memberEmail}</h2>
                        </div>
                        
                        <hr className="border-blue-300" />
                        <div className="text-center">
                            <button 
                                className="flex mt-3 p-2 w-32 text-center h-10
                                text-gray-400 
                                transition-colors duration-200 hover:text-gray-700"
                                onClick={handleMyifoClick}
                                ><HiUserCircle size={26} /> <p className="ml-2">내 정보</p>
                            </button>
                            <button 
                                className="flex ml-[2px] mb-1 p-2 w-32 text-center h-10
                                text-gray-400 
                                transition-colors duration-200 hover:text-gray-700"
                                onClick={() => {}}
                                ><BsCart3 size={24} /> <p className="ml-2">장바구니</p>
                            </button>
                            <button 
                                className="flex ml-1 mb-3 p-2 w-32 text-center h-10 items-center
                                text-gray-400 transition-colors duration-200 hover:text-gray-700"
                                onClick={() => {}}
                                ><BsChatSquareText size={22} /> <p className="ml-2">채팅</p>
                            </button>
                            <p onClick={logout} className="flex text-[14px] ml-3 w-16 text-gray-400
                             transition-colors duration-200 hover:text-gray-700 hover: cursor-pointer " >로그아웃</p>
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
