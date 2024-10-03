// meet router
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ShopList = lazy(() => import("../pages/shop/ShopList"));
const MeetingDetail = lazy(() => import("../pages/meet/MeetingDetail"));

const meetRouter = () => {
    return [
        {
            path: "/shop/list",
            element: <Suspense fallback={Loading}><ShopList /></Suspense>,
        },
        {
            path: "/meet/detail",
            element: <Suspense fallback={Loading}><MeetingDetail /></Suspense>,
        },
    ];
};

export default meetRouter;