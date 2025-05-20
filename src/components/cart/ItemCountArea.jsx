// ItemCountArea.jsx
import React, { useContext, useEffect, useState } from "react";
import { ItemTotalPriceContext } from "./CartItem";
import axios from "axios";

const ItemCountArea = React.memo(
  ({ itemMaxCount, itemCount, itemPrice, cartId, itemId }) => {
    const { setItemTotalPrice } = useContext(ItemTotalPriceContext);
    const [currentItemCount, setCurrentItemCount] = useState(itemCount);

    const setItemCountDB = (count) => {
      if (cartId === 0) return;
      try {
        axios.put(
          `http://localhost:8080/api/v1/carts/${cartId}`,
          [
            {
              itemId,
              itemCount: count,
            },
          ],
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

    const updateItemTotalPrice = (count, price) => {
      setItemTotalPrice(count * price);
    };

    const handleInputChange = (e) => {
      const value = Number(e.target.value);
      if (value > itemMaxCount) setCurrentItemCount(itemMaxCount);
      else if (value < 1) setCurrentItemCount(1);
      else setCurrentItemCount(value);
    };

    const increaseCount = () => {
      if (currentItemCount < itemMaxCount)
        setCurrentItemCount((prev) => prev + 1);
    };

    const decreaseCount = () => {
      if (currentItemCount > 1) setCurrentItemCount((prev) => prev - 1);
    };

    useEffect(() => {
      setCurrentItemCount(itemCount);
    }, [itemCount]);

    useEffect(() => {
      setItemCountDB(currentItemCount);
    }, [currentItemCount]);

    useEffect(() => {
      updateItemTotalPrice(currentItemCount, itemPrice);
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
