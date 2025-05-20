// ✅ CartItem.jsx — Tailwind 기반 무한 스크롤 대응 버전
import React, { useEffect, useState, createContext, useContext } from "react";
import { getItemDetail } from "../../api/shopAPI";
import { CartTotalPriceContext } from "../../pages/cart/CartPage";
import categories from "../../stores/shopCategory";
import ItemCountArea from "./ItemCountArea";

export const ItemTotalPriceContext = createContext();

const CartItem = React.memo(({ itemId, itemCount, cartId }) => {
  const { changeItemPrice, cartCheckList, changeCheckList } = useContext(
    CartTotalPriceContext
  );
  const [itemDetail, setItemDetail] = useState(null);
  const [category, setCategory] = useState(null);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItemDetail(itemId);
      setItemDetail(item);
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    if (itemDetail) {
      const foundCategory = categories.find(
        (cat) => cat.id.toUpperCase() === itemDetail.itemCategory.toUpperCase()
      );
      setCategory(foundCategory);
    }
  }, [itemDetail]);

  useEffect(() => {
    if (cartCheckList.get(itemId)) {
      changeItemPrice(itemId, itemTotalPrice);
    } else {
      changeItemPrice(itemId, 0);
    }
  }, [itemId, itemTotalPrice, cartCheckList]);

  useEffect(() => {
    changeCheckList(itemId, true);
  }, [itemId]);

  const handleCheck = () => {
    changeCheckList(itemId, !cartCheckList.get(itemId));
  };

  return (
    <ItemTotalPriceContext.Provider
      value={{ itemTotalPrice, setItemTotalPrice }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4 border rounded-xl shadow-sm bg-white">
        {/* 체크박스 + 이미지 */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <input
            type="checkbox"
            checked={cartCheckList.get(itemId)}
            onChange={handleCheck}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded"
          />
          <img
            src={itemDetail?.images[0]}
            alt="상품 이미지"
            className="w-24 h-24 rounded-lg object-cover border"
          />
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2 text-xs">
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
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {itemDetail?.itemName}
            </h2>
            <p className="text-sm text-gray-600">
              가격: {Number(itemDetail?.itemPrice).toLocaleString()}원
            </p>
            <p className="text-sm text-gray-400">
              남은 수량: {itemDetail?.itemCount}
            </p>
          </div>
          <ItemCountArea
            itemMaxCount={itemDetail?.itemCount}
            itemCount={itemCount}
            itemPrice={itemDetail?.itemPrice}
            cartId={cartId}
            itemId={itemDetail?.itemId}
          />
        </div>

        {/* 금액 */}
        <div className="text-lg font-bold text-blue-600 min-w-[100px] text-right lg:text-left">
          {itemTotalPrice.toLocaleString()}원
        </div>
      </div>
    </ItemTotalPriceContext.Provider>
  );
});

export default CartItem;
