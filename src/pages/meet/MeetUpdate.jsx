// 개선된 MeetUpdate 컴포넌트 (MeetInsert와 UI/UX 일치)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RoundedButton from "../../components/button/RoundedButton";
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

const MeetUpdate = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();

  const {
    image,
    tags,
    description,
    details,
    setImage,
    setTags,
    setDescription,
    setDetails,
  } = useMeetStore();

  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [meetMaximum, setMeetMaximum] = useState(30);
  const [regionPopupOpen, setRegionPopupOpen] = useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const fetched = await getMeetingDetail(meetId);
        const dto = fetched.meetDetailDTO;
        console.log("meetMaximum from API:", dto.meetMaximum);

        if (dto) {
          setImage(dto.images[0] || null);
          setImagePreviews(dto.images || []);
          setTags([dto.meetName, dto.meetLocation]);
          setDescription(dto.meetDescription);
          setDetails(fetched.details || "");
          setMeetMaximum(dto.meetMaximum);
          setCategory(dto.category);
          setOriginalData(dto);
        }
      } catch (err) {
        console.error("모임 정보 오류:", err);
      }
    };
    fetchMeetingDetail();
  }, [meetId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImages(files);
    setImagePreviews(previews);
  };

  const handleSave = async () => {
    const dto = {
      meetName: tags[0],
      meetDescription: description,
      meetMaximum: parseInt(meetMaximum, 10),
      meetLocation: tags[1],
      category,
      exigistingImages: image ? [image] : [],
    };
    try {
      const res = await updateMeet(meetId, dto, newImages);
      if (res.status === 200 || res.status === 201) {
        alert("수정 완료");
        navigate(`/meet/detail/${meetId}`);
      } else alert("수정 실패: " + res.status);
    } catch (err) {
      console.error(err);
      alert("서버 오류");
    }
  };

  const handleRegionSelect = (region) => {
    setTags([tags[0], region]);
    setRegionPopupOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto flex gap-6 justify-center">
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            소모임 정보 수정
          </h1>

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
                <img
                  src={url}
                  alt={`image-${i}`}
                  className="w-full aspect-video object-cover rounded-lg"
                />
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
            value={tags[0]}
            onChange={(e) => setTags([e.target.value, tags[1]])}
            className="bg-white border border-gray-300 rounded px-4 py-2 w-full mb-4"
          />

          <label className="block font-semibold mb-1">지역 선택</label>
          <button
            onClick={() => setRegionPopupOpen((prev) => !prev)}
            className="mb-2 px-4 py-1 rounded-full border bg-blue-100 text-blue-800"
          >
            {tags[1] || "활동 지역 선택"}
          </button>
          {regionPopupOpen && (
            <div className="grid grid-cols-4 gap-2 mb-4 bg-white border p-4 rounded shadow">
              {koreaRegions.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    tags[1] === r
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

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
            value={meetMaximum}
            onChange={(e) => setMeetMaximum(e.target.value)}
            min={2}
            max={30}
            className="bg-white border border-gray-300 rounded px-2 py-1 w-24 mb-8 text-center"
          />

          <div className="flex justify-center gap-x-4">
            <button
              onClick={handleSave}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-2 rounded"
            >
              수정하기
            </button>
            <button
              onClick={() => navigate(`/meet/detail/${meetId}`)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-2 rounded"
            >
              취소하기
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

export default MeetUpdate;
