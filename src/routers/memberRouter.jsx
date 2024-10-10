import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const MemberMypage = lazy(() => import("../pages/member/mypage/MemberMypage"));
const MeetHistory = lazy(() => import("../pages/member/mypage/MeetHistory"));
const OrderHistory = lazy(() => import("../pages/member/mypage/OrderHistory"));
const MyPosts = lazy(() => import("../pages/member/mypage/MyPosts"));
const MyComments = lazy(() => import("../pages/member/mypage/MyComments"));
const EditInfo = lazy(() => import("../pages/member/mypage/EditInfo"));
const DeleteAccount = lazy(() => import("../pages/member/mypage/DeleteAccount"));

const memberRouter = () => {
    return [
        {
            path: "/mypage",
            element: <Suspense fallback={<Loading />}><MemberMypage /></Suspense>,
            children: [
                { path: "meet-history", element: <Suspense fallback={<Loading />}><MeetHistory /></Suspense> },
                { path: "order-history", element: <Suspense fallback={<Loading />}><OrderHistory /></Suspense> },
                { path: "my-posts", element: <Suspense fallback={<Loading />}><MyPosts /></Suspense> },
                { path: "my-comments", element: <Suspense fallback={<Loading />}><MyComments /></Suspense> },
                { path: "edit-info", element: <Suspense fallback={<Loading />}><EditInfo /></Suspense> },
                { path: "delete-account", element: <Suspense fallback={<Loading />}><DeleteAccount /></Suspense> },
            ]
        }
    ];
};

export default memberRouter;