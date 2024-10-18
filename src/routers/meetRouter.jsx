// C:\project3\front\src\router\meetRouter.js
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;

const MeetList = lazy(() => import("../pages/meet/MeetList"));
const MeetDetail = lazy(() => import("../pages/meet/MeetDetail"));
const MeetUpdate = lazy(() => import("../pages/meet/MeetUpdate"));
const MeetInsert = lazy(() => import("../pages/meet/MeetInsert"));
const MeetAccept = lazy(() => import("../pages/meet/MeetAccept"));
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
      path: "/meet/:meetId/accept", 
      element: <Suspense fallback={<Loading />}><MeetAccept /></Suspense>,
    },
    {
      path: "/meet/list/:categoryId",  // 카테고리 ID를 포함한 경로
      element: <Suspense fallback={<Loading />}><MeetList /></Suspense>,
    },
  ];
};

export default meetRouter;
