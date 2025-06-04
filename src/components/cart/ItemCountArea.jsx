import React, { useContext, useEffect, useState } from "react";
import { ItemTotalPriceContext } from "./CartItem";
import axios from "axios";

const ItemCountArea = React.memo(
  ({ itemMaxCount = 10, itemCount = 1, itemPrice = 0, cartItemId, itemId }) => {
    const { setItemTotalPrice } = useContext(ItemTotalPriceContext);
    const [currentItemCount, setCurrentItemCount] = useState(itemCount);
    const cartId = localStorage.getItem("cartId");

    // ✅ 초기값이 바뀌었을 때만 반영
    useEffect(() => {
      if (itemCount !== currentItemCount) {
        setCurrentItemCount(itemCount);
      }
    }, [itemCount]);

    const updateItemTotalPrice = (count, price) => {
      setItemTotalPrice(count * price);
    };

    const setItemCountDB = async (count) => {
      try {
        await axios.put(
          `${import.meta.env.VITE_APP_API_BASE_URL}/carts/${cartId}`,
          [{ itemId, itemCount: count }],
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error("장바구니 수량 변경 실패:", err);
      }
    };

    const handleInputChange = (e) => {
      const value = Number(e.target.value);
      if (!value || isNaN(value)) return;
      const clamped = Math.max(1, Math.min(itemMaxCount, value));
      setCurrentItemCount(clamped);
    };

    const increaseCount = () => {
      if (currentItemCount < itemMaxCount)
        setCurrentItemCount((prev) => prev + 1);
    };

    const decreaseCount = () => {
      if (currentItemCount > 1) setCurrentItemCount((prev) => prev - 1);
    };

    useEffect(() => {
      updateItemTotalPrice(currentItemCount, itemPrice);
      setItemCountDB(currentItemCount);
    }, [currentItemCount, itemPrice]);

    return (
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={decreaseCount}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          -
        </button>
        <input
          type="number"
          min={1}
          max={itemMaxCount}
          value={currentItemCount}
          onChange={handleInputChange}
          className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
        />
        <button
          onClick={increaseCount}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          +
        </button>
      </div>
    );
  }
);

export default ItemCountArea;
