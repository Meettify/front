import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const EditorPage = lazy(() => import("../pages/comm/CommEditor"));
const DetailPage = lazy(() => import("../pages/comm/CommDetail"));


const commRouter = () => {
    return [
        {
            path: "comm/editor",
            element: <Suspense fallback={<Loading />}><EditorPage /></Suspense>,
        },
        {
            path: "comm/detail/:id",
            element: <Suspense fallback={<Loading />}><DetailPage /></Suspense>,
        },
    ];
};

export default commRouter;