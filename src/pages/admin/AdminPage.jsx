import { Link, Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

const AdminPage = () => {
    const { user } = useAuthStore(); // user 정보를 가져옴

    // user.role이 "ADMIN"이 아니면 리디렉션
    if (user && user.memberRole !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-10">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="w-1/5 p-6 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-8 text-left">관리자 설정</h1>

                <section className="mb-6">
                    <h2 className="font-semibold mb-3 text-left text-xl">회원 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="memList">회원 조회</Link></li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="font-semibold mb-3 text-left text-xl">상품 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="itemList">상품 조회</Link></li>
                        <li><Link to="itemAdd">상품 등록 내역</Link></li>
                        <li><Link to="itemAdd">현재 재고 내역</Link></li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-semibold mb-3 text-left text-xl">고객센터 관리</h2>
                    <ul className="space-y-2 text-left">
                        <li><Link to="inquiry-list">공지사항 등록</Link></li>
                        <li><Link to="inquiry-list">전체 문의 내역</Link></li>
                    </ul>
                </section>
            </aside>

            {/* 오른쪽 콘텐츠 영역 */}
            <main className="w-4/5 p-10">
                <Outlet /> {/* 여기서 ItemList가 렌더링됩니다 */}
            </main>
        </div>
    );
};

export default AdminPage;
