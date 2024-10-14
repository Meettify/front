import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useNavigation from '../../hooks/useNavigation';
import emotionImage from '../../assets/images/emotion1.png';  
import MeetJoin from '../../components/meet/MeetJoin';  
import MeetContent from '../../components/meet/MeetContent';  
import RoundedButton from '../../components/button/RoundedButton';  
import { getMeetingById, deleteMeeting } from '../../mocks/mockAPI';
import MeetSideMenu from '../../components/meet/MeetSideMenu';  

const MeetDetail = () => {
    const [searchParams] = useSearchParams();
    const meetId = searchParams.get("meetId"); // 쿼리 문자열에서 meetId 가져오기
    const categoryId = searchParams.get("categoryId"); // 쿼리 문자열에서 categoryId 가져오기
    console.log(`Meet ID: ${meetId}, Category ID: ${categoryId}`); // 로그 추가
  
    const { goToCategoryList } = useNavigation(); // useNavigation 사용
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMeeting = await getMeetingById(meetId);
            setMeeting(fetchedMeeting);
        };
        fetchData();
    }, [meetId]);

    const handleDelete = async () => {
        const isConfirmed = window.confirm('정말로 모임을 삭제하시겠습니까?');
        if (isConfirmed) {
            const success = await deleteMeeting(meetId);
            if (success) {
                alert('모임이 성공적으로 삭제되었습니다.');
                goToCategoryList(); // useNavigation을 통해 이동
            } else {
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    if (!meeting) return <div>Loading...</div>;

    return (
        <div className="bg-gray-100 flex-1 h-full">
            <div className="container mx-auto mt-20 w-full flex">
                <div className="w-2/3 bg-gray-100 flex flex-col p-2">
                    <MeetContent 
                        image={emotionImage}
                        tags={meeting.tags}
                        description={meeting.description}
                        details={meeting.details}
                    />
                    
                    <div className="flex justify-center space-x-4 p-4 mt-4">
                        {!meeting.isMember && !meeting.isHost && (
                            <MeetJoin meetId={meetId} onSubmit={() => alert('가입 신청이 완료되었습니다. 모임장의 승인을 기다려주세요.')} />
                        )}

                        {(meeting.isHost || meeting.isAdmin) && (
                            <>
                                <Link to={`/meet/update/${meetId}`}>
                                    <RoundedButton>
                                        수정하기
                                    </RoundedButton>
                                </Link>

                                <RoundedButton onClick={handleDelete}>
                                    삭제하기
                                </RoundedButton>
                            </>
                        )}
                    </div>
                </div>
                <MeetSideMenu />
            </div>
        </div>
    );
};

export default MeetDetail;
