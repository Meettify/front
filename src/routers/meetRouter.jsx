// meet router
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const MeetList = lazy(() => import("../pages/meet/MeetList"));
const MeetPost = lazy(() => import("../pages/meet/MeetComm"));

const meetRouter = () => {
    return [
        {
            path: "/meet/list",
            element: <Suspense fallback={Loading}><MeetList /></Suspense>,
        },
        {
            path: "/meet/post",
            element: <Suspense fallback={Loading}><MeetPost /></Suspense>,
        },
    ];
};

export default meetRouter;