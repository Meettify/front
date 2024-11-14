import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo/meettify_logo.png';
import useModalStore from '../../stores/useModalStore';
import InfoModal from '../member/mypage/InfoModal';
import LoginModal from '../../components/member/login/LoginModal';
import { BsCart3 } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsChatSquareText } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { PiBell } from "react-icons/pi";
import SearchBar from '../../components/menus/SearchBar';
import { useAuth } from '../../hooks/useAuth';

const BasicMenu = () => {
    const { modals, openModal, closeModal } = useModalStore();
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const { user } = useAuth();

    const handleInfoClick = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX - 120
        });
        openModal('info');
    };

    const toggleSearchBar = () => {
        setIsSearchOpen(prev => !prev);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);  // 검색창을 닫음
        setSearchTerm('');  // 검색어 초기화
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (searchTerm && location.pathname !== '/chat') {
                toggleSearchBar();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchTerm, location.pathname]);

    return (
        <nav id='navbar' className="flex items-center justify-center w-full py-0 px-5 relative">
            <div className="flex items-center mr-14">
                <Link to="/">
                    <img src={logo} alt="Meettify Logo" className="w-48 h-auto" style={{ transform: 'translateY(-4px)' }} />
                </Link>
            </div>

            <ul className="flex space-x-14 text-black m-0">
                <li><Link to={'/main'}>메인</Link></li>
                <li><Link to={'/meet'}>모임</Link></li>
                <li><Link to={'/comm/'}>커뮤니티</Link></li>
                <li><Link to={'/shop/'}>쇼핑</Link></li>
                <li><Link to={'/support'}>고객센터</Link></li>
                <li>
                    <button onClick={toggleSearchBar} className="mr-1 text-gray-700 flex items-center" style={{ transform: 'translateY(0px)' }}>
                        <LuSearch size={26} />
                    </button>
                </li>
                <li>
                    <Link to="/#" className="mr-1 text-gray-700 flex items-center" style={{ transform: 'translateY(0px)' }}>
                        <PiBell size={28} />
                    </Link>
                </li>
                <li>
                    <button
                        ref={buttonRef}
                        className="mr-1 text-gray-700 flex items-center" style={{ transform: 'translateY(-2px)' }}
                        onClick={handleInfoClick}
                    >
                        <HiOutlineUserCircle size={30} strokeWidth={1.3} />
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

            {/* SearchBar 드롭다운 */}
            <div className={`absolute top-full left-0 w-full transition-all duration-300 ${isSearchOpen ? 'block' : 'hidden'}`}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} closeSearch={closeSearch} />
            </div>
        </nav>
    );
}

export default BasicMenu;
