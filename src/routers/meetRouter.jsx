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
      path: "/meet/list/:categoryId",
      element: <Suspense fallback={<Loading />}><MeetList /></Suspense>,
    },
    {
      path: "/meet/post",
      element: <Suspense fallback={<Loading />}><MeetPost /></Suspense>,
    },
    {
      path: "/meet/detail/:meetId",  // MeetDetail로 meetId 전달
      element: <Suspense fallback={<Loading />}><MeetDetail /></Suspense>,
    },
    {
      path: "/meet/update/:meetId",  // MeetUpdate로 meetId 전달
      element: <Suspense fallback={<Loading />}><MeetUpdate /></Suspense>,
    },
    {
      path: "/meet/insert",
      element: <Suspense fallback={<Loading />}><MeetInsert /></Suspense>,
    },
    {
      path: "/meet/accept",
      element: <Suspense fallback={<Loading />}><MeetAccept /></Suspense>,
    },
  ];
};

export default meetRouter;
