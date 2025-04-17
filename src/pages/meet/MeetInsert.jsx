import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailImage from "../../components/meet/DetailImage";
import useMeetStore from "../../stores/useMeetStore";
import { postMeetInsert } from "../../api/meetAPI";
import MeetSideMenu from "../../components/meet/MeetSideMenu";

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

const MeetInsert = () => {
  const { image, tags, description, setImage, setTags, setDescription } =
    useMeetStore();
  const navigate = useNavigate();
  const [meetName, setMeetName] = useState("");
  const [maxMembers, setMaxMembers] = useState(30);
  const [imageFile, setImageFile] = useState([]);

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto mt-20 w-full flex gap-6">
        {/* 왼쪽: 이미지 업로드 */}
        <div className="w-1/3 p-4">
          {image ? (
            <DetailImage image={image} />
          ) : (
            <div className="h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
              등록된 이미지가 없습니다.
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length > 0) {
                setImage(URL.createObjectURL(files[0]));
              } else {
                setImage(null);
              }
              setImageFile((prev) => [...prev, ...files]);
            }}
            className="mt-2"
          />
        </div>

        {/* 가운데: 입력 폼 */}
        <div className="w-1/2 p-4 space-y-6 pt-12">
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg p-3 w-full"
            placeholder="최대 인원 수"
          />

          <input
            value={meetName}
            onChange={(e) => setMeetName(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg p-3 w-full"
            placeholder="모임 이름"
          />

          <input
            value={tags[0] || ""}
            onChange={(e) => {
              const newTags = [...tags];
              newTags[0] = e.target.value;
              setTags(newTags);
            }}
            className="bg-white border border-gray-300 rounded-lg p-3 w-full"
            placeholder="지역"
          />

          {/* 카테고리 선택 */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {categoryList.map((cat) => (
                <button
                  key={cat.value}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    tags[1] === cat.value
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => {
                    const newTags = [...tags];
                    newTags[1] = cat.value;
                    setTags(newTags);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 나머지 태그 (선택적) */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(2).map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  #{tag}
                  <button
                    onClick={() => {
                      const newTags = tags.filter((t) => t !== tag);
                      setTags(newTags);
                    }}
                    className="text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg p-4 w-full"
            rows="3"
            placeholder="모임 설명을 입력하세요"
          />
        </div>

        {/* 오른쪽: 추천 상품 사이드바 */}
        <div className="w-1/4 p-4">
          <div className="bg-gray-200 h-full p-4 rounded-xl min-h-[500px]">
            <MeetSideMenu />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white h-12 px-20 rounded-lg text-lg"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MeetInsert;
