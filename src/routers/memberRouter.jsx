import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const MemberMypage = lazy(() => import("../pages/member/mypage/MemberMypage"));
const MeetJoinList = lazy(() => import("../components/member/mypage/MeetJoinList"));
const OrderList = lazy(() => import("../components/member/mypage/OrderList"));
const MyPostList = lazy(() => import("../components/member/mypage/MyPostList"));
const MyInquiryList = lazy(() => import("../components/member/mypage/MyInquiryList"));
const DeleteMember = lazy(() => import("../components/member/mypage/DeleteMemberForm"));
const EditProfile = lazy(() => import("../components/member/mypage/EditProfileForm"));

const memberRouter = () => {
    return [
        {
            path: "/mypage",
            element: <Suspense fallback={<Loading />}><MemberMypage /></Suspense>,
            children: [
                { path: "meetJoinList", element: <Suspense fallback={<Loading />}><MeetJoinList /></Suspense> },
                { path: "orderList", element: <Suspense fallback={<Loading />}><OrderList /></Suspense> },
                { path: "postList", element: <Suspense fallback={<Loading />}><MyPostList /></Suspense> },
                { path: "inquiryList", element: <Suspense fallback={<Loading />}><MyInquiryList /></Suspense> },
                { path: "editProfile", element: <Suspense fallback={<Loading />}><EditProfile /></Suspense> },
                { path: "deleteMember", element: <Suspense fallback={<Loading />}><DeleteMember /></Suspense> },
            ]
        }
    ];
};

export default memberRouter;