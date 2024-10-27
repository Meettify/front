import { Link, Outlet, useLocation  } from 'react-router-dom';

const MemberMypage = () => {
    const location = useLocation();

    return (
        <div className="flex justify-center items-start mt-10">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="sticky top-10 w-[366px] h-[650px] pl-36 pr-10 pb -10 mt-10 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-10 text-left">마이페이지</h1>

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
                <br />
                <Outlet />
            </main>
        </div>
    );
};

export default MemberMypage;
