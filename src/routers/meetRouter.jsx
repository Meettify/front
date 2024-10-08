// meet router
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;

const ShopList = lazy(() => import("../pages/shop/ShopList"));
const MeetDetail = lazy(() => import("../pages/meet/MeetDetail"));
const MeetUpdate = lazy(() => import("../pages/meet/MeetUpdate"));
const MeetInsert = lazy(() => import("../pages/meet/MeetInsert"));
const MeetAccept = lazy(() => import("../pages/meet/MeetAccept"));
const MeetList = lazy(() => import("../pages/meet/MeetList"));
const MeetComm = lazy(() => import("../pages/meet/MeetComm"));


const meetRouter = () => {
    return [
        {
            path: "/meet/list",
            element: <Suspense fallback={Loading}><MeetList /></Suspense>,
        },
        {
            path: "/meet/post",
            element: <Suspense fallback={Loading}><MeetComm /></Suspense>,
        },
        {
            path: "/meet/detail/:meetId",
            element: <Suspense fallback={Loading}><MeetDetail /></Suspense>,
        },
        {
            path: "/meet/update",
            element: <Suspense fallback={Loading}><MeetUpdate /></Suspense>,
        },
        {
            path: "/meet/insert",
            element: <Suspense fallback={Loading}><MeetInsert /></Suspense>,
        },
        {
            path: "/meet/accept",
            element: <Suspense fallback={Loading}><MeetAccept /></Suspense>,
        },
    ];
};

export default meetRouter;