import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const MemberInfo = lazy(() => import("../components/member/test/MemberInfo"));

const memberRouter = () => {
    return [
        {
            path: "/memberinfo",
            element: <Suspense fallback={<Loading />}><MemberInfo /></Suspense>,
        },
    ];
};

export default memberRouter;