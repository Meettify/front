import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import InputImage from '../../components/meet/InputImage'; 
import RoundedButton from '../../components/button/RoundedButton'; 
import useMeetStore from '../../stores/useMeetStore';  
import MeetSideMenu from '../../components/meet/MeetSideMenu';  
import { updateMeet, getMeetingDetail } from '../../api/meetAPI';

const MeetUpdate = () => {
  const { meetId } = useParams();  
  const navigate = useNavigate();
  
  const { image, tags, description, details, setImage, setTags, setDescription, setDetails } = useMeetStore();
  const [newImages, setNewImages] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [meetMaximum, setMeetMaximum] = useState(30);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      try {
        const fetchedMeeting = await getMeetingDetail(meetId);
        
        if (fetchedMeeting && fetchedMeeting.meetDetailDTO) {
          const { meetName, meetDescription, meetLocation, images, meetMaximum, category } = fetchedMeeting.meetDetailDTO;
          
          const initialData = {
            image: images && images.length > 0 ? images[0] : null,
            tags: [meetName, meetLocation],
            description: meetDescription,
            details: fetchedMeeting.details || '',
            meetMaximum: meetMaximum || 30,
            category: category
          };

          setOriginalData(initialData);
          setImage(initialData.image);
          setTags(initialData.tags);
          setDescription(initialData.description);
          setDetails(initialData.details);
          setMeetMaximum(initialData.meetMaximum);
          setCategory(initialData.category);
        }
      } catch (error) {
        console.error('모임 상세 정보 가져오기 오류:', error);
      }
    };

    fetchMeetingDetail();
  }, [meetId, setImage, setTags, setDescription, setDetails]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previewUrl = URL.createObjectURL(files[0]);
      setImage(previewUrl);
      setNewImages(files);
    }
  };

  const handleSave = async () => {
    const updateMeetDTO = {
        meetName: tags[0] || '모임 이름',
        meetDescription: description,
        meetMaximum: parseInt(meetMaximum, 10),
        meetLocation: tags[1] || '서울',
        category: category,
        existingImages: image ? [image] : [] // 기존 이미지 포함
    };

    try {
        const response = await updateMeet(meetId, updateMeetDTO, newImages); // newImages 포함

        if (response.status === 200 || response.status === 201) {
            alert('수정이 완료되었습니다.');
            navigate(`/meet/detail/${meetId}`); // 수정 완료 후 상세 페이지로 이동
        } else {
            alert('수정에 실패했습니다. 상태 코드: ' + response.status);
        }
    } catch (error) {
        console.error('Error during the update request:', error);
        alert('서버 오류');
    }
};


  const handleCancel = () => {
    if (window.confirm('변경 사항을 취소하시겠습니까? 모든 수정 내용이 사라집니다.')) {
      if (originalData) {
        setImage(originalData.image);
        setTags(originalData.tags);
        setDescription(originalData.description);
        setDetails(originalData.details);
        setMeetMaximum(originalData.meetMaximum);
        setCategory(originalData.category);
      }
      navigate(`/meet/detail/${meetId}`);
    }
  };

  return (
    <div className="bg-gray-100 flex-1 h-full">
      <div className="container mx-auto mt-20 w-full flex">
        <div className="w-2/3 bg-gray-100 flex flex-col p-2">
          <h1 className="text-xl font-bold mb-4">소모임 정보 수정</h1>

          <InputImage 
            image={image} 
            setImage={setImage}
            handleImageChange={handleImageChange}
          />

          <h2 className="text-lg font-semibold mb-2">모임 이름</h2>
          <input 
            type="text" 
            value={tags[0]} 
            onChange={(e) => setTags([e.target.value, tags[1]])}
            className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4"
          />

          <h2 className="text-lg font-semibold mb-2">태그 (위치 정보)</h2>
          <input 
            type="text" 
            value={tags[1]} 
            onChange={(e) => setTags([tags[0], e.target.value])}
            className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4"
          />

          <h2 className="text-lg font-semibold mb-2">모임 설명</h2>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-700 bg-gray-200 p-4 rounded-lg w-full mb-4"
          />

          <h2 className="text-lg font-semibold mb-2">모임 최대 인원</h2>
          <input 
            type="number" 
            value={meetMaximum} 
            onChange={(e) => setMeetMaximum(e.target.value)}
            className="bg-gray-200 text-gray-700 rounded-lg p-4 w-full mb-4"
          />

          <div className="flex mt-4 space-x-4">
            <RoundedButton onClick={handleSave} className="w-1/3">
              수정하기
            </RoundedButton>
            <RoundedButton onClick={handleCancel} className="w-1/3 bg-gray-500 hover:bg-gray-600">
              취소하기
            </RoundedButton>
          </div>

        </div>
        <MeetSideMenu />
      </div>
    </div>
  );
};

export default MeetUpdate;