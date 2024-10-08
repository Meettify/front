import React from 'react';
import { useNavigate } from 'react-router-dom';
import DetailImage from '../../components/meet/DetailImage'; 
import useMeetStore from '../../stores/useMeetStore';  

const MeetInsert = () => {
  const { image, tags, description, details, setImage, setTags, setDescription, setDetails } = useMeetStore();
  const navigate = useNavigate();

  const handleSave = () => {

    const meetId = Math.floor(Math.random() * 1000); // 임시로 랜덤 meetId 생성 (실제로는 서버에서 받아올 것)

    alert('소모임 정보가 등록되었습니다.');
    navigate(`/meet/detail/${meetId}`);  // meetId를 포함한 경로로 이동
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">소모임 정보 등록</h1>

      <div className="mb-4">
        {image ? <DetailImage image={image} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} 
          className="mt-2"
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <input
          value={tags[0]}
          placeholder="지역"
          onChange={(e) => {
            const newTags = [...tags];
            newTags[0] = e.target.value;
            setTags(newTags);
          }}
          className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
        />
        {tags.slice(1).map((tag, index) => (
          <input
            key={index + 1}
            value={tag}
            placeholder="태그입력"
            onChange={(e) => {
              const newTags = [...tags];
              newTags[index + 1] = e.target.value;
              setTags(newTags);
            }}
            className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
          />
        ))}
        <button
          onClick={() => setTags([...tags, ''])}
          className="bg-blue-500 text-white px-2 py-1 rounded-full"
        >
          태그 추가
        </button>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="3"
        placeholder="모임 이름을 입력하세요"
      />

      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="5"
        placeholder="모임 세부 설명을 입력하세요"
      />

      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center"
      >
        등록하기
      </button>
    </div>
  );
};

export default MeetInsert;
