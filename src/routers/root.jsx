import { Suspense, lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from "../layouts/BasicLayout";
import shopRouter from "./shopRouter";
import meetRouter from "./meetRouter";

const Loading = () => <div>Page Loading...</div>;

const Home = lazy(() => import("../pages/HomePage"))
const Main = lazy(() => import("../pages/main/MainPage"))
const Comm = lazy(() => import("../pages/comm/CommPage"))
const Meet = lazy(() => import("../pages/meet/MeetPage"))
const Shop = lazy(() => import("../pages/shop/ShopPage"))
const Support = lazy(() => import("../pages/support/SupportPage"))
const Chat = lazy(() => import("../pages/chat/ChatPage"))

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
                path: "chat",
                element: <Suspense fallback={<Loading />}><Chat /></Suspense>
            },

            ...shopRouter(),
            ...meetRouter(),
        ]
    }
]);

export default root;