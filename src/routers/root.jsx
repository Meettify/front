import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import shopRouter from "./shopRouter";
import meetRouter from "./meetRouter";
import memberRouter from "./memberRouter";
import commRouter from "./commRouter";
import adminRouter from "./adminRouter";

const Loading = () => <div>Page Loading...</div>;

const Home = lazy(() => import("../pages/HomePage"));
const Main = lazy(() => import("../pages/main/MainPage"));
const Comm = lazy(() => import("../pages/comm/CommPage"));
const Meet = lazy(() => import("../pages/meet/MeetPage"));
const Shop = lazy(() => import("../pages/shop/ShopPage"));
const Support = lazy(() => import("../pages/support/SupportPage"));
const Search = lazy(() => import("../pages/search/SearchPage"));
const Chat = lazy(() => import("../pages/chat/Chat"));
const Admin = lazy(() => import("../pages/admin/AdminPage"));
const Signup = lazy(() => import("../pages/member/signup/SignupPage"));
const SignupSuccess = lazy(() =>
  import("../pages/member/signup/SignupSuccessPage")
);
const Cart = lazy(() => import("../pages/cart/CartPage"));
const Order = lazy(() => import("../pages/order/OrderPage"));
const Order2 = lazy(() => import("../pages/order/OrderPage2"));
const Success = lazy(() => import("../pages/order/SuccessPage"));
const Fail = lazy(() => import("../pages/order/FailPage"));
const Contact = lazy(() => import("../pages/support/ContactPage"));
const MyQuestion = lazy(() => import("../pages/Question/MyQuestionsPage"));
const Notice = lazy(() => import("../pages/admin/NoticePage"));
const NoticeAdd = lazy(() => import("../pages/admin/NoticeAdd"));
const NoticeDetail = lazy(() => import("../pages/admin/NoticeDetailPage"));
const Checkout = lazy(() => import("../pages/payment/CheckoutPage"));
const QuestionDetail = lazy(() => import("../pages/Question/QuestionDetail"));

const root = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <>
          <BasicLayout />
        </>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "main",
          element: (
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          ),
        },
        {
          path: "comm",
          element: (
            <Suspense fallback={<Loading />}>
              <Comm />
            </Suspense>
          ),
        },
        {
          path: "meet",
          element: (
            <Suspense fallback={<Loading />}>
              <Meet />
            </Suspense>
          ),
        },
        {
          path: "shop",
          element: (
            <Suspense fallback={<Loading />}>
              <Shop />
            </Suspense>
          ),
        },
        {
          path: "support",
          element: (
            <Suspense fallback={<Loading />}>
              <Support />
            </Suspense>
          ),
        },
        {
          path: "search",
          element: (
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          ),
        },
        {
          path: "chat",
          element: (
            <Suspense fallback={<Loading />}>
              <Chat />
            </Suspense>
          ),
        },
        {
          path: "admin",
          element: (
            <Suspense fallback={<Loading />}>
              <Admin />
            </Suspense>
          ),
          children: adminRouter(),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "order",
          element: (
            <Suspense fallback={<Loading />}>
              <Order2 />
            </Suspense>
          ),
        },
        {
          path: "success",
          element: (
            <Suspense fallback={<Loading />}>
              <Success />
            </Suspense>
          ),
        },
        {
          path: "fail",
          element: (
            <Suspense fallback={<Loading />}>
              <Fail />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "/my-questions",
          element: (
            <Suspense fallback={<Loading />}>
              <MyQuestion />
            </Suspense>
          ),
        },
        {
          path: "question/:questionId",
          element: (
            <Suspense fallback={<Loading />}>
              <QuestionDetail />
            </Suspense>
          ),
        },
        {
          path: "notice",
          element: (
            <Suspense fallback={<Loading />}>
              <Notice />
            </Suspense>
          ),
        },
        {
          path: "notice/noticeAdd",
          element: (
            <Suspense fallback={<Loading />}>
              <NoticeAdd />
            </Suspense>
          ),
        },
        {
          path: "notice/:noticeId",
          element: (
            <Suspense fallback={<Loading />}>
              <NoticeDetail />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<Loading />}>
              <Checkout />
            </Suspense>
          ),
        },
        ...shopRouter(),
        ...meetRouter(),
        ...memberRouter(),
        ...commRouter(),
      ],
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<Loading />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "signupsuccess",
      element: (
        <Suspense fallback={<Loading />}>
          <SignupSuccess />
        </Suspense>
      ),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // v7에서의 상대 경로 처리 방식 활성화
    },
  }
);

export default root;
