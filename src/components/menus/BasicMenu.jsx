import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"; // useLocation import
import logo from '../../assets/logo/meettify_logo.png';
import useModalStore from '../../stores/useModalStore';
import InfoModal from '../member/mypage/InfoModal';
import LoginModal from '../../components/member/login/LoginModal';
import { BsCart3 } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsChatSquareText } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { PiBell } from "react-icons/pi";

import SearchBar from '../../components/menus/SearchBar'; // SearchBar import

const BasicMenu = () => {
    const { modals, openModal, closeModal } = useModalStore();
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // SearchBar 가시성 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
    const location = useLocation(); // 현재 위치 확인

    const handleInfoClick = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX - 120
        });
        openModal('info');
    };

    const toggleSearchBar = () => {
        setIsSearchOpen(prev => !prev); // SearchBar 토글
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (searchTerm && location.pathname !== '/chat') { // 검색어가 있을 때만 토글
                toggleSearchBar();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchTerm, location.pathname]); // 검색어와 pathname 변경 시 이벤트 리스너 업데이트

    return (
        <nav id='navbar' className="flex items-center justify-center w-full py-0 px-5 relative">
            <div className="flex items-center mr-20">
                <Link to="/">
                    <img src={logo} alt="Meettify Logo" className="w-48 h-auto" />
                </Link>
            </div>

            <ul className="flex space-x-16 text-black m-0">
                <li> <Link to={'/main'}>메인</Link> </li>
                <li> <Link to={'/meet'}>모임</Link> </li>
                <li> <Link to={'/comm/'}>커뮤니티</Link> </li>
                <li> <Link to={'/shop/'}>쇼핑</Link> </li>
                <li> <Link to={'/support'}>고객센터</Link> </li>
                <li>
                    <button onClick={toggleSearchBar} className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-2px)' }}>
                        <LuSearch size={30} />
                    </button>
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
                <li> <Link to={'/mypage'}>마이페이지</Link> </li>
                <li> <Link to={'/admin'}>관리자페이지</Link> </li>
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

            {/* SearchBar 드롭다운 */}
            <div className={`absolute top-full left-0 w-full transition-all duration-300 ${isSearchOpen ? 'block' : 'hidden'}`}>
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
        </nav>
    );
}

export default BasicMenu;
