// meet router
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ShopList = lazy(() => import("../pages/shop/ShopList"));
const MeetDetail = lazy(() => import("../pages/meet/MeetDetail"));
const MeetUpdate = lazy(() => import("../pages/meet/MeetUpdate"));
const MeetInsert = lazy(() => import("../pages/meet/MeetInsert"));
const MeetAccept = lazy(() => import("../pages/meet/MeetAccept"));

const meetRouter = () => {
    return [
        {
            path: "/shop/list",
            element: <Suspense fallback={Loading}><ShopList /></Suspense>,
        },
        {
            path: "/meet/detail",
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