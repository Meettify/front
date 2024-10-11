import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ItemList = lazy(() => import("../pages/admin/AdminItemList"));
const ItemDetail = lazy(() => import("../pages/admin/AdminItemDetail"));
const ItemAdd = lazy(() => import("../pages/admin/AdminItemAdd"));

const adminRouter = () => {
    return [
        {
            path: "itemlist",
            element: <Suspense fallback={<Loading />}><ItemList /></Suspense>,
        },
        {
            path: "itemdetail",
            element: <Suspense fallback={<Loading />}><ItemDetail /></Suspense>,
        },
        {
            path: "itemadd",
            element: <Suspense fallback={<Loading />}><ItemAdd /></Suspense>,
        },

    ];
};

export default adminRouter;