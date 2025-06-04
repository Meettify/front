import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemDetail, deleteItem } from "../../api/shopAPI";
import { BsChevronLeft } from "react-icons/bs";
import RoundedButton from "../../components/button/RoundedButton";
import useShopStore from "../../stores/useShopStore";
import ItemBuyCard from "../../components/shop/ItemBuyCard";
import categories from "../../stores/shopCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useAuth } from "../../hooks/useAuth"; // 관리자 확인용 (예시 훅)

const ShopDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useShopStore();
  const [category, setCategory] = useState(null);
  const { user } = useAuth(); // 관리자 여부 확인
  const isAdmin = user?.role === "ADMIN"; // 권한 구조에 맞게 수정

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await getItemDetail(itemId);
        setItemDetail(item);
      } catch (error) {
        setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    const foundCategory = categories.find(
      (cat) => cat.id.toUpperCase() === itemDetail?.itemCategory?.toUpperCase()
    );
    setCategory(foundCategory);
  }, [itemDetail]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    try {
      await deleteItem(itemId);
      alert("상품이 삭제되었습니다.");
      navigate("/shop");
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const getCategoryColor = () => {
    const map = {
      SPORTS: "border-[#f48346] text-[#f48346] bg-[#f48346]/10",
      TRAVEL: "border-[#00aab2] text-[#00aab2] bg-[#00aab2]/10",
      MUSIC: "border-[#e2ab00] text-[#e2ab00] bg-[#e2ab00]/10",
      ART: "border-[#f162a7] text-[#f162a7] bg-[#f162a7]/10",
      READING: "border-[#bc7e61] text-[#bc7e61] bg-[#bc7e61]/10",
      HEALTH: "border-[#f14f4f] text-[#f14f4f] bg-[#f14f4f]/10",
      FASHION_BEAUTY: "border-[#b92aff] text-[#b92aff] bg-[#b92aff]/10",
      PET_LOVERS: "border-[#72c204] text-[#72c204] bg-[#72c204]/10",
    };
    return (
      map[itemDetail?.itemCategory] ||
      "border-[#007BFF] text-[#007BFF] bg-[#007BFF]/10"
    );
  };

  const getStatusStyle = () => {
    if (itemDetail?.itemStatus === "WAIT") return "bg-black text-white";
    if (itemDetail?.itemStatus === "SOLD_OUT")
      return "bg-gray-200 text-gray-600";
    return "bg-blue-100 text-blue-600";
  };

  if (loading) return <p className="text-center py-10">로딩 중...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!itemDetail)
    return <p className="text-center py-10">상품 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-10">
      <RoundedButton
        onClick={() => navigate("/shop")}
        className="flex items-center gap-1 px-2 py-3 mb-4 text-black/70"
      >
        <BsChevronLeft />
        <span>목록으로 돌아가기</span>
      </RoundedButton>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 이미지 Swiper */}
        <div className="w-full md:min-w-[436px] md:w-[436px] h-[300px] md:h-[436px] bg-gray-100 rounded overflow-hidden shadow">
          {itemDetail.images?.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {itemDetail.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.uploadImgUrl || image}
                    alt={`상품 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-500 text-center p-4">이미지가 없습니다.</p>
          )}
        </div>

        {/* 상품 정보 */}
        <div
          className={`w-full border-t-4 px-3 py-5 ${
            getCategoryColor().split(" ")[0]
          }`}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <div
              className={`flex items-center gap-2 px-4 h-8 rounded-full text-sm ${getCategoryColor()}`}
            >
              <span className="relative -top-[2px]">{category?.icon()}</span>
              <span>{itemDetail.itemCategory}</span>
            </div>
            <p
              className={`flex items-center px-4 h-8 rounded-full text-sm ${getStatusStyle()}`}
            >
              {itemDetail.itemStatus}
            </p>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {itemDetail.itemName}
          </h1>

          {/* 금액 및 수량 수직 정렬 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <p className="text-2xl md:text-3xl font-bold text-black">
              {Number(itemDetail.itemPrice).toLocaleString()} 원
            </p>
            <p className="text-sm text-gray-500">
              남은수량 {itemDetail.itemCount}
            </p>
          </div>

          <div
            className="text-base md:text-lg text-black/80 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: itemDetail.itemDetails }}
          />

          <ItemBuyCard itemDetail={itemDetail} itemId={itemId} />

          {/* 관리자 버튼 */}
          {isAdmin && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/admin/itemModify/${itemId}`)}
                className="px-4 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
              >
                수정하기
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
