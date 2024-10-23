import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ItemAdd = lazy(() => import("../pages/admin/ItemAdd"));
const ItemDetail = lazy(() => import("../pages/admin/ItemDetail"));
const ItemList = lazy(() => import("../pages/admin/ItemList"));
const ItemModify = lazy(() => import("../pages/admin/ItemModify"));
const MemList = lazy(() => import("../pages/admin/MemList"));


const adminRouter = () => {
    return [
        {
            path: "itemAdd",
            element: <Suspense fallback={<Loading />}><ItemAdd /></Suspense>,
        },
        {
            path: "itemDetail",
            element: <Suspense fallback={<Loading />}><ItemDetail /></Suspense>,
        },
        {
            path: "itemList",
            element: <Suspense fallback={<Loading />}><ItemList /></Suspense>,
        },
        {
            path: "itemModify",
            element: <Suspense fallback={<Loading />}><ItemModify /></Suspense>,
        },
        {
            path: "memList",
            element: <Suspense fallback={<Loading />}><MemList /></Suspense>,
        },
    ];
};

export default adminRouter;