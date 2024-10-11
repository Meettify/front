import { Suspense, lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from "../layouts/BasicLayout";
import shopRouter from "./shopRouter";
import meetRouter from "./meetRouter";
import memberRouter from "./memberRouter";
import commRouter from "./commRouter";
import adminRouter from "./adminRouter";

const Loading = () => <div>Page Loading...</div>;

const Home = lazy(() => import("../pages/HomePage"))
const Main = lazy(() => import("../pages/main/MainPage"))
const Comm = lazy(() => import("../pages/comm/CommPage"))
const Meet = lazy(() => import("../pages/meet/MeetPage"))
const Shop = lazy(() => import("../pages/shop/ShopPage"))
const Support = lazy(() => import("../pages/support/SupportPage"))
const Search = lazy(() => import("../pages/search/SearchPage"))
const Chat = lazy(() => import("../pages/chat/ChatPage"))
const Admin = lazy(() => import("../pages/admin/AdminPage"))
const Signup = lazy(() => import("../pages/member/signup/SignupPage"))
const SignupSuccess = lazy(() => import("../pages/member/signup/SignupSuccessPage"))
// axios test
const MyInfo = lazy(() => import("../pages/member/info/MyInfoPage"))

const root = createBrowserRouter([
    {
        path: "/",
        element: <BasicLayout />,
        children: [
            {
                path: "",
                element: <Suspense fallback={<Loading />}><Home /></Suspense>
            },
            {
                path: "main",
                element: <Suspense fallback={<Loading />}><Main /></Suspense>
            },
            {
                path: "comm",
                element: <Suspense fallback={<Loading />}><Comm /></Suspense>
            },
            {
                path: "meet",
                element: <Suspense fallback={<Loading />}><Meet /></Suspense>
            },
            {
                path: "shop",
                element: <Suspense fallback={<Loading />}><Shop /></Suspense>
            },
            {
                path: "support",
                element: <Suspense fallback={<Loading />}><Support /></Suspense>
            },
            {
                path: "search",
                element: <Suspense fallback={<Loading />}><Search /></Suspense>
            },
            {
                path: "chat",
                element: <Suspense fallback={<Loading />}><Chat /></Suspense>
            },
            {
                path: "myinfo",
                element: <Suspense fallback={<Loading />}><MyInfo /></Suspense>,
            },
            {
                path: "admin",
                element: <Suspense fallback={<Loading />}><Admin /></Suspense>,
                children: adminRouter(),
            },
            ...shopRouter(),
            ...meetRouter(),
            ...memberRouter(),
            ...commRouter(),
        ]
    },
    {
        path: "signup",
        element: <Suspense fallback={<Loading />}><Signup /></Suspense>,
    },
    {
        path: "signupsuccess",
        element: <Suspense fallback={<Loading />}><SignupSuccess /></Suspense>,
    },
]);

export default root;