import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailImage from '../../components/meet/DetailImage';
import useMeetStore from '../../stores/useMeetStore';
import { postMeetInsert } from '../../api/meetAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';

const MeetInsert = () => {
  const { image, tags, description, details, setImage, setTags, setDescription, setDetails } = useMeetStore();
  const navigate = useNavigate();
  const [meetName, setMeetName] = useState('');
  const [maxMembers, setMaxMembers] = useState(30);
  const [imageFile, setImageFile] = useState(null);

  // 필수 입력값 체크 함수
  const validateForm = () => {
    if (!meetName || !description || !details || !tags[0]) {
      alert('필수 필드를 입력하세요.');
      return false;
    }
    return true;
  };

  // 소모임 등록 함수
  const handleSave = async () => {
    if (!validateForm()) return;

    const meetData = {
      meetName,
      meetDescription: description,
      meetMaximum: maxMembers,
      meetLocation: tags[0],  
      category: tags[1] || 'SPORTS',  // tags[1]이 없을 경우 기본값 설정
    };

    try {
      const response = await postMeetInsert(meetData, imageFile);

      if (response.status === 201 || response.status === 200) {
        alert('성공적으로 등록되었습니다.');
        navigate(`/meet/detail/${response.data.meetId}`);
      } else {
        alert(`등록에 실패하였습니다. 상태 코드: ${response.status}`);
      }
    } catch (error) {
      console.error('에러 상세:', error);

      // 네트워크 오류 처리
      if (error.message === 'Network Error') {
        alert('네트워크 오류가 발생했습니다. 서버 상태를 확인하세요.');
      } else if (error.response) {
        // 서버로부터 응답이 있었을 때 에러 처리
        console.error('응답 데이터:', error.response.data);
        console.error('상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
        alert(`서버 오류: ${error.response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
      } else if (error.request) {
        // 서버로부터 응답이 없었을 때
        console.error('요청 정보:', error.request);
        alert('서버로부터 응답이 없습니다. 네트워크 상태를 확인하세요.');
      } else {
        // 기타 오류 처리
        console.error('에러 메시지:', error.message);
        alert(`오류 발생: ${error.message}`);
      }
    }
  };

  // 태그 값 변경 처리 함수
  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보 등록</h1>

          <div className="mb-4">
            {image ? (
              <DetailImage image={image} />
            ) : (
              <div className="h-80 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                이미지 없음
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                setImage(URL.createObjectURL(e.target.files[0]));
                setImageFile(e.target.files[0]);
              }} 
              className="mt-2"
            />
          </div>

          {/* 모임 이름 입력 */}
          <input
            value={meetName || ''} // 기본값 설정
            onChange={(e) => setMeetName(e.target.value)}
            className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4"
            placeholder="모임 이름을 입력하세요."
          />

          {/* 태그 입력 */}
          <div className="flex space-x-2 mb-4">
            <input
              value={tags[0] || ''} // 기본값 설정
              placeholder="지역"
              onChange={(e) => handleTagChange(0, e.target.value)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
            />
            <input
              value={tags[1] || ''} // 기본값 설정
              placeholder="카테고리"
              onChange={(e) => handleTagChange(1, e.target.value)}
              className="bg-gray-200 text-gray-700 rounded-full px-4 py-1"
            />
          </div>

          {/* 설명 입력 */}
          <textarea
            value={description || ''} // 기본값 설정
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
            rows="3"
            placeholder="모임 설명을 입력하세요"
          />

          {/* 세부 설명 입력 */}
          <textarea
            value={details || ''} // 기본값 설정
            onChange={(e) => setDetails(e.target.value)}
            className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
            rows="5"
            placeholder="모임 세부 설명을 입력하세요"
          />

          {/* 최대 인원 입력 */}
          <input
            type='number'
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            className="text-gray-700 bg-gray-100 p-4 rounded-lg w-full mb-4"
            placeholder="최대 인원"
          />

          {/* 저장 버튼 */}
          <button 
            onClick={handleSave} 
            className="bg-blue-500 text-white h-8 w-full rounded-lg text-center flex items-center justify-center"
          >
            등록하기
          </button>
        </div>

        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetInsert;
