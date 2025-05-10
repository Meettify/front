import { Link, Outlet, useLocation } from "react-router-dom";
import useNavigation from "../../../hooks/useNavigation";
import useAuthStore from "../../../stores/useAuthStore";
import useCartStore from "../../../stores/useCartStore";
import useMypageStore from "../../../stores/useMypageStore";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";
import { useMyPage } from "../../../hooks/useMypage";
import { useAuth } from "../../../hooks/useAuth";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../styles/MemberMypageSlider.css";

const MemberMypage = () => {
  const location = useLocation();

  const { goToCart, goToMeetDetail, goToComm, goToShop, goToSupport } =
    useNavigation();
  const { user, isAuthenticated, logout } = useAuth();
  console.log("이메일 : ", user.email); // ✅ 정상
  console.log("가입일 : ", user.createdAt); // ✅ 정상
  console.log("닉네임 : ", user.nickName); // ✅ 정상
  const { meetJoinList } = useMyPage();
  const cartCnt = useCartStore((state) => state.cartItems).length;
  const {
    totalPostCount,
    totalInquiryCount,
    totalInquiryOkCount,
    myOrderListCount,
  } = useMypageStore();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  if (user?.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  const handleDetailClick = (category, meetId) => {
    goToMeetDetail(meetId, category);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center px-10 gap-10 mt-10">
        <aside className="sticky top-10 w-[280px] min-h-[650px] border-r border-gray-300 pr-6">
          <h1 className="text-3xl font-bold mb-10 text-left">
            <Link to="/mypage">마이페이지</Link>
          </h1>
          <section className="mb-8">
            <h2 className="font-bold mb-2 text-left text-2xl">
              쇼핑 내역 및 활동
            </h2>
            <ul className="space-y-2 text-left w-2/3">
              <li
                className={`${
                  location.pathname === "/mypage/orderList"
                    ? "bg-slate-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="orderList">상품 구매 내역</Link>
              </li>
              <li
                className={`${
                  location.pathname === "/mypage/meetJoinList"
                    ? "bg-slate-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="meetJoinList">모임 가입 신청</Link>
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="font-bold mb-2 text-left text-2xl">나의 스토리</h2>
            <ul className="space-y-2 text-left w-2/3">
              <li
                className={`${
                  location.pathname === "/mypage/postList"
                    ? "bg-slate-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="postList">내가 작성한 글</Link>
              </li>
              <li
                className={`${
                  location.pathname === "/mypage/inquiryList"
                    ? "bg-slate-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="inquiryList">내가 작성한 문의</Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold mb-2 text-left text-2xl">개인정보관리</h2>
            <ul className="space-y-2 text-left w-2/3">
              <li
                className={`${
                  location.pathname === "/mypage/editProfile"
                    ? "bg-slate-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } hover:bg-slate-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="editProfile">내 정보 수정</Link>
              </li>
              <li
                className={`${
                  location.pathname === "/mypage/deleteMember"
                    ? "bg-red-300 rounded-sm w-3/4 text-center text-white"
                    : ""
                } text-red-600 hover:bg-red-300 hover:rounded-sm hover:w-3/4 hover:text-center hover:text-white`}
              >
                <Link to="deleteMember">회원탈퇴</Link>
              </li>
            </ul>
          </section>
        </aside>

        <main className="flex-1 max-w-[960px] pb-20">
          {location.pathname === "/mypage" && (
            <div className="mt-[22px]">
              {/* 정보 박스 */}
              <div className="w-full p-5 rounded bg-black opacity-90 text-white">
                <div className="flex justify-between items-center h-full">
                  <div>
                    <p className="inline-block mb-5 px-3 py-1 bg-green-600 rounded-md text-center">
                      내 정보
                    </p>
                    <p className="flex items-center mb-2">
                      <MdDriveFileRenameOutline className="mr-2" />
                      가입일: {user.createdAt?.slice(0, 10) || "정보 없음"}
                    </p>
                    <p className="flex items-center mb-2">
                      <FaRegUser className="mr-2" />
                      {user.nickName}
                    </p>
                    <p className="flex items-center">
                      <HiOutlineMail className="mr-2" />
                      {user.email}
                    </p>
                  </div>
                  <div className="pl-6 border-l border-red-400 text-sm">
                    <p className="flex items-center mb-1">
                      <BsCart4 className="mr-2" />
                      장바구니 <span className="ml-4">{cartCnt}건</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <Link to="/mypage/editProfile">
                      <button className="border px-3 py-1 rounded-md text-gray-400 hover:text-gray-100 hover:border-gray-100">
                        내 정보 수정
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <hr className="mt-10 mb-10 border-gray-300 border-4 rounded-lg" />

              {/* 모임 슬라이드 */}
              <p className="text-xl font-bold mb-2">나의 모임</p>
              {meetJoinList.length === 0 ? (
                <div className="flex items-center justify-center h-[200px] border border-gray-300 rounded-md">
                  <p className="text-gray-500">가입된 모임이 없습니다.</p>
                </div>
              ) : (
                <Slider
                  {...sliderSettings}
                  className="h-[200px] p-5 border border-gray-300 rounded-md"
                >
                  {meetJoinList.map((meet, index) => (
                    <div
                      key={index}
                      className="flex-none w-36 h-full border border-zinc-300 rounded-md flex flex-col items-center p-2 cursor-pointer hover:shadow-inner hover:border-gray-400 transition-all duration-200"
                      onClick={() =>
                        handleDetailClick(meet.category, meet.meetId)
                      }
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
                      <p className="mt-2 font-bold text-sm text-center">
                        {meet.meetName}
                      </p>
                      <p className="text-blue-500 text-xs">{meet.category}</p>
                    </div>
                  ))}
                </Slider>
              )}

              {/* 카드 영역 */}
              <div className="flex gap-4 h-60 mt-16">
                <div className="flex-1 p-4 border border-gray-300 rounded-md">
                  <p className="flex justify-between mb-2">
                    <span>상품 구매 내역</span>
                    <Link
                      to="/mypage/orderList"
                      className="text-gray-400 underline hover:text-gray-700"
                    >
                      더보기
                    </Link>
                  </p>
                  <hr className="border-gray-300 mt-2 mb-4" />
                  <p className="flex justify-between mb-5">
                    <span>구매 완료</span>
                    <span className="font-bold">{myOrderListCount}건</span>
                  </p>
                  <button
                    className="w-full p-2 text-gray-500 border border-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={goToShop}
                  >
                    상품 둘러보기
                  </button>
                </div>

                <div className="flex-1 p-4 border border-gray-300 rounded-md">
                  <p className="flex justify-between mb-2">
                    <span>내가 작성한 글</span>
                    <Link
                      to="/mypage/postList"
                      className="text-gray-400 underline hover:text-gray-700"
                    >
                      더보기
                    </Link>
                  </p>
                  <hr className="border-gray-300 mt-2 mb-4" />
                  <p className="flex justify-between mb-5">
                    <span>작성한 글</span>
                    <span className="font-bold">{totalPostCount}건</span>
                  </p>
                  <button
                    className="w-full p-2 text-gray-500 border border-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={goToComm}
                  >
                    커뮤니티 글쓰기
                  </button>
                </div>

                <div className="flex-1 p-4 border border-gray-300 rounded-md">
                  <p className="flex justify-between mb-2">
                    <span>내가 작성한 문의</span>
                    <Link
                      to="/mypage/inquiryList"
                      className="text-gray-400 underline hover:text-gray-700"
                    >
                      더보기
                    </Link>
                  </p>
                  <hr className="border-gray-300 mt-2 mb-4" />
                  <p className="flex justify-between mb-2">
                    <span>작성한 문의</span>
                    <span className="font-bold">{totalInquiryCount}건</span>
                  </p>
                  <p className="flex justify-between">
                    <span>답변완료</span>
                    <span className="font-bold">{totalInquiryOkCount}건</span>
                  </p>
                  <button
                    className="w-full mt-4 p-2 text-gray-500 border border-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={goToSupport}
                  >
                    문의하기
                  </button>
                </div>
              </div>
            </div>
          )}

          {location.pathname !== "/mypage" && (
            <div className="mt-12">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MemberMypage;
