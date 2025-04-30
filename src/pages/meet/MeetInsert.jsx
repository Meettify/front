// 최종 개선된 MeetInsert 컴포넌트 (중앙 정렬, 이미지 삭제/정렬, 인원 입력칸 최소화 포함)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postMeetInsert } from "../../api/meetAPI";
import useMeetStore from "../../stores/useMeetStore";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useNavigation from "../../hooks/useNavigation"; // 있다면

const categoryList = [
  { label: "스포츠", value: "SPORTS" },
  { label: "캠핑", value: "TRAVEL" },
  { label: "음악", value: "MUSIC" },
  { label: "예술", value: "ART" },
  { label: "독서", value: "READING" },
  { label: "건강", value: "HEALTH" },
  { label: "패션/뷰티", value: "FASHION_BEAUTY" },
  { label: "반려동물", value: "PET_LOVERS" },
];

const koreaRegions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const MeetInsert = () => {
  const { setImage, setTags, setDescription, tags, description } =
    useMeetStore();
  const [region, setRegion] = useState(tags[0] || "");
  const [category, setCategory] = useState(tags[1] || "");
  const [imageFile, setImageFile] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [meetName, setMeetName] = useState("");
  const [maxMembers, setMaxMembers] = useState(30);
  const [regionPopupOpen, setRegionPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setImage(null);
    setTags(["", ""]); // [지역, 카테고리]
    setDescription("");
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFile((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
    if (previews.length > 0) setImage(previews[0]);
  };

  const handleDeleteImage = (index) => {
    const newFiles = [...imageFile];
    const newPreviews = [...imagePreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageFile(newFiles);
    setImagePreviews(newPreviews);
    setImage(newPreviews[0] || null);
  };

  const handleMoveImage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= imageFile.length) return;
    const newFiles = [...imageFile];
    const newPreviews = [...imagePreviews];
    [newFiles[fromIndex], newFiles[toIndex]] = [
      newFiles[toIndex],
      newFiles[fromIndex],
    ];
    [newPreviews[fromIndex], newPreviews[toIndex]] = [
      newPreviews[toIndex],
      newPreviews[fromIndex],
    ];
    setImageFile(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
    setTags([region, value]); // 지역 먼저
  };

  const handleRegionSelect = (region) => {
    setRegion(region);
    setTags([region, category]); // 지역 먼저
    setRegionPopupOpen(false);
  };

  const handleSave = async () => {
    if (imageFile.length === 0) {
      alert("이미지를 선택하세요.");
      return;
    }
    const meetData = {
      meetName,
      meetDescription: description,
      meetMaximum: parseInt(maxMembers, 10),
      meetLocation: tags[0] || "지역미입력",
      category: tags[1] || "SPORTS",
    };
    const formData = new FormData();
    formData.append(
      "meet",
      new Blob([JSON.stringify(meetData)], { type: "application/json" })
    );
    imageFile.forEach((image) => formData.append("images", image));

    try {
      const response = await postMeetInsert(formData);
      if (response.status === 200 || response.status === 201) {
        alert("성공적으로 등록되었습니다.");
        navigate(`/meet/detail/${response.data.meetId}`);
      } else {
        alert("등록 실패: " + response.status);
      }
    } catch (error) {
      console.error("등록 중 오류:", error);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto flex gap-6 justify-center">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">소모임 등록</h1>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="mb-6 rounded-lg"
          >
            {imagePreviews.map((url, i) => (
              <SwiperSlide key={i}>
                <div className="relative">
                  <img
                    src={url}
                    alt={`image-${i}`}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleDeleteImage(i)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => handleMoveImage(i, i - 1)}
                      className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => handleMoveImage(i, i + 1)}
                      className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <label className="flex justify-center mb-6">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="fileInput"
            />
            <span className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              이미지 업로드
            </span>
          </label>

          <label className="block font-semibold mb-1">모임 이름</label>
          <input
            type="text"
            value={meetName}
            onChange={(e) => setMeetName(e.target.value)}
            className="bg-white border border-gray-300 rounded px-4 py-2 w-full mb-4"
          />

          <label className="block font-semibold mb-1">지역 선택</label>
          <button
            onClick={() => setRegionPopupOpen((prev) => !prev)}
            className="mb-2 px-4 py-1 rounded-full border bg-blue-100 text-blue-800"
          >
            {region || "활동 지역 선택"}
          </button>
          {regionPopupOpen && (
            <div className="grid grid-cols-4 gap-2 mb-4 bg-white border p-4 rounded shadow">
              {koreaRegions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    tags[0] === region
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}

          <label className="block font-semibold mb-1">카테고리</label>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {categoryList.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategorySelect(cat.value)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  tags[1] === cat.value
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <label className="block font-semibold mb-1">모임 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
            className="bg-white border border-gray-300 rounded px-4 py-2 w-full mb-4 resize-none"
            placeholder="모임 설명을 입력하세요"
          />

          <label className="block font-semibold mb-1">모임 최대 인원</label>
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            min={2}
            max={30}
            className="bg-white border border-gray-300 rounded px-2 py-1 w-24 mb-8 text-center"
          />

          <div className="flex justify-center gap-x-4">
            <button
              onClick={() => navigate("/meet")} // ✅ 경로를 MeetCategory 페이지로
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-2 rounded"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded"
            >
              저장
            </button>
          </div>
        </div>

        <div className="w-1/3 pr-4">
          <div className="sticky top-24">
            <MeetSideMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetInsert;
