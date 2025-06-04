import React, { useState } from "react";
import { createItem } from "../../api/shopAPI";
import { useAuth } from "../../hooks/useAuth"; // 또는 사용자 인증 관련 훅
import { useNavigate } from "react-router-dom";

const ItemAdd = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [itemCount, setItemCount] = useState(1);
  const [itemDetails, setItemDetails] = useState("");
  const [itemCategory, setItemCategory] = useState("SPORTS");
  const [files, setFiles] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdmin)
    return (
      <p className="text-center mt-10 text-red-500">접근 권한이 없습니다.</p>
    );

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log("선택된 파일:", selectedFiles);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // ⛔ 중복 방지
    setIsSubmitting(true); // 🔒 잠금

    const fileArray = Array.isArray(files) ? files : [];

    try {
      const response = await createItem(
        itemName,
        parseFloat(itemPrice),
        itemDetails,
        parseInt(itemCount, 10),
        itemCategory,
        fileArray
      );
      console.log("상품 등록 성공:", response);
      alert("상품이 등록되었습니다.");
      setItemName("");
      setItemPrice("");
      setItemDetails("");
      setItemCount(1);
      setItemCategory("SPORTS");
      setFiles([]);
      navigate("/shop");
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false); // 🔓 다시 활성화
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <div>
        <h2 className="text-2xl font-bold text-center">상품 등록 신청하기</h2>
        <h6>등록한 상품 확인 후, 상품 서비스를 이용하실 수 있습니다.</h6>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-10">
        {[
          {
            label: "상품명",
            value: itemName,
            onChange: setItemName,
            type: "text",
          },
          {
            label: "가격",
            value: itemPrice,
            onChange: setItemPrice,
            type: "number",
          },
          {
            label: "상세 설명",
            value: itemDetails,
            onChange: setItemDetails,
            type: "textarea",
          },
          {
            label: "수량",
            value: itemCount,
            onChange: setItemCount,
            type: "number",
          },
        ].map(({ label, value, onChange, type }, index) => (
          <div key={index} className="flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
            ) : (
              <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">
            카테고리
          </label>
          <select
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="SPORTS">스포츠</option>
            <option value="TRAVEL">여행</option>
            <option value="MUSIC">음악</option>
            <option value="ART">예술</option>
            <option value="READING">독서</option>
            <option value="HEALTH">건강</option>
            <option value="FASHION_BEAUTY">패션/뷰티</option>
            <option value="PET_LOVERS">반려동물</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">
            파일 업로드
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-1/2 ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemAdd;
