import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo/meettify_logo.png'; // 로고 이미지 경로
import useModalStore from '../../stores/useModalStore';
import InfoModal from '../../components/member/info/InfoModal';
import LoginModal from '../../components/member/login/LoginModal';
import { BsCart3 } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsChatSquareText } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import { PiBell } from "react-icons/pi";


const BasicMenu = () => {

    const { modals, openModal, closeModal } = useModalStore();
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);

    const handleInfoClick = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX - 120
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
            <ul className="flex space-x-16 text-black m-0"> {/* space-x-메뉴 간격 */}
                <li> <Link to={'/main'}>메인</Link> </li>
                <li> <Link to={'/meet/'}>모임</Link> </li>
                <li> <Link to={'/comm/'}>커뮤니티</Link> </li>
                <li> <Link to={'/shop/'}>쇼핑</Link> </li>
                <li> <Link to={'/support'}>고객센터</Link> </li>
                <li>
                    <Link to="/search" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-2px)' }}>
                        <LuSearch size={30} />
                    </Link>
                </li>
                <li>
                    <Link to="/chat" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(2px)' }}>
                        <BsChatSquareText size={26} />
                    </Link>
                </li>
                <li>
                    <Link to="/#" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(0px)' }}>
                        <BsCart3 size={27} /> {/* CartIcon 대신 BsCart3 아이콘을 사용 */}
                    </Link>
                </li>
                <li>
                    <Link to="/#" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(1px)' }}>
                        <PiBell size={29} />
                    </Link>
                </li>
                <li>
                    <button
                        ref={buttonRef}
                        className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-4px)' }}
                        onClick={handleInfoClick}
                    >
                        <HiOutlineUserCircle size={35} strokeWidth={1.2} />
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