import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import useCommChartData from "../../utils/useCommChartData";
import CommBarChart from "../../components/admin/CommBarChart";
import MemberBarChart from "../../components/admin/MemberBarChart";
import useMemberChartData from "../../utils/useMemberChartData";
import useAdminMainStore from "../../stores/useAdminMainStore";
import useNavigation from "../../hooks/useNavigation";
import { useAdminMain } from "../../hooks/useAdminMain";

const AdminPage = () => {
  const { user } = useAuthStore(); // user 정보
  const location = useLocation(); // 현재 경로
  const chartData = useCommChartData();
  const memberChartData = useMemberChartData();
  const { goToComm } = useNavigation();

  const {
    todayPostsCount,
    allCommunityPostsCount,
    allMembersCount,
    todayMemberCount,
  } = useAdminMainStore();
  const { totalQuestions, completedReplies, pendingReplies } = useAdminMain();

  // 관리자 권한 아니면 리디렉션
  if (user && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 정확히 /admin일 때만 dashboard 보여주기
  const isDashboardPage = location.pathname === "/admin";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* 사이드바 메뉴 */}
      <aside className="w-full lg:w-1/5 p-6 border-b lg:border-b-0 lg:border-r border-gray-300">
        <h1 className="text-3xl font-bold mb-8 text-left">
          <Link to="/admin">관리자 설정</Link>
        </h1>

        <section className="mb-6">
          <h2 className="font-semibold mb-3 text-left text-xl">회원 관리</h2>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="memList">회원 조회</Link>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-3 text-left text-xl">상품 관리</h2>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="itemList">상품 조회</Link>
            </li>
            <li>
              <Link to="itemAdd">상품 등록</Link>
            </li>
            <li>
              <Link to="itemConfirm">상품 컨펌</Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-3 text-left text-xl">
            고객센터 관리
          </h2>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="notice">공지사항 등록</Link>
            </li>
            <li>
              <Link to="questionsList">전체 문의 내역</Link>
            </li>
          </ul>
        </section>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 p-6">
        {isDashboardPage ? (
          <>
            {/* ✅ 대시보드 UI - /admin 에서만 보임 */}
            <p className="text-2xl font-semibold mb-6">DashBoard</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* 회원 현황 */}
              <div className="border border-gray-300 rounded-md">
                <div className="flex justify-between items-center h-10 px-2 bg-purple-600 text-white text-sm rounded-t-md">
                  <span>회원 현황</span>
                  <Link to="memList">+</Link>
                </div>
                <div className="p-4">
                  <p className="flex justify-between text-sm mb-3">
                    <span>전체회원 수</span>
                    <span className="font-bold">{allMembersCount}명</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>오늘 가입 수</span>
                    <span className="font-bold">{todayMemberCount}명</span>
                  </p>
                </div>
              </div>

              {/* 상품 현황 */}
              <div className="border border-gray-300 rounded-md">
                <div className="flex justify-between items-center h-10 px-2 bg-indigo-600 text-white text-sm rounded-t-md">
                  <span>상품 현황</span>
                  <Link to="itemList">+</Link>
                </div>
                <div className="p-4">
                  <p className="flex justify-between text-sm mt-6">
                    <span>전체상품 수</span>
                    <span className="font-bold">0개</span>
                  </p>
                </div>
              </div>

              {/* 주문 현황 */}
              <div className="border border-gray-300 rounded-md">
                <div className="flex justify-between items-center h-10 px-2 bg-sky-600 text-white text-sm rounded-t-md">
                  <span>주문 현황</span>
                  <span className="text-white">+</span>
                </div>
                <div className="p-4">
                  <p className="flex justify-between text-sm mt-6">
                    <span>전체주문 수</span>
                    <span className="font-bold">0개</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 회원 통계 */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-2">
                회원가입 날짜별 통계
              </h2>
              <div className="flex justify-center items-center">
                {chartData.length > 0 ? (
                  <MemberBarChart chartData={memberChartData} />
                ) : (
                  <p>데이터가 없습니다.</p>
                )}
              </div>
            </div>

            {/* 커뮤니티 현황 */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold mb-2">커뮤니티</h2>
              <div className="border border-gray-300 rounded-md bg-white p-4 max-w-[500px] mx-auto">
                <div className="flex justify-between bg-red-600 text-white px-2 rounded-t-md h-10 items-center">
                  <span>커뮤니티 현황</span>
                  <span>+</span>
                </div>
                <div className="p-4">
                  <p className="flex justify-between text-sm mb-2">
                    <span>오늘 게시글 수</span>
                    <span className="font-bold">{todayPostsCount}개</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>전체 게시글 수</span>
                    <span className="font-bold">
                      {allCommunityPostsCount}개
                    </span>
                  </p>
                  <button
                    onClick={goToComm}
                    className="mt-4 w-full py-2 border text-sm text-gray-600 hover:bg-gray-600 hover:text-white"
                  >
                    커뮤니티 바로가기
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">
                  게시물 날짜별 통계
                </h2>
                <div className="flex justify-center items-center">
                  {chartData.length > 0 ? (
                    <CommBarChart chartData={chartData} />
                  ) : (
                    <p>데이터가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            {/* 문의 현황 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">문의</h2>
              <div className="border border-gray-300 rounded-md bg-white p-4 max-w-[500px] mx-auto">
                <div className="flex justify-between bg-emerald-600 text-white px-2 rounded-t-md h-10 items-center">
                  <span>문의 현황</span>
                  <Link to="inquiry-list">+</Link>
                </div>
                <div className="p-4">
                  <p className="flex justify-between text-sm mb-2">
                    <span>전체 문의글 수</span>
                    <span className="font-bold">{totalQuestions}개</span>
                  </p>
                  <p className="flex justify-between text-sm mb-2">
                    <span>답글 완료 수</span>
                    <span className="font-bold">{completedReplies}개</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>답글 미완료 수</span>
                    <span className="font-bold">{pendingReplies}개</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminPage;
