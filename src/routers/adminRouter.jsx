import { Suspense, lazy } from "react";
import NoticePage from "../pages/admin/NoticePage";

const Loading = () => <div>Loading..</div>;
const ItemConfirm = lazy(() => import("../pages/admin/ItemConfirm"));
const ItemDetail = lazy(() => import("../pages/admin/ItemDetail"));
const ItemList = lazy(() => import("../pages/admin/ItemList"));
const ItemModify = lazy(() => import("../pages/admin/ItemModify"));
const ItemAdd = lazy(() => import("../pages/admin/ItemAdd"));
const MemList = lazy(() => import("../pages/admin/MemList"));
const QuestionsList = lazy(() => import("../pages/admin/QuestionsList"));
const QuestionDetail = lazy(() => import("../pages/Question/QuestionDetail"));

const adminRouter = () => {
    return [
        {
            path: "itemConfirm",
            element: <Suspense fallback={<Loading />}><ItemConfirm /></Suspense>,
        },
        {
            path: "itemDetail/:itemId",
            element: <Suspense fallback={<div>Loading...</div>}><ItemDetail /></Suspense>,
        },
        {
            path: "itemList",
            element: <Suspense fallback={<Loading />}><ItemList /></Suspense>,
        },
        {
            path: "itemModify/:itemId",
            element: <Suspense fallback={<Loading />}><ItemModify /></Suspense>,
        },
        {
            path: "itemAdd",
            element: <Suspense fallback={<Loading />}><ItemAdd /></Suspense>,
        },
        {
            path: "memList",
            element: <Suspense fallback={<Loading />}><MemList /></Suspense>,
        },
        {
            path: "questionsList",
            element: <Suspense fallback={<Loading />}><QuestionsList /></Suspense>,
        },
        {
            path: "questions/:questionId",
            element: <Suspense fallback={<Loading />}><QuestionDetail /></Suspense>,
        },
    ];
};

export default adminRouter;