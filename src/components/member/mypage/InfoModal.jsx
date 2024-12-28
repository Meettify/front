import React from "react";
import { useAuth } from '../../../hooks/useAuth';
import useModalStore from '../../../stores/useModalStore';
import useNavigation from "../../../hooks/useNavigation";
import { HiUserCircle } from "react-icons/hi2";
import { BsCart3 } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const InfoModal = ({ buttonPosition, onClose }) => {
    const { isAuthenticated, logout, user } = useAuth();
    const { modals, closeModal, openModal } = useModalStore();
    const { goToMyPage, goToCart } = useNavigation();
    const nav = useNavigate();

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

    const handleCart = () => {
        closeModal('info');
        goToCart();
    };


    const handleAdmin = () => {
        closeModal('info');
        nav('/admin');
    }

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleBackgroundClick = () => {
        onClose(); // 배경 클릭 시 InfoModal 닫기
    };

    const handleCartClick = () => {
        closeModal('info');
        nav('/chat');
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-10 mt-1"
            style={{ zIndex: 999 }}
            onClick={handleBackgroundClick}>
            <div
                className={`absolute bg-white rounded-lg w-72 ${user && user.memberRole !== "ADMIN" ? 'h-64' : 'h-72'} p-5 shadow-lg`}
                onClick={handleModalClick}
                style={{
                    top: `${buttonPosition.top}px`,
                    left: `${buttonPosition.left}px`,
                    zIndex: 1000,
                }}
            >
                {isAuthenticated && user ? (
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
                                onClick={handleCart}
                            ><BsCart3 size={24} /> <p className="ml-2">장바구니</p>
                            </button>
                            <button
                                className={`flex ml-3 w-24 text-center h-10 items-center 
                                    text-gray-400 transition-colors duration-200 hover:text-gray-700
                                    ${user.memberRole !== "ADMIN" ? 'mb-3' : ''}`}
                                onClick={handleCartClick}
                            >
                                <BsChatSquareText size={22} /> <p className="ml-2">채팅</p>
                            </button>
                            {user && user.memberRole === "ADMIN" ? (
                                <button
                                    className="flex ml-[11px] mt-2 mb-3 w-32 text-center
                                text-gray-400 transition-colors duration-200 hover:text-gray-700"
                                    onClick={handleAdmin}
                                ><RiAdminLine size={25} /> <p className="ml-[6px]">관리자페이지</p>
                                </button>
                            ) : null}

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
