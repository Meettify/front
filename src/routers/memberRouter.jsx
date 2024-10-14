import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const MemberMypage = lazy(() => import("../pages/member/mypage/MemberMypage"));
const MeetJoinList = lazy(() => import("../components/member/mypage/MeetJoinList"));
const OrderHistory = lazy(() => import("../pages/member/mypage/OrderHistory"));
const MyPosts = lazy(() => import("../pages/member/mypage/MyPosts"));
const MyComments = lazy(() => import("../pages/member/mypage/MyComments"));
const DeleteMember = lazy(() => import("../components/member/mypage/DeleteMemberForm"));
const EditProfile = lazy(() => import("../components/member/mypage/EditProfileForm"));

const memberRouter = () => {
    return [
        {
            path: "/mypage",
            element: <Suspense fallback={<Loading />}><MemberMypage /></Suspense>,
            children: [
                { path: "meetJoinList", element: <Suspense fallback={<Loading />}><MeetJoinList /></Suspense> },
                { path: "order-history", element: <Suspense fallback={<Loading />}><OrderHistory /></Suspense> },
                { path: "my-posts", element: <Suspense fallback={<Loading />}><MyPosts /></Suspense> },
                { path: "my-comments", element: <Suspense fallback={<Loading />}><MyComments /></Suspense> },
                { path: "editProfile", element: <Suspense fallback={<Loading />}><EditProfile /></Suspense> },
                { path: "deleteMember", element: <Suspense fallback={<Loading />}><DeleteMember /></Suspense> },
            ]
        }
    ];
};

export default memberRouter;