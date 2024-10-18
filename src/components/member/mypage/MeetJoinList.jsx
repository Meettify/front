import React, { useEffect, useState } from 'react';
import useNavigation from '../../../hooks/useNavigation';
import { getMeetJoinList } from '../../../api/meetAPI';

const MeetJoinList = () => {
  const [meets, setMeets] = useState([]);
  const { goToMeetDetail } = useNavigation();

  // 모임 리스트 받아오기
  useEffect(() => {
    const fetchMeets = async () => {
      try {
        const response = await getMeetJoinList();

        if(response.length <= 0){
          return [];
        }

        if (Array.isArray(response) && response.length > 0) {
            const formattedMeets = response.map(meet => ({
            meetMemberId: meet.meetMemberId,
            meetId: meet.meetId,
            meetName: meet.meetName,
            meetLocation: meet.location,
            category: meet.category,
            meetMaximum: meet.maximum,
            images: meet.imageUrls.length > 0 ? meet.imageUrls[0] : null,
            meetRole: meet.meetRole
          }));
    
          setMeets(formattedMeets);
        }
      } catch (error) {
        console.error('Error fetching meet join list:', error);
      }
    };
    fetchMeets();
  }, []);

  // 모임 상세 페이지로 이동
  const handleDetailClick = (category, meetId, isActive) => {
    if (isActive) {
      goToMeetDetail(category, meetId);
    }
  };

  // 탈퇴 페이지로 이동
  const handleWithdrawClick = () => {
    navigate('/탈퇴');
  };

  // 가입 취소 페이지로 이동
  const handleCancelClick = () => {
    navigate('/취소');
  };

  // meetRole에 따른 상태 처리
  const getRoleInfo = (role) => {
    switch (role) {
      case 'ADMIN':
        return { label: '모임장', bgColor: 'bg-blue-500' };
      case 'MEMBER':
        return { 
          label: '가입됨', 
          bgColor: 'bg-green-500', 
          button: { label: '모임탈퇴', onClick: handleWithdrawClick } 
        };
      case 'WAITING':
        return { 
          label: '승인 대기중', 
          bgColor: 'bg-gray-500', 
          button: { label: '가입취소', onClick: handleCancelClick } 
        };
      case 'DORMANT':
        return { label: '탈퇴됨', bgColor: 'bg-gray-300', isActive: false };
      case 'EXPEL':
        return { label: '추방됨', bgColor: 'bg-red-500', isActive: false };
      default:
        return { label: '알 수 없음', bgColor: 'bg-gray-500' };
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {meets.length === 0 ? (
        <div className="text-center text-gray-600">가입된 모임이 없습니다.</div>
      ) : (
        meets.map((meet) => {
          const roleInfo = getRoleInfo(meet.meetRole);
          const isActive = roleInfo.isActive !== false;

          return (
            <div 
              key={meet.meetId} 
              className={`flex items-start border p-4 rounded-lg w-[900px] h-[158px] 
            ${(meet.meetRole === 'DORMANT' || meet.meetRole === 'EXPEL') ? 'bg-gray-400' : 'bg-white'}`}
            >
              {/* 이미지 영역 */}
              <div className="w-32 h-32 bg-gray-300 flex-shrink-0">
                {meet.images ? (
                  <img 
                    src={meet.images} 
                    alt={meet.meetName} 
                    className={`w-full h-full object-cover rounded-lg cursor-pointer ${isActive ? '' : 'pointer-events-none'}`}
                    onClick={() => handleDetailClick(meet.category, meet.meetId, isActive)}
                  />
                ) : (
                  <span className="text-center">사진 없음</span>
                )}
              </div>

              {/* 모임 정보 영역 */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h2 
                    className={`text-xl font-semibold cursor-pointer ${isActive ? '' : 'pointer-events-none'}`}
                    onClick={() => handleDetailClick(meet.meetId, isActive)}
                  >
                    {meet.meetName}
                  </h2>

                  {/* 카테고리 */}
                  <span className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">
                    {meet.category}
                  </span>
                </div>

                <hr className='mb-2'/>

                {/* 장소 */}
                <div className="text-gray-600 mb-2 text-left">장소: {meet.meetLocation}</div>

                {/* 인원수 */}
                <div className="text-gray-600 text-left">
                  인원수: {meet.meetMaximum}명
                </div>
              </div>

              {/* 가입 상태 */}
              <div className='flex w-28 h-full'>
                <div className="ml-auto text-right flex flex-col justify-end p-0">
                    <span className={`text-white px-3 py-1 rounded-lg ${roleInfo.bgColor}`}>
                    {roleInfo.label}
                    </span>
                    {roleInfo.button && (
                    <button 
                        className="mt-2 text-[15px] text-gray-400 underline hover:text-black"
                        onClick={roleInfo.button.onClick}
                    >
                        {roleInfo.button.label}
                    </button>
                    )}
                </div>
              </div>
              
            </div>
          );
        })
      )}
    </div>
  );
};

export default MeetJoinList;
