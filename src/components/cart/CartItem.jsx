import React, { useEffect, useState, createContext, useContext } from "react";
import { getItemDetail } from "../../api/shopAPI";
import { CartTotalPriceContext } from "../../pages/cart/CartPage";
import categories from "../../stores/shopCategory";
import ItemCountArea from "./ItemCountArea";

export const ItemTotalPriceContext = createContext();

const CartItem = React.memo(({ itemId, itemCount = 1, cartItemId }) => {
  const { changeItemPrice, cartCheckList, changeCheckList } = useContext(
    CartTotalPriceContext
  );
  const [itemDetail, setItemDetail] = useState(null);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItemDetail(itemId);
        console.log("상품 상세 : ", item);
        setItemDetail(item);
      } catch (err) {
        console.error("상품 정보를 불러오는데 실패했습니다.", err);
      }
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    changeCheckList(itemId, true);
  }, [itemId]);

  useEffect(() => {
    changeItemPrice(itemId, cartCheckList.get(itemId) ? itemTotalPrice : 0);
  }, [itemId, itemTotalPrice, cartCheckList]);

  const handleCheck = () => {
    changeCheckList(itemId, !cartCheckList.get(itemId));
  };

  return (
    <ItemTotalPriceContext.Provider
      value={{ itemTotalPrice, setItemTotalPrice }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-6 p-4 border rounded-xl shadow-sm bg-white">
          {/* 좌측: 체크박스 + 이미지 */}
          <div className="flex flex-col items-center w-24">
            <input
              type="checkbox"
              checked={cartCheckList.get(itemId) || false}
              onChange={handleCheck}
              className="mb-2 w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
            <img
              src={
                itemDetail?.images?.[0]?.uploadImgUrl ?? "/default-image.png"
              }
              alt="상품 이미지"
              className="w-20 h-20 rounded-lg object-cover border"
              onError={(e) => {
                e.target.src = "/default-image.png";
              }}
            />
          </div>

          {/* 중앙: 상품 정보 */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-base font-semibold text-gray-900">
              {itemDetail?.itemName}
            </div>
            <div className="flex gap-2 text-xs mb-1">
              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                {itemDetail?.itemCategory}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-white ${
                  itemDetail?.itemStatus === "WAIT"
                    ? "bg-gray-700"
                    : itemDetail?.itemStatus === "SOLD_OUT"
                    ? "bg-gray-400"
                    : "bg-green-500"
                }`}
              >
                {itemDetail?.itemStatus}
              </span>
            </div>
            <div className="flex items-center justify-start">
              <ItemCountArea
                itemMaxCount={itemDetail?.itemCount ?? 1}
                itemCount={itemCount ?? 1}
                itemPrice={itemDetail?.itemPrice ?? 0}
                cartItemId={cartItemId}
                itemId={itemDetail?.itemId ?? 0}
              />
            </div>
          </div>

          {/* 우측: 가격 */}
          <div className="text-lg font-bold text-blue-600 min-w-[80px] text-right">
            {itemTotalPrice.toLocaleString()}원
          </div>
        </div>
      </div>
    </ItemTotalPriceContext.Provider>
  );
});

export default CartItem;
