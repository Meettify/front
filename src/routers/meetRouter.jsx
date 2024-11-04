import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;

const MeetList = lazy(() => import("../pages/meet/MeetList"));
const MeetDetail = lazy(() => import("../pages/meet/MeetDetail"));
const MeetUpdate = lazy(() => import("../pages/meet/MeetUpdate"));
const MeetInsert = lazy(() => import("../pages/meet/MeetInsert"));
const MeetAccept = lazy(() => import("../components/meet/MeetAccept")); // 이미 존재하는 컴포넌트
const MeetPost = lazy(() => import("../pages/meet/MeetComm"));

const meetRouter = () => {
  return [
    {
      path: "/meet/list",
      element: <Suspense fallback={<Loading />}><MeetList /></Suspense>,
    },
    {
      path: "/meet/post",
      element: <Suspense fallback={<Loading />}><MeetPost /></Suspense>,
    },
    {
      path: "/meet/detail/:meetId",  // 경로 통일
      element: <Suspense fallback={<Loading />}><MeetDetail /></Suspense>,
    },
    {
      path: "/meet/update/:meetId",
      element: <Suspense fallback={<Loading />}><MeetUpdate /></Suspense>,
    },
    {
      path: "/meet/insert",
      element: <Suspense fallback={<Loading />}><MeetInsert /></Suspense>,
    },
    {
      path: "/meets/:meetId/members",  // 수정된 경로
      element: <Suspense fallback={<Loading />}><MeetAccept /></Suspense>,  // 회원 관리 및 가입 승인 페이지
    },
    {
      path: "/meet/list/:categoryTitle",
      element: <Suspense fallback={<Loading />}><MeetList /></Suspense>,
    },
  ];
};

export default meetRouter;
