import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";
import { useAuth } from "../../hooks/useAuth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RoundedButton from "../../components/button/RoundedButton";
import RoundedCancelButton from "../../components/button/RoundedCancelButton";

const ItemModify = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const { itemDetail, fetchItemDetail, updateItem } = useAdminStore();
  const hasInitializedImages = useRef(false);

  const [formData, setFormData] = useState({
    itemName: "",
    price: 0,
    itemCount: 0,
    category: "",
    itemStatus: "SELL",
  });
  const [itemDetailText, setItemDetailText] = useState("");
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (isAdmin) fetchItemDetail(itemId);
  }, [itemId, isAdmin]);

  useEffect(() => {
    if (itemDetail && !hasInitializedImages.current) {
      setFormData({
        itemName: itemDetail.itemName,
        price: itemDetail.itemPrice,
        itemCount: itemDetail.itemCount,
        category: itemDetail.itemCategory,
        itemStatus: itemDetail.itemStatus || "SELL",
      });
      setItemDetailText(itemDetail.itemDetails || "");

      if (Array.isArray(itemDetail.images)) {
        setExistingImages(itemDetail.images);
        hasInitializedImages.current = true;
      }
    }
  }, [itemDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) 남겨야 할 기존 이미지 ID들만 추출
    const remainImgId = existingImages
      .map((img) => img.itemImgId ?? img.id ?? null)
      .filter((id) => id !== null);

    // 2) JSON 형태로 보낼 DTO
    const itemData = {
      ...formData,
      itemDetail: itemDetailText,
      remainImgId,
    };

    // 3) FormData를 만들어서 JSON Blob + 새로 추가된 files만 append
    const formDataToSend = new FormData();
    formDataToSend.append(
      "item",
      new Blob([JSON.stringify(itemData)], { type: "application/json" })
    );
    files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    // (디버깅용) 실제 FormData 내용 확인
    for (const [key, value] of formDataToSend.entries()) {
      console.log("FormData >>", key, value);
    }

    // 4) store에 등록된 updateItem 액션 호출
    try {
      await updateItem(itemId, formDataToSend);
      alert("상품이 성공적으로 수정되었습니다.");
      navigate("/shop");
    } catch (error) {
      console.error("상품 수정 실패:", error);
      alert("상품 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => navigate("/shop");

  if (!isAdmin)
    return (
      <p className="text-center text-red-500 mt-10">접근 권한이 없습니다.</p>
    );
  if (!itemDetail) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <input
        type="text"
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        placeholder="상품명을 입력하세요"
        className="w-full p-3 mb-4 border rounded"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="가격"
        className="w-full p-3 mb-4 border rounded"
      />
      <input
        type="number"
        name="itemCount"
        value={formData.itemCount}
        onChange={handleChange}
        placeholder="재고 수량"
        className="w-full p-3 mb-4 border rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded"
      >
        <option value="">카테고리 선택</option>
        <option value="SPORTS">스포츠</option>
        <option value="TRAVEL">여행</option>
        <option value="MUSIC">음악</option>
        <option value="ART">예술</option>
        <option value="READING">독서</option>
        <option value="HEALTH">건강</option>
        <option value="FASHION_BEAUTY">패션/뷰티</option>
        <option value="PET_LOVERS">반려동물</option>
      </select>

      {/* 🔄 사용자 직접 업로드 */}
      <div className="mb-4">
        <label className="font-semibold">이미지 업로드</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      <div className="mb-6 border rounded overflow-hidden bg-white">
        <ReactQuill
          value={itemDetailText}
          onChange={setItemDetailText}
          modules={{
            toolbar: [
              ["bold", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              // Quill 자체의 image 버튼은 제거하거나, 별도 파일 입력과 충돌이 생기므로 제외
            ],
          }}
          style={{ height: "300px" }}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        {existingImages.map((img, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden shadow"
          >
            <img
              src={img.uploadImgUrl}
              alt="기존 이미지"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              onClick={() => handleRemoveImage(index)}
            >
              X
            </button>
          </div>
        ))}
        {files.map((file, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden shadow"
          >
            <img
              src={URL.createObjectURL(file)}
              alt="신규 이미지"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              onClick={() => handleRemoveNewFile(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <RoundedButton onClick={handleSubmit}>수정하기</RoundedButton>
        <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
      </div>
    </div>
  );
};

export default ItemModify;
