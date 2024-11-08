import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ShopList = lazy(() => import("../pages/shop/ShopList"));
const ShopDetail = lazy(() => import('../pages/shop/ShopDetail'));

const shopRouter = () => {
    return [
        {
            path: "/shop/list",
            element: <Suspense fallback={<Loading />}><ShopList /></Suspense>,
        },
        {
            path: '/shop/detail/:itemId',
            element: <Suspense fallback={<Loading />}><ShopDetail /></Suspense>,
        },
    ];
};

export default shopRouter;