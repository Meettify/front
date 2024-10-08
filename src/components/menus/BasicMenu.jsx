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
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드 메뉴 상태 추가

    const handleInfoClick = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX - 120
        });
        openModal('info');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // 메뉴 토글
    };

    return (
        <nav id='navbar' className="flex items-center justify-between w-full py-0 px-5">
            {/* 로고 */}
            <div className="flex items-center mr-20">
                <Link to="/">
                    <img src={logo} alt="Meettify Logo" className="w-48 h-auto" />
                </Link>
            </div>

            {/* 메뉴 */}
            <ul className="hidden md:flex space-x-16 text-black m-0">
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
                    <Link to="/chat" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-5px)' }}>
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
                        <BsCart3 size={27} /> 
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

            {/* 모바일 메뉴 아이콘 */}
            <div className="md:hidden">
            <button onClick={toggleMenu} className="p-4">
                <FiMenu size={30} /> {/* 아이콘 크기를 30px로 설정 */}
            </button>
            </div>

            {/* 사이드 메뉴 */}
            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-1/3 h-full bg-white shadow-md z-50"> {/* 너비를 1/3로 조정 */}
                    <button onClick={toggleMenu} className="p-4">Close</button>
                    <ul className="flex flex-col items-center p-4 space-y-4"> {/* 가운데 정렬 */}
                        <li className="text-center"><Link to={'/main'}>메인</Link></li>
                        <li className="text-center"><Link to={'/meet/'}>모임</Link></li>
                        <li className="text-center"><Link to={'/comm/'}>커뮤니티</Link></li>
                        <li className="text-center"><Link to={'/shop/'}>쇼핑</Link></li>
                        <li className="text-center"><Link to={'/support'}>고객센터</Link></li>
                        <li className="text-center">
                            <Link to="/search" className="flex items-center">
                                <SearchIcon />
                            </Link>
                        </li>
                        <li className="text-center">
                            <Link to="/chat" className="flex items-center">
                                <ChatIcon />
                            </Link>
                        </li>
                        <li className="text-center">
                            <button
                                ref={buttonRef}
                                className="flex items-center"
                                onClick={handleInfoClick}
                            >
                                <UserIcon />
                            </button>
                        </li>
                    </ul>
                </div>
            )}



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
