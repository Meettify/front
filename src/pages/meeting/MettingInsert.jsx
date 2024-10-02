import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailImage from '../../components/meeting/DetailImage';  // DetailImage 컴포넌트
import DetailTag from '../../components/meeting/DetailTag';  // DetailTag 컴포넌트

const MeetingInsert = () => {
  // 상태 관리
  const [image, setImage] = useState('');  // 처음엔 빈 값
  const [tags, setTags] = useState([]);  // 태그도 처음엔 빈 배열
  const [description, setDescription] = useState('');  // 모임 설명도 빈 값
  const [details, setDetails] = useState('');  // 모임 세부 설명도 빈 값

  const navigate = useNavigate();

  const handleSave = () => {
    // 소모임 등록 로직 (현재는 알림 후 페이지 이동)
    alert('소모임 정보가 등록되었습니다.');
    navigate('/meeting/detail');  // 등록 후 소모임 상세 페이지로 이동
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">소모임 정보 등록</h1>

      {/* 이미지 등록 섹션 */}
      <div className="mb-4">
        {image ? <DetailImage image={image} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} 
          className="mt-2"
        />
      </div>

      {/* 태그 등록 섹션 */}
      <div className="flex space-x-2 mb-4">
        {tags.map((tag, index) => (
          <input
            key={index}
            value={tag}
            onChange={(e) => {
              const newTags = [...tags];
              newTags[index] = e.target.value;
              setTags(newTags);
            }}
            className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
          />
        ))}
        {/* 태그 추가 버튼 */}
        <button
          onClick={() => setTags([...tags, ''])}
          className="bg-blue-500 text-white px-2 py-1 rounded-full"
        >
          태그 추가
        </button>
      </div>

      {/* 모임 이름 등록 섹션 */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="3"
        placeholder="모임 이름을 입력하세요"
      />

      {/* 세부 설명 등록 섹션 */}
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="5"
        placeholder="모임 세부 설명을 입력하세요"
      />

      {/* 저장 버튼 */}
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center"
      >
        등록하기
      </button>
    </div>
  );
};

export default MeetingInsert;
