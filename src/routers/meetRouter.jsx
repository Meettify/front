import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;

const MeetList = lazy(() => import("../pages/meet/MeetList"));
const MeetDetail = lazy(() => import("../pages/meet/MeetDetail"));
const MeetUpdate = lazy(() => import("../pages/meet/MeetUpdate"));
const MeetInsert = lazy(() => import("../pages/meet/MeetInsert"));
const MeetAccept = lazy(() => import("../components/meet/MeetAccept")); // 이미 존재하는 컴포넌트
const MeetBoard = lazy(() => import("../pages/meet/MeetBoard"));
const MeetBoardDetail = lazy(() => import("../pages/meet/MeetBoardDetail"));
const MeetBoardAdd = lazy(() => import("../pages/meet/MeetBoardAdd"));
const MeetBoardEdit = lazy(() => import("../pages/meet/MeetBoardEdit"));
const ChatRoom = lazy(() => import("../pages/chat/Chat"));

const meetRouter = () => {
  return [
    {
      path: "/meet/list",
      element: (
        <Suspense fallback={<Loading />}>
          <MeetList />
        </Suspense>
      ),
    },
    {
      path: "/meetBoards/list/:meetId", // 모임 게시판 목록 조회
      element: (
        <Suspense fallback={<Loading />}>
          <MeetBoard />
        </Suspense>
      ),
    },
    {
      path: "/meetBoards/:meetBoardId", // 모임 게시판 상세보기
      element: (
        <Suspense fallback={<Loading />}>
          <MeetBoardDetail />
        </Suspense>
      ),
    },
    {
      path: "/meetBoards/:meetBoardId/edit", // 모임 게시판 수정
      element: (
        <Suspense fallback={<Loading />}>
          <MeetBoardEdit />
        </Suspense>
      ),
    },
    {
      path: "/meetBoards", // 모임 게시판 글작성
      element: (
        <Suspense fallback={<Loading />}>
          <MeetBoardAdd />
        </Suspense>
      ),
    },
    {
      path: "/meet/detail/:meetId", // 경로 통일
      element: (
        <Suspense fallback={<Loading />}>
          <MeetDetail />
        </Suspense>
      ),
    },
    {
      path: "/meet/update/:meetId",
      element: (
        <Suspense fallback={<Loading />}>
          <MeetUpdate />
        </Suspense>
      ),
    },
    {
      path: "/meet/insert",
      element: (
        <Suspense fallback={<Loading />}>
          <MeetInsert />
        </Suspense>
      ),
    },
    {
      path: "/meets/:meetId/members", // 수정된 경로
      element: (
        <Suspense fallback={<Loading />}>
          <MeetAccept />
        </Suspense>
      ), // 회원 관리 및 가입 승인 페이지
    },
    {
      path: "/meet/list/:categoryTitle",
      element: (
        <Suspense fallback={<Loading />}>
          <MeetList />
        </Suspense>
      ),
    },
    {
      path: "/chat/room/:roomId",
      element: (
        <Suspense fallback={<Loading />}>
          <ChatRoom />
        </Suspense>
      ),
    },
  ];
};

export default meetRouter;
