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
    try {
      if (isFavorite(itemId)) {
        if (cartItem) await removeFromCart(cartItem.cartItemId);
      } else {
        await addToCart(itemId, 1);
      }
    } catch (error) {
      console.error("즐겨찾기 처리 중 오류:", error);
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-md transition duration-300 flex flex-col h-full"
    >
      <div className="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
          onError={(e) => (e.target.style.display = "none")}
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-2xl text-yellow-400 bg-white rounded-full p-1 shadow"
          onClick={handleStarClick}
        >
          {isFavorite(itemId) ? <TiStarFullOutline /> : <CiStar />}
        </button>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {title}
        </h3>
        <p
          className="text-sm text-gray-500 line-clamp-2 mt-1"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></p>
        <p className="mt-3 font-bold text-indigo-600 text-base">{price}</p>
      </div>
    </div>
  );
};

export default ShopCard;
