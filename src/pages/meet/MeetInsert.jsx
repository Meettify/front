import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailImage from '../../components/meet/DetailImage'; 
import useMeetStore from '../../stores/useMeetStore';  
import { postMeetInsert } from '../../api/meetAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';  // MeetSideMenu 임포트

const MeetInsert = () => {
  const { image, tags, description, setImage, setTags, setDescription } = useMeetStore();
  const navigate = useNavigate();
  const [meetName, setMeetName] = useState('');
  const [maxMembers, setMaxMembers] = useState(30);
  const [imageFile, setImageFile] = useState([]);

 // MeetInsert.js
const handleSave = async () => {
  if (imageFile.length === 0) {
    alert('이미지를 선택하세요.');
    return;
  }

  const formData = new FormData();

  const meetData = {
    meetName: meetName,
    meetDescription: description,
    meetMaximum: maxMembers,
    meetLocation: tags[0],  
    category: tags[1] || 'SPORTS',
  };

  formData.append('meet', new Blob([JSON.stringify(meetData)], { type: 'application/json' }));
  if (imageFile && imageFile.length > 0) {
    imageFile.forEach(image => {
      formData.append('images', image);
    });
  }

  try {
    const response = await postMeetInsert(formData);
    
    // 응답에서 새로운 소모임의 ID를 가져와서 상세 페이지로 이동
    if (response.status === 200 || response.status === 201) {
      alert('성공적으로 등록되었습니다.');
      const newMeetId = response.data.meetId; // 새로 생성된 소모임의 ID
      navigate(`/meet/detail/${newMeetId}`);  // 생성된 소모임의 상세 페이지로 이동
    } else {
      alert('등록에 실패하였습니다. 상태 코드: ' + response.status);
    }
  } catch (error) {
    console.error('Error during the request:', error);
    alert('서버 오류');
  }
};

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보 등록</h1>

          <div className="mb-4">
            {image ? <DetailImage image={image} /> : <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">이미지 없음</div>}
            <input 
              type="file" 
              accept="image/*" 
              multiple // 여러 파일 선택을 허용
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  setImage(URL.createObjectURL(files[0])); // 첫 번째 파일 미리보기
                } else {
                  setImage(null); // 파일이 없을 경우 이미지 상태를 null로 설정
                }
                setImageFile(prevFiles => [...prevFiles, ...files]);
              }}
              className="mt-2"
            />
          </div>

          <input
            value={meetName}
            onChange={(e) => setMeetName(e.target.value)}
            className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4"
            placeholder='모임 이름을 입력하세요.'
          />

          <div className="flex space-x-2 mb-4">
            <input
              value={tags[0] || '' }
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
                value={tag || ''}
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
            placeholder="모임 설명을 입력하세요"
          />

          <input
            type='number'
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
            placeholder="최대 인원"
          />

          <button 
            onClick={handleSave} 
            className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center"
          >
            등록하기
          </button>
        </div>
        {/* MeetSideMenu 추가 */}
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetInsert;