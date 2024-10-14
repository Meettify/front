import { Link, Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

const AdminPage = () => {
    const { user } = useAuthStore(); // user 정보를 가져옴

    // user.role이 "ADMIN"이 아니면 리디렉션
    if (user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="w-1/4 pl-52 p-10 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-10 text-left">관리자 설정</h1>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">회원 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="member-list">회원 조회</Link></li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="font-bold mb-2 text-left text-2xl">상품 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="itemlist">상품 조회</Link></li> {/* 상품 조회 메뉴 */}
                        <li><Link to="itemadd">상품 등록</Link></li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-bold mb-2 text-left text-2xl">고객센터 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="inquiry-list">공지사항 조회</Link></li>
                    </ul>
                </section>
            </aside>

            {/* 오른쪽 콘텐츠 영역 */}
            <main className="w-3/4 p-10">
                <p>관리자 페이지 메인</p>
                <br />
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;
