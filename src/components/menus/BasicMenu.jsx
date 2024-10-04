import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo/meettify_logo.png'; // 로고 이미지 경로
import UserIcon from "../icons/UserIcon";
import ChatIcon from "../icons/ChatIcon";
import SearchIcon from "../icons/SearchIcon";
import useModalStore from '../../stores/useModalStore';
import InfoModal from '../../components/member/info/InfoModal';
import LoginModal from '../../components/member/login/LoginModal';

const BasicMenu = () => {

    const { modals, openModal, closeModal } = useModalStore();
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    const handleInfoClick = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: buttonRect.bottom + window.scrollY, 
            left: buttonRect.left + window.scrollX-120
        });
        openModal('info');
    };

    return (
        <nav id='navbar' className="flex items-center justify-center w-full py-0 px-5">

            {/* 로고 */}
            <div className="flex items-center mr-20" style={{ transform: 'translateY(-4px)' }}> {/* mr-20 오른쪽 마진 */}
                <Link to="/">
                    <img src={logo} alt="Meettify Logo" className="w-48 h-auto" /> {/* w-로고 크기 */}
                </Link>
            </div>

            {/* 메뉴 */}
            <ul className="flex space-x-20 text-black m-0"> {/* space-x-메뉴 간격 */}
                <li> <Link to={'/main'}>메인</Link> </li>
                <li> <Link to={'/meet/'}>모임</Link> </li>
                <li> <Link to={'/comm/'}>커뮤니티</Link> </li>
                <li> <Link to={'/shop/'}>쇼핑</Link> </li>
                <li> <Link to={'/support'}>고객센터</Link> </li>
                <li>
                    <Link to="/search" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(0px)' }}>
                        <SearchIcon />
                    </Link>
                </li>
                <li>
                    <Link to="/chat" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-5px)' }}>
                        <ChatIcon />
                    </Link>
                </li>
                <li>
                    <button
                        ref={buttonRef}
                        className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-5px)' }}
                        onClick={handleInfoClick}
                    >
                        <UserIcon />
                    </button>
                </li>
            </ul>
            {modals['info'] && (
                <InfoModal
                    isOpen={modals['info']}
                    onClose={() => closeModal('info')}
                    buttonPosition={buttonPosition}
                />
            )}
            {modals['login'] && (
                <LoginModal
                    isOpen={modals['login']}
                    onClose={() => closeModal('login')}
                />
            )}
        </nav>
    );
}

export default BasicMenu;