import React from "react";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import useCartStore from "../../stores/useCartStore";

const ShopCard = ({ itemId, title, description, price, imageUrl, onClick }) => {
  const { cartItems, addToCart, removeFromCart, isFavorite } = useCartStore();

  const handleStarClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const cartItem = cartItems.find((item) => item.itemId === itemId);

    if (isFavorite(itemId)) {
      try {
        if (cartItem) {
          await removeFromCart(cartItem.cartItemId);
          console.log(`아이템 ${itemId} 제거 완료`);
        } else {
          console.error(`장바구니에 ${itemId}가 없습니다.`);
        }
      } catch (error) {
        console.error("장바구니에서 상품 제거 중 오류 발생:", error);
      }
    } else {
      try {
        await addToCart(itemId, 1);
        console.log(`아이템 ${itemId} 추가 완료`);
      } catch (error) {
        console.error("장바구니 추가 중 오류 발생:", error);
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-5 transition duration-300 hover:bg-gray-100"
    >
      <div className="relative h-[200px] bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-110"
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-2xl text-yellow-400 bg-white rounded-full p-1 shadow"
          onClick={handleStarClick}
        >
          {isFavorite(itemId) ? <TiStarFullOutline /> : <CiStar />}
        </button>
      </div>

      <div className="pt-4 text-left">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="mt-2 font-bold text-indigo-600 text-lg">{price}</p>
      </div>
    </div>
  );
};

export default ShopCard;
