import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const CommAdd = lazy(() => import("../pages/comm/CommAdd"));
const CommDetail = lazy(() => import("../pages/comm/CommDetail"));


const commRouter = () => {
    return [
        {
            path: "comm/add",
            element: <Suspense fallback={<Loading />}><CommAdd /></Suspense>,
        },
        {
            path: "comm/detail/:id",
            element: <Suspense fallback={<Loading />}><CommDetail /></Suspense>,
        },
    ];
};

export default commRouter;