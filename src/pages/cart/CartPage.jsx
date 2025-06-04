import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import axios from "axios";

export const CartTotalPriceContext = createContext();

const CartPage = () => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [cartItemPrices, setCartItemPrices] = useState(new Map());
  const [cartCheckList, setCartCheckList] = useState(new Map());
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [cartId, setCartId] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { user } = useAuth();
  const navigate = useNavigate();
  const observer = useRef();

  useEffect(() => {
    const savedCartId = localStorage.getItem("cartId");
    if (savedCartId) {
      setCartId(Number(savedCartId));
    }
  }, []);

  const fetchCartList = async () => {
    if (!hasMore || isLoading) return;
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}/carts/cart-items?page=${page}&size=6`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("장바구니 : ", res.data);

      const newItems = res.data.cartItems || [];
      setCartItemList((prev) => {
        const existingIds = new Set(prev.map((item) => item?.cartItemId));
        return [
          ...prev,
          ...newItems.filter((item) => !existingIds.has(item?.cartItemId)),
        ];
      });

      if (newItems.length < 6 || res.data.isLastPage) setHasMore(false);
    } catch (err) {
      console.error("장바구니 조회 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && cartId > 0) fetchCartList();
  }, [page, user, cartId]);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const changeItemPrice = (key, value) => {
    setCartItemPrices((prev) => new Map(prev).set(key, value));
  };

  const changeCheckList = (key, value) => {
    setCartCheckList((prev) => new Map(prev).set(key, value));
  };

  const areAllTrue = () => [...cartCheckList.values()].every(Boolean);

  const toggleAll = () => {
    const newMap = new Map();
    cartItemList.forEach((item) => newMap.set(item?.cartItemId, !areAllTrue()));
    setCartCheckList(newMap);
  };

  const handleAllCheck = () => {
    setIsChecked(!isChecked);
    toggleAll();
  };

  useEffect(() => {
    setIsChecked(areAllTrue());
  }, [cartCheckList]);

  const getSelectedItemIds = () =>
    [...cartCheckList.entries()].filter(([, v]) => v).map(([k]) => k);

  const handleDeleteSelected = async () => {
    const selected = getSelectedItemIds();
    console.log("선택된 cartItemIds: ", selected); // ← 이게 cartItemId 여야 함

    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(`${API_BASE_URL}/carts/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          })
        )
      );
      setCartItemList((prev) =>
        prev.filter((item) => !selected.includes(item.cartItemId))
      );
    } catch (err) {
      console.error("선택 삭제 실패", err);
    }
  };

  useEffect(() => {
    const total = [...cartItemPrices.values()].reduce((acc, v) => acc + v, 0);
    setCartTotalPrice(total);
  }, [cartItemPrices]);

  const handleOrder = () => {
    const selectedIds = getSelectedItemIds();
    const selectedItems = cartItemList.filter((item) =>
      selectedIds.includes(item.cartItemId)
    );
    const orderPayload = {
      cartItems: selectedItems.map((item) => ({
        ...item,
        itemTotalPrice: item.itemCount * item.item.itemPrice,
      })),
      cartTotalPrice,
    };
    sessionStorage.setItem("orderItems", JSON.stringify(orderPayload));
    navigate("/order");
  };

  return (
    <CartTotalPriceContext.Provider
      value={{
        cartItemPrices,
        changeItemPrice,
        changeCheckList,
        cartCheckList,
      }}
    >
      <div className="min-h-screen pt-24 px-2 md:px-4 pb-12 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">🛒 장바구니</h1>
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          <div className="flex-1 max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleAllCheck}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                전체 선택
              </label>
              <button
                onClick={handleDeleteSelected}
                className="text-red-600 text-sm bg-red-100 px-3 py-1 rounded hover:bg-red-200"
              >
                선택 삭제
              </button>
            </div>

            {cartItemList.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="text-5xl mb-2">🛒</div>
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  장바구니가 비어 있습니다
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  원하는 상품을 담아보세요.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                  쇼핑하러 가기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItemList.map((cartItem, index) => {
                  const isLast = index === cartItemList.length - 1;
                  return (
                    <div
                      ref={isLast ? lastItemRef : null}
                      key={cartItem?.cartItemId}
                    >
                      <CartItem
                        itemId={cartItem.item.itemId}
                        itemCount={cartItem.itemCount ?? 1}
                        cartItemId={cartItem.cartItemId}
                      />
                    </div>
                  );
                })}
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4">주문 요약</h2>
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-600">총 주문 금액</span>
              <span className="text-base font-semibold text-blue-600">
                {cartTotalPrice.toLocaleString()}원
              </span>
            </div>
            <button
              onClick={handleOrder}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    </CartTotalPriceContext.Provider>
  );
};

export default CartPage;
