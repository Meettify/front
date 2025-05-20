// ✅ CartPage.jsx — 무한 스크롤 & Tailwind UI 통합본
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
  const [cartId, setCartId] = useState(0);
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const observer = useRef();

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const res = await axios.get("/api/v1/carts/id", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        setCartId(res.data);
      } catch (err) {
        console.error("카트 ID 실패", err);
      }
    };
    if (user) fetchCartId();
  }, [user]);

  const fetchCartList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/api/v1/carts/${cartId}?page=${page}&size=6`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setCartItemList((prev) => [...prev, ...res.data.cartItems]);
      setHasMore(!res.data.last); // 마지막 페이지 여부
    } catch (err) {
      console.error("장바구니 조회 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cartId > 0) fetchCartList();
  }, [cartId, page]);

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

  const areAllTrue = () =>
    Array.from(cartCheckList.values()).every((v) => v === true);
  const toggleAll = () => {
    const newMap = new Map();
    cartItemList.forEach((item) => newMap.set(item.item.itemId, !areAllTrue()));
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
    const deletePromises = selected.map((id) =>
      axios.delete(`/api/v1/carts/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
    );
    await Promise.all(deletePromises);
    setCartItemList((prev) =>
      prev.filter((item) => !selected.includes(item.item.itemId))
    );
  };

  useEffect(() => {
    const total = Array.from(cartItemPrices.values()).reduce(
      (acc, v) => acc + v,
      0
    );
    setCartTotalPrice(total);
  }, [cartItemPrices]);

  const handleOrder = () => {
    const selectedIds = getSelectedItemIds();
    const selectedItems = cartItemList.filter((item) =>
      selectedIds.includes(item.item.itemId)
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
      <div className="min-h-screen pt-24 px-4 pb-12 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">🛒 장바구니</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
          <div className="border bg-white p-4 rounded-xl shadow max-h-[calc(100vh-300px)] overflow-y-auto">
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

            {cartItemList.length === 0 && !loading && (
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
            )}

            {!isLoading && cartItemList.length > 0 && (
              <div className="space-y-4">
                {cartItemList.map((cartItem, index) => {
                  const isLast = index === cartItemList.length - 1;
                  return (
                    <div
                      ref={isLast ? lastItemRef : null}
                      key={cartItem.item.itemId}
                    >
                      <CartItem
                        itemId={cartItem.item.itemId}
                        itemCount={cartItem.itemCount}
                        cartId={cartId}
                      />
                    </div>
                  );
                })}

                {/* 마지막 항목 다음에 스피너 */}
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 주문 요약 */}
          <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
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
