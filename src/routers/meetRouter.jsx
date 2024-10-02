// meet router
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ShopList = lazy(() => import("../pages/shop/ShopList"));

const meetRouter = () => {
    return [
        {
            path: "/shop/list",
            element: <Suspense fallback={Loading}><ShopList /></Suspense>,
        },
    ];
};

export default meetRouter;