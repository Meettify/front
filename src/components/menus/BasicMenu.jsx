import { Link } from "react-router-dom";
import logo from '../../assets/logo/meettify_logo.png'; // 로고 이미지 경로
import UserIcon from "../icons/UserIcon";
import ChatIcon from "../icons/ChatIcon";
import SearchIcon from "../icons/SearchIcon";

const BasicMenu = () => {
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
                    {/* <Link to="/login" className="text-black">로그인</Link>  */}
                    <Link to="/login" className="mr-1 text-gray-800 flex items-center" style={{ transform: 'translateY(-5px)' }}>
                        <UserIcon />
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default BasicMenu;