import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMeetStore from "../../stores/useMeetStore";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import { updateMeet, getMeetingDetail } from "../../api/meetAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const categoryList = [
  { label: "스포츠", value: "SPORTS" },
  { label: "여행", value: "TRAVEL" },
  { label: "음악", value: "MUSIC" },
  { label: "예술", value: "ART" },
  { label: "독서", value: "READING" },
  { label: "건강", value: "HEALTH" },
  { label: "패션/뷰티", value: "FASHION_BEAUTY" },
  { label: "반려동물", value: "PET_LOVERS" },
];

const MeetUpdate = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const { tags, description, setTags, setDescription } = useMeetStore();

  const [meetName, setMeetName] = useState("");
  const [meetMaximum, setMeetMaximum] = useState(30);
  const [category, setCategory] = useState("");
  const [regionPopupOpen, setRegionPopupOpen] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const fetched = await getMeetingDetail(meetId);
        const dto = fetched.meetDetailDTO;
        setMeetName(dto.meetName);
        setMeetMaximum(dto.meetMaximum);
        setDescription(dto.meetDescription);
        setTags([dto.meetLocation, dto.category]);
        setCategory(dto.category);
        setImagePreviews(dto.images || []);
        setExistingImages(dto.images || []);
      } catch (err) {
        console.error("모임 정보 오류:", err);
      }
    };
    fetchMeetingDetail();
  }, [meetId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const removed = updatedPreviews.splice(index, 1)[0];
    setImagePreviews(updatedPreviews);

    if (typeof removed === "string") {
      setExistingImages((prev) => prev.filter((url) => url !== removed));
    } else {
      setNewImages((prev) => {
        const newArr = [...prev];
        newArr.splice(index - existingImages.length, 1);
        return newArr;
      });
    }
  };

  const handleSave = async () => {
    const dto = {
      meetName,
      meetDescription: description,
      meetMaximum: parseInt(meetMaximum, 10),
      meetLocation: tags[0] || "서울",
      category: category || "SPORTS",
      existingImages,
    };

    try {
      const res = await updateMeet(meetId, dto, newImages);
      if (res.status === 200 || res.status === 201) {
        alert("수정 완료");
        navigate(`/meet/detail/${meetId}`);
      } else {
        alert("수정 실패: " + res.status);
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  const handleRegionSelect = (region) => {
    setTags([region, category]);
    setRegionPopupOpen(false);
  };

  const handleCategorySelect = (value) => {
    setCategory(value);
    setTags([tags[0], value]);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">소모임 수정</h1>

          <label className="flex justify-center items-center w-full h-48 border-2 border-dashed border-blue-300 rounded-lg mb-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-blue-600 font-semibold">
              이미지를 클릭 또는 드래그하여 업로드
            </span>
          </label>

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
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleDeleteImage(i)}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mb-6">
            <label className="block font-semibold mb-2">모임 이름</label>
            <input
              type="text"
              value={meetName}
              onChange={(e) => setMeetName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">지역 선택</label>
            <button
              onClick={() => setRegionPopupOpen(!regionPopupOpen)}
              className="px-4 py-2 rounded-full border bg-blue-100 text-blue-800"
            >
              {tags[0] || "활동 지역 선택"}
            </button>
            {regionPopupOpen && (
              <div className="grid grid-cols-4 gap-2 mt-4 bg-white border p-4 rounded-xl shadow">
                {koreaRegions.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRegionSelect(r)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      tags[0] === r
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2 text-center">
              카테고리
            </label>
            <div className="flex flex-wrap justify-center gap-2">
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
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">모임 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="모임 설명을 입력하세요"
            />
          </div>

          <div className="mb-8">
            <label className="block font-semibold mb-2">모임 최대 인원</label>
            <input
              type="number"
              value={meetMaximum}
              onChange={(e) => setMeetMaximum(e.target.value)}
              min={2}
              max={30}
              className="px-4 py-2 rounded-xl border border-gray-300 w-28 text-center"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(`/meet/detail/${meetId}`)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl shadow"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow"
            >
              저장
            </button>
          </div>
        </div>

        <div className="col-span-1">
          <div className="sticky top-24">
            <MeetSideMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetUpdate;
