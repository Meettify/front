import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ItemConfirm = lazy(() => import("../pages/admin/ItemConfirm"));
const ItemDetail = lazy(() => import("../pages/admin/ItemDetail"));
const ItemList = lazy(() => import("../pages/admin/ItemList"));
const ItemModify = lazy(() => import("../pages/admin/ItemModify"));
const MemList = lazy(() => import("../pages/admin/MemList"));


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
            path: "memList",
            element: <Suspense fallback={<Loading />}><MemList /></Suspense>,
        },
    ];
};

export default adminRouter;