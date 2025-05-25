import { Suspense, lazy } from "react";

const Loading = () => <div>Loading..</div>;
const ShopAdd = lazy(() => import("../pages/admin/ItemAdd"));
const ShopDetail = lazy(() => import("../pages/shop/ShopDetail"));

const shopRouter = () => {
  return [
    {
      path: "/shop/add",
      element: (
        <Suspense fallback={<Loading />}>
          <ShopAdd />
        </Suspense>
      ),
    },
    {
      path: "/shop/detail/:itemId",
      element: (
        <Suspense fallback={<Loading />}>
          <ShopDetail />
        </Suspense>
      ),
    },
  ];
};

export default shopRouter;
