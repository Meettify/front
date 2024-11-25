import { Link, Outlet, useLocation  } from 'react-router-dom';
import useNavigation from '../../../hooks/useNavigation';
import useAuthStore from '../../../stores/useAuthStore';
import useCartStore from '../../../stores/useCartStore';
import useMypageStore from '../../../stores/useMypageStore';

import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiCoupon2Line } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { useMyPage } from '../../../hooks/useMypage';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../../styles/MemberMypageSlider.css';

const MemberMypage = () => {
    const location = useLocation();
    const { goToCart, goToMeetDetail, goToComm, goToShop, goToSupport } = useNavigation();

    const { user } = useAuthStore();
    const { meetJoinList }= useMyPage();
    const cartCnt = useCartStore((state) => state.cartItems).length;
    const {totalPostCount, totalInquiryCount, totalInquiryOkCount} = useMypageStore();

    const sliderSettings = {
        dots: false, // 슬라이드 하단의 점 표시 여부
        infinite: true, // 무한 스크롤 여부
        speed: 500, // 슬라이드 속도
        slidesToShow: 5, // 한 번에 표시할 슬라이드 개수
        slidesToScroll: 5, // 한 번에 스크롤할 슬라이드 개수
    };

    const handleDetailClick = (category, meetId) => {
        goToMeetDetail(meetId, category);
    };

    return (
        <div className="flex justify-center items-start mt-10">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="sticky top-10 w-[366px] h-[650px] pl-36 pr-10 pb -10 mt-10 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-10 text-left">
                    <Link to="/mypage">마이페이지</Link>
                </h1>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">쇼핑 내역 및 활동</h2>
                    <ul className="space-y-2 text-left w-2/3">
                        <li className={`${location.pathname === '/mypage/orderList' ? 'bg-slate-300 rounded-sm w-3/4 text-center text-white' : ''} hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="orderList">상품 구매 내역</Link>
                        </li>
                        <li className={`${location.pathname === '/mypage/meetJoinList' ? 'bg-slate-300 rounded-sm w-3/4 text-center text-white' : ''} hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="meetJoinList">모임 가입 신청</Link>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">나의 스토리</h2>
                    <ul className="space-y-2 text-left w-2/3">
                        <li className={`${location.pathname === '/mypage/postList' ? 'bg-slate-300 rounded-sm w-3/4 text-center text-white' : ''} hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="postList">내가 작성한 글</Link>
                        </li>
                        <li className={`${location.pathname === '/mypage/inquiryList' ? 'bg-slate-300 rounded-sm w-3/4 text-center text-white' : ''} hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="inquiryList">내가 작성한 문의</Link>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold mb-2 text-left text-2xl">개인정보관리</h2>
                    <ul className="space-y-2 text-left w-2/3">
                        <li className={`${location.pathname === '/mypage/editProfile' ? 'bg-slate-300 rounded-sm w-3/4 text-center text-white' : ''} hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="editProfile">내 정보 수정</Link>
                        </li>
                        <li className={`${location.pathname === '/mypage/deleteMember' ? 'bg-red-300 rounded-sm w-3/4 text-center text-white' : ''} text-red-600 hover:bg-red-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}>
                            <Link to="deleteMember">회원탈퇴</Link>
                        </li>
                    </ul>
                </section>
            </aside>

            {/* 오른쪽 콘텐츠 영역 (Outlet 내용 표시) */}
            <main className="w-1/2 p-5">
                {/* <p>마이페이지 메인</p> */}
                <div className={`mt-[22px] ${location.pathname === '/mypage' ? '' : 'hidden' }`}>
                    <div className='min-w-10/12 h-52 p-5 rounded bg-black opacity-80'>
                        <div className='flex flex-row h-full'>
                            <div className='w-2/5'>
                                <p className='w-3/6 mb-5 text-white bg-green-600 rounded-md'>내 정보</p>
                                <p className='flex ml-[1px] mb-0 p-2 text-white'>
                                    <span className='mr-1'><MdDriveFileRenameOutline size={24}/></span>
                                    <span>{user.memberName}</span>
                                </p>
                                <p className='flex mb-0 ml-[1px] p-2 text-white '>
                                    <span className='mr-2'><FaRegUser size={21}/></span>
                                    <span>{user.nickName}</span>
                                </p>
                                <p className='flex m-2 ml-0 mt-0 p-2 text-white'>
                                    <span className='mr-2'><HiOutlineMail size={23}/></span>
                                    <span>{user.memberEmail}</span>
                                </p>
                            </div>
                            <div className='w-1/5 flex flex-col justify-end'>
                                <button 
                                className='w-[100px] mb-8 pt-1 pb-1 pr-4 pl-4 border rounded-md bg-black text-gray-400
                                transition-colors duration-200 hover:text-gray-700 hover:border-gray-700'>
                                    <Link to="/mypage/editProfile"><span className='w-full'>내 정보 수정</span></Link>
                                </button>
                            </div>
                            <div className='w-3/6'>
                                <div className='w-full h-2/3 ml-16 mt-8 p-2 border-l border-red-700'>
                                    <button 
                                        className='flex w-3/4 mt-3 mb-4 ml-5 p-1 text-white transition-colors duration-200 hover:text-gray-700'
                                        onClick={() => goToCart()}
                                    >
                                        <span className='mr-2 mt-[0.5px]'><BsCart4 size={20}/></span>
                                        <span>장바구니</span>
                                        <span className='ml-auto'>{cartCnt}건</span>
                                    </button>
                                    <button className='flex w-3/4 ml-5 p-1 text-white transition-colors duration-200 hover:text-gray-700'>
                                        <span className='mr-2 mt-[0.5px]'><RiCoupon2Line size={20}/></span>
                                        <span>보유중인 쿠폰</span>
                                        <span className='ml-auto'>0건</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> {/* 상단 */}
                    <hr className='mt-10 mb-10 border-gray-300 border-4 rounded-lg'/>

                    {/* 슬라이드 */}
                    <div>
                        <p className='flex text-left ml-[1px] mb-2 text-xl font-bold'>나의 모임
                            <span className='ml-auto text-[14px] mt-2 mr-3 underline text-gray-400 font-normal cursor-pointer transition-colors duration-200 hover:text-gray-700'>
                                <Link to={'/mypage/meetJoinList'}>자세히 보기</Link></span>
                        </p>
                        {meetJoinList.length === 0 ? (
                            <div className="flex items-center justify-center h-[200px] border border-gray-300 rounded-md">
                                <p className="text-gray-500">가입된 모임이 없습니다.</p>
                            </div>
                        ) : (
                            <Slider {...sliderSettings} className="h-[200px] p-5 border border-gray-300 rounded-md">
                                {meetJoinList.map((meet, index) => (
                                    <div 
                                        key={index} 
                                        className='flex-none w-36 h-full border border-zinc-300 rounded-md 
                                        flex flex-col items-center p-2 cursor-pointer
                                        hover:shadow-inner hover:border-gray-400 transition-all duration-200'
                                        onClick={() => handleDetailClick(meet.category, meet.meetId)}
                                    >
                                        {meet.images ? (
                                            <img
                                                src={meet.images}
                                                alt={meet.meetName}
                                                className="w-full h-24 object-fill rounded-md border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
                                                <p className="text-gray-500">사진 없음</p>
                                            </div>
                                        )}
                                        <p className='mt-2 font-bold text-sm text-center'>{meet.meetName}</p>
                                        <p className='text-blue-500 text-xs'>{meet.category}</p>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                    {/* 슬라이드 */}

                    <div className="flex gap-2 h-60 mt-16 z-9999">
                        <div className="flex-1 p-4 border border-gray-300 rounded-md">
                            <p className='flex text-left'>
                                <span>상품 구매 내역</span>
                                <span className='ml-auto text-gray-400 underline transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to='/mypage/orderList'>더보기</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mt-4 mb-4'/>
                            <p className='flex text-left mb-5 mt-8'>
                                <span>구매한 상품</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>0</span>건</p>
                            <p className='flex text-left'>
                                <span>구매 완료</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>0</span>건</p>
                            <button
                                className='w-4/5 mt-8 p-2 text-gray-500 border border-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-300'
                                onClick={() => goToShop()}
                                >
                                상품 목록
                            </button>
                        </div>
                        <div className="flex-1 p-4 border border-gray-300 rounded-md">
                            <p className='flex text-left'>
                                <span>내가 작성한 글</span>
                                <span className='ml-auto text-gray-400 underline transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to='/mypage/postList'>더보기</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mt-4 mb-4'/>
                            <p className='flex text-left mb-5 mt-[54px]'>
                                <span>작성한 글</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>{totalPostCount}</span>건</p>
                            <button
                                className='w-4/5 mt-8 p-2 text-gray-500 border border-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-300'
                                onClick={() => goToComm()}
                                >
                                커뮤니티 글쓰기
                            </button>
                        </div>
                        <div className="flex-1 p-4 border border-gray-300 rounded-md">
                            <p className='flex text-left'>
                                <span>내가 작성한 문의</span>
                                <span className='ml-auto text-gray-400 underline transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to='/mypage/inquiryList'>더보기</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mt-4 mb-4'/>
                            <p className='flex text-left mb-5 mt-8'>
                                <span>작성한 문의</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>{totalInquiryCount}</span>건</p>
                            <p className='flex text-left'>
                                <span>답변완료</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>{totalInquiryOkCount}</span>건</p>
                            <button
                                className='w-4/5 mt-8 p-2 text-gray-500 border border-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-300'
                                onClick={() => goToSupport()}
                                >
                                문의하기
                            </button>
                        </div>
                    </div>
                </div> {/* hidden */}
                <br />
                <Outlet />
            </main>
        </div>
    );
};

export default MemberMypage;
