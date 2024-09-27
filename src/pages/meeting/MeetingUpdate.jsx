import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';  // Header 컴포넌트 import
import emotionImage from '../../assets/emotion1.png';  // 이미지 파일 경로

const MeetingUpdate = () => {
  // 상태 관리
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  const navigate = useNavigate();

  // useEffect로 초기 상태 설정 (백엔드 연결 전까지 고정값 사용)
  useEffect(() => {
    // 현재는 고정된 값 사용
    setImage(emotionImage);
    setTags(['운동', '서울', '맴버80']);
    setDescription('종로 정겨운 러닝 모임');
    setDetails('종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.');
  }, []);

  const handleSave = () => {
    // 저장 로직 (현재는 알림 후 페이지 이동)
    alert('소모임 정보가 저장되었습니다.');
    navigate('/meetingdetail');  // 저장 후 소모임 상세 페이지로 이동
  };

  return (
    <div className="container mx-auto p-4">
      <Header />  {/* Header 컴포넌트 사용 */}
      <h1 className="text-xl font-bold mb-4">소모임 정보 수정</h1>

      {/* 이미지 수정 섹션 */}
      <div className="mb-4">
        <img src={image} alt="Emotion" className="w-full h-80 rounded-lg mb-4 object-contain" />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} 
          className="mt-2"
        />
      </div>

      {/* 태그 수정 섹션 */}
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
      </div>

      {/* 설명 수정 섹션 */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="3"
      />

      {/* 세부 설명 수정 섹션 */}
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
        rows="5"
      />

      {/* 저장 버튼 */}
      <button 
        onClick={handleSave} 
        className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center"
      >
        저장하기
      </button>
    </div>
  );
};

export default MeetingUpdate;
