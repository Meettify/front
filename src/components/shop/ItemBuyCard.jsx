import { useState } from "react";
import RoundedButton from "../../components/button/RoundedButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const checkItemState = (state) => {
  if (state !== "SELL") {
    alert("현재 판매 중인 상품이 아닙니다.");
    return false;
  }
  return true;
};

const checkItemCount = (itemCount, userCount) => {
  return userCount <= itemCount;
};

const ItemBuyCard = ({ itemDetail, itemId }) => {
  const nav = useNavigate();
  const [itemCount, setItemCount] = useState(1);
  const { isAuthenticated, logout, user } = useAuth();

  const handleItemCount = (e) => {
    if (!checkItemCount(itemDetail.itemCount, itemCount)) {
      setItemCount(itemDetail.itemCount);
      e.preventDefault();
      return;
    }
    setItemCount(Number(e.target.value));
  };

  const handleCountPlus = () => {
    if (itemCount < itemDetail.itemCount) {
      setItemCount(itemCount + 1);
    }
  };

  const handleCountMinus = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const handleCartAdd = async (e) => {
    if (!(isAuthenticated && user)) {
      if (
        confirm(
          "로그인해야 이용할 수 있는 기능입니다. 로그인 화면으로 이동할까요?"
        )
      ) {
        nav("/login");
      }
      return;
    }

    if (!checkItemState(itemDetail.itemStatus)) return;

    if (!checkItemCount(itemDetail.itemCount, itemCount)) {
      setItemCount(itemDetail.itemCount);
      return;
    }

    const requestBody = {
      itemId,
      itemCount,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/carts",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (confirm("장바구니에 물품을 추가하였습니다. 장바구니로 이동할까요?")) {
        nav("/cart");
      }
    } catch (err) {
      console.error("장바구니 추가 실패 : ", err);
    }
  };

  const handleOrderNow = () => {
    if (!itemDetail) {
      alert("상품 정보가 없습니다.");
      return;
    }

    const itemPrice = itemDetail.itemPrice;
    const itemQuantity = itemDetail.itemCount;
    const totalPrice = itemPrice * itemCount;

    if (isNaN(totalPrice) || totalPrice <= 0) {
      alert("결제 금액이 계산되지 않았습니다.");
      return;
    }

    nav("/order", {
      state: {
        selectedCartItems: [itemDetail],
        totalPrice,
      },
    });
  };

  const isDisabled = itemDetail.itemStatus !== "SELL";

  return (
    <div
      className={`block ${
        itemDetail.itemStatus === "WAIT" || itemDetail.itemStatus === "SOLD_OUT"
          ? "text-gray-500"
          : ""
      }`}
    >
      <div className="border border-b-0 border-gray-300 p-5">
        <label className="block w-full pb-2 text-sm font-medium">
          상품 선택 수량
        </label>

        <div className="flex items-center">
          <input
            type="number"
            min={1}
            max={itemDetail.itemCount}
            value={itemCount}
            onChange={handleItemCount}
            className="border border-gray-300 px-4 py-2 w-20 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCountPlus}
            className="ml-1 border border-gray-300 px-3 py-2 bg-white text-blue-600 hover:border-blue-500 active:bg-blue-100"
          >
            + 추가
          </button>
          <button
            onClick={handleCountMinus}
            className="ml-1 border border-gray-300 px-3 py-2 bg-white text-red-600 hover:border-red-500 active:bg-red-100"
          >
            - 감소
          </button>
        </div>

        <div className="flex items-center pt-6 text-gray-600 whitespace-nowrap">
          <span className="flex-1">주문 금액</span>
          <span className="text-blue-600 mr-1 text-2xl font-bold">
            {Number(itemCount * itemDetail.itemPrice).toLocaleString()} 원
          </span>
        </div>
      </div>

      <div className="flex">
        <RoundedButton
          onClick={handleCartAdd}
          className="flex-1 min-w-[120px] min-h-[48px] border border-gray-300 text-base rounded-none"
        >
          장바구니
        </RoundedButton>
        <RoundedButton
          onClick={handleOrderNow}
          className={`flex-[2] min-h-[48px] text-white text-base rounded-none ${
            isDisabled
              ? "bg-gray-300 border border-gray-300 cursor-not-allowed"
              : "bg-blue-600 border border-blue-600 hover:bg-blue-700"
          }`}
          disabled={isDisabled}
        >
          {itemDetail.itemStatus === "WAIT"
            ? "상품 준비 중"
            : itemDetail.itemStatus === "SOLD_OUT"
            ? "품절"
            : "주문하기"}
        </RoundedButton>
      </div>
    </div>
  );
};

export default ItemBuyCard;
