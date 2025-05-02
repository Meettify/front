import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const ItemConfirm = lazy(() => import("../pages/admin/ItemConfirm"));
const ItemDetail = lazy(() => import("../pages/admin/ItemDetail"));
const ItemList = lazy(() => import("../pages/admin/ItemList"));
const ItemModify = lazy(() => import("../pages/admin/ItemModify"));
const ItemAdd = lazy(() => import("../pages/admin/ItemAdd"));
const MemList = lazy(() => import("../pages/admin/MemList"));
const QuestionsList = lazy(() => import("../pages/admin/QuestionsList"));
const QuestionDetail = lazy(() => import("../pages/Question/QuestionDetail"));
const NoticePage = lazy(() => import("../pages/admin/NoticePage"));
const NoticeDetailPage = lazy(() => import("../pages/admin/NoticeDetailPage"));
const NoticeAdd = lazy(() => import("../pages/admin/NoticeAdd"));

const adminRouter = () => {
  return [
    {
      path: "", // ✅ /admin 경로 기본 페이지
      element: (
        <Suspense fallback={<Loading />}>
          <AdminPage />
        </Suspense>
      ),
    },
    {
      path: "itemConfirm",
      element: (
        <Suspense fallback={<Loading />}>
          <ItemConfirm />
        </Suspense>
      ),
    },
    {
      path: "itemDetail/:itemId",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ItemDetail />
        </Suspense>
      ),
    },
    {
      path: "itemList",
      element: (
        <Suspense fallback={<Loading />}>
          <ItemList />
        </Suspense>
      ),
    },
    {
      path: "itemModify/:itemId",
      element: (
        <Suspense fallback={<Loading />}>
          <ItemModify />
        </Suspense>
      ),
    },
    {
      path: "itemAdd",
      element: (
        <Suspense fallback={<Loading />}>
          <ItemAdd />
        </Suspense>
      ),
    },
    {
      path: "memList",
      element: (
        <Suspense fallback={<Loading />}>
          <MemList />
        </Suspense>
      ),
    },
    {
      path: "questionsList",
      element: (
        <Suspense fallback={<Loading />}>
          <QuestionsList />
        </Suspense>
      ),
    },
    {
      path: "questions/:questionId",
      element: (
        <Suspense fallback={<Loading />}>
          <QuestionDetail />
        </Suspense>
      ),
    },
    {
      path: "notice", // ✅ 상대 경로로 바꿔야 /admin/notice로 동작함
      element: (
        <Suspense fallback={<Loading />}>
          <NoticePage />
        </Suspense>
      ),
      children: [
        {
          path: "add",
          element: (
            <Suspense fallback={<Loading />}>
              <NoticeAdd />
            </Suspense>
          ),
        },
        {
          path: ":noticeId",
          element: (
            <Suspense fallback={<Loading />}>
              <NoticeDetailPage />
            </Suspense>
          ),
        },
      ],
    },
  ];
};

export default adminRouter;
