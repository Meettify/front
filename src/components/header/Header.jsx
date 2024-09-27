import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../login/LoginModal';

import logo from "../../assets/logo.png"
import search from "../../assets/search.png"
import profile from "../../assets/user.png"

const outerStyle = {
    display: "flex",
    justifyContent: "center", // 수평 중앙 정렬
    alignItems: "center", // 세로 중앙 정렬
    flexDirection: "row", // 가로 방향으로 배치
    height: "60px", // 원하는 높이 설정
    top: "0", // 상단에 위치
    zIndex: 1000 // 다른 요소 위에 표시
};

const DetailMenu = ({ content }) => {
    return (
        <div>
            <ul>
                {content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}; 

const MenuItem = ({ title, content, isOpen, onToggle }) => {
    return (
        <div>
            <div
                className="cursor-pointer flex items-center"
                onClick={onToggle}
            >
                <span className="mr-4">{title}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {isOpen && (
                <div className="pl-4">
                    {content.map((item, index) => (
                        <div key={index} className="py-1">{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Item = ({ handleToggle, openMenu }) => {
    return (
        <div className="flex items-center space-x-20">
            <img src={logo} alt="logo" style={{ width:"60px", height: "60px" }} />
            <MenuItem 
                title="메인" content={["모임 메인", "쇼핑 메인"]} 
                isOpen={openMenu === '메인'} 
                onToggle={() => handleToggle('메인')} />
            <MenuItem 
                title="모임" content={["모임 메인", "모임 게시판"]} 
                isOpen={openMenu === '모임'} 
                onToggle={() => handleToggle('모임')} />
            <MenuItem 
                title="쇼핑" content={["쇼핑 메인", "장바구니"]} 
                isOpen={openMenu === '쇼핑'} 
                onToggle={() => handleToggle('쇼핑')} />
            <MenuItem 
                title="커뮤니티" content={["게시판 메인"]} 
                isOpen={openMenu === '커뮤니티'} 
                onToggle={() => handleToggle('커뮤니티')} />
            <MenuItem 
                title="고객센터" content={["QnA", "공지사항"]} 
                isOpen={openMenu === '고객센터'} 
                onToggle={() => handleToggle('고객센터')} />
            <img src={search} alt="search" style={{ height: "24px", marginLeft: "40px" }} />
            <img src={profile} alt="user" style={{ height: "24px", marginLeft: "50px" }} />
        </div>
    )
}

const Header = () => {

    const { isAuthenticated, logout } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const [openMenu, setOpenMenu] = useState(null); // 어떤 메뉴가 열려 있는지 상태 관리

    const handleToggle = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu); // 선택된 메뉴를 열고 닫기
    };

    const handleLoginClick = () => {
        setLoginModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setLoginModalOpen(false);
      };    

    const getDetailContent = (menu) => {
        switch (menu) {
            case '메인':
                return ["모임 메인", "쇼핑 메인"]; 
            case '모임':
                return ["모임 메인", "모임 게시판"];
            case '쇼핑':
                return ["쇼핑 메인", "장바구니"];
            case '커뮤니티':
                return ["게시판 메인"];
            case '고객센터':
                return ["QnA", "공지사항"];
            default:
                return [];
        };
    };

    return (
        <div>
            <div style={outerStyle}>
                <Item handleToggle={handleToggle}/>
            </div>
            {['모임', '쇼핑', '커뮤니티', '고객센터'].includes(openMenu) && (
                <div className="border-t mt-2 pt-2">
                    <DetailMenu content={getDetailContent(openMenu)} />
                </div>
            )}
            <div>
                {isAuthenticated ? (
                <button onClick={logout}>로그아웃</button>
                ) : (
                <button onClick={handleLoginClick}>로그인</button>
                )}
                <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
            </div>
        </div>
    );
};
export default Header;

