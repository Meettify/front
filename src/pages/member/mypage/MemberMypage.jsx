import { Link, Outlet } from 'react-router-dom';

const MemberMypage = () => {
    return (
        <div className="flex justify-center items-center">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="w-1/4 pl-52 p-10 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-10 text-left">마이페이지</h1>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">쇼핑 내역 및 활동</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="meetJoinList">모임 가입 신청</Link></li>
                        <li><Link to="order-history">상품 주문 내역</Link></li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">나의 스토리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="my-posts">내가 작성한 글</Link></li>
                        <li><Link to="my-comments">댓글 단 글</Link></li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold mb-2 text-left text-2xl">개인정보관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="editProfile">내 정보 수정</Link></li>
                        <li><Link to="deleteMember" className="text-red-600">회원탈퇴</Link></li>
                    </ul>
                </section>
            </aside>

            {/* 오른쪽 콘텐츠 영역 (Outlet 내용 표시) */}
            <main className="w-3/4 p-10">
                {/* <p>마이페이지 메인</p> */}
                <br />
                <Outlet />
            </main>
        </div>
    );
};

export default MemberMypage;
