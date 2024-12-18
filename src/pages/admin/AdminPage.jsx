import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useCommChartData from '../../utils/useCommChartData';
import CommBarChart from '../../components/admin/CommBarChart';
import MemberBarChart from '../../components/admin/MemberBarChart';
import useMemberChartData from '../../utils/useMemberChartData';
import useAdminMainStore from '../../stores/useAdminMainStore';
import useNavigation from '../../hooks/useNavigation';
import { useAdminMain } from '../../hooks/useAdminMain';

const AdminPage = () => {
    const { user } = useAuthStore(); // user 정보를 가져옴
    const location = useLocation();
    const chartData = useCommChartData();
    const memberChartData = useMemberChartData();

    const {todayPostsCount, allCommunityPostsCount, allMembersCount, todayMemberCount} = useAdminMainStore();
    const {totalQuestions, completedReplies, pendingReplies, } = useAdminMain();

    const {
        goToComm,
    } = useNavigation();
    
    // user.role이 "ADMIN"이 아니면 리디렉션
    if (user && user.memberRole !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex justify-center items-start min-h-screen p-10">
            {/* 왼쪽 메뉴 영역 */}
            <aside className="w-1/5 p-6 border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-8 text-left">
                    <Link to="/admin">관리자 설정</Link>
                </h1>

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
                        <li><Link to="itemAdd">상품 등록</Link></li>
                        <li><Link to="itemConfirm">상품 컨펌 </Link></li>
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
            <main className="w-1/2 max-w-[1050px] p-5">
                <div className={`${location.pathname === '/admin' ? '' : 'hidden'}`}>
                    <p className='text-[26px] text-left'>DashBoard</p>
                    <hr className='border-gray-300 border-1 mb-10 mt-2'/>
                    <div className='flex gap-3 justify-center'>
                        <div className="flex-1 border max-w-[330px] h-[170px] border-gray-300 rounded-md">
                            <p className='flex justify-between text-left h-10 bg-purple-600 opacity-75 rounded-t-md'>
                                <span className='flex items-center ml-2 text-white text-[16px]'>회원 현황</span>
                                <span className='ml-auto mr-2 text-white text-[16px] flex items-center
                                transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to='memList'>+</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mb-2'/>
                            <div className='p-4'>
                                <p className='flex text-left mb-5'>
                                    <span>전체회원 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{allMembersCount}</span>명
                                </p>
                                <p className='flex text-left mb-5 mt-2'>
                                    <span>오늘 가입한 회원 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{todayMemberCount}</span>명
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 border max-w-[330px] border-gray-300 rounded-md">
                            <p className='flex justify-between text-left h-10 bg-indigo-600 opacity-75 rounded-t-md'>
                                <span className='flex items-center ml-2 text-white text-[16px]'>상품 현황</span>
                                <span className='ml-auto mr-2 text-white text-[16px] flex items-center
                                transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to='itemList'>+</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mb-4'/>
                            <p className='flex text-left mb-5 mt-[30px] p-4'>
                                <span>전체상품 수</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>0</span>개</p>
                        </div>
                        <div className="flex-1 border max-w-[330px] border-gray-300 rounded-md">
                            <p className='flex justify-between text-left h-10 bg-sky-600 opacity-75 rounded-t-md'>
                                <span className='flex items-center ml-2 text-white text-[16px]'>주문 현황</span>
                                <span className='ml-auto mr-2 text-white text-[16px] flex items-center
                                transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                    <Link to=''>+</Link></span>
                            </p>
                            <hr className='border-gray-300 border-1 mb-4'/>
                            <p className='flex text-left mb-5 mt-[30px] p-4'>
                                <span>전체주문 수</span>
                                <span className='ml-auto mr-1 font-bold text-[16px]'>0</span>개</p>
                        </div>
                    </div>

                    <div className='flex-1 mt-10 w-full'>
                            <h2 className='flex text-left ml-10 mb-2 text-[16px] from-neutral-800'>회원가입 날짜별 통계</h2>
                            <div className='flex justify-center items-center'>
                                {chartData.length > 0 ? (
                                    <MemberBarChart chartData={memberChartData} />
                                ) : (
                                    <p>데이터가 없습니다.</p>
                                )}
                            </div>
                    </div>

                    <hr className='border-gray-300 border-1 mb-4 mt-10'/>
                    <p className='flex text-left text-[20px] mt-10 mb-2'>커뮤니티</p>
                    <div className='bg-zinc-50 p-4 rounded-md'>
                        <div className='flex mt-5 justify-center items-center'>
                            <div className="flex-1 border max-w-[500px] max-h-[300px] border-gray-300 rounded-md bg-white">
                                <p className='flex justify-between text-left h-10 bg-red-600 opacity-75 rounded-t-md'>
                                    <span className='flex items-center ml-2 text-white text-[16px]'>커뮤니티 현황</span>
                                    <span className='ml-auto mr-2 text-white text-[16px] flex items-center
                                    transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                        <Link to=''>+</Link></span>
                                </p>
                                <hr className='border-gray-300 border-1 mb-4'/>
                                <p className='flex text-left mb-0 mt-[5px] p-4'>
                                    <span>오늘 게시글 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{todayPostsCount}</span>개
                                </p>
                                <p className='flex text-left mb-0 mt-[5px] p-4'>
                                    <span>전체 게시글 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{allCommunityPostsCount}</span>개
                                </p>
                                <button
                                className='w-4/5 mt-5 mb-5 p-2 text-gray-500 border border-gray-400 transition-colors duration-200 hover:bg-gray-600 hover:text-gray-300'
                                onClick={() => goToComm()}
                                >
                                커뮤니티 바로가기
                                </button>
                            </div>
                        </div>
                        <div className='flex-1 mt-10 w-full'>
                            <h2 className='flex text-left ml-10 mb-2 text-[16px] from-neutral-800'>게시물 날짜별 통계</h2>
                                <div className='flex justify-center items-center'>
                                    {chartData.length > 0 ? (
                                        <CommBarChart chartData={chartData} />
                                    ) : (
                                        <p>데이터가 없습니다.</p>
                                    )}

                                </div>
                        </div>

                    </div>
                    <hr className='border-gray-300 border-1 mb-4 mt-10'/>
                    <p className='flex text-left text-[20px] mt-10 mb-2'>문의</p>
                    <div className='bg-zinc-50 p-8 rounded-md'>
                        <div className='flex justify-center items-center'>
                            <div className="flex-1 border max-w-[500px] max-h-[300px] border-gray-300 rounded-md bg-white">
                                <p className='flex justify-between text-left h-10 bg-emerald-600 opacity-75 rounded-t-md'>
                                    <span className='flex items-center ml-2 text-white text-[16px]'>문의 현황</span>
                                    <span className='ml-auto mr-2 text-white text-[16px] flex items-center
                                    transition-colors duration-200 hover:text-gray-700 cursor-pointer'>
                                        <Link to='inquiry-list'>+</Link></span>
                                </p>
                                <hr className='border-gray-300 border-1 mb-4'/>
                                <p className='flex text-left mb-0 mt-[5px] p-4'>
                                    <span>전체 문의글 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{totalQuestions}</span>개
                                </p>
                                <p className='flex text-left mb-0 mt-[5px] p-4'>
                                    <span>답글 완료 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{completedReplies}</span>개
                                </p>
                                <p className='flex text-left mb-0 mt-[5px] p-4'>
                                    <span>답글 미완료 수</span>
                                    <span className='ml-auto mr-1 font-bold text-[16px]'>{pendingReplies}</span>개
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet /> {/* 여기서 ItemList가 렌더링됩니다 */}
            </main>
        </div>
    );
};

export default AdminPage;
