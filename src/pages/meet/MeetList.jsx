import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import RoundedButton from "../../components/button/RoundedButton";
import MeetSideMenu from "../../components/meet/MeetSideMenu";
import useNavigation from "../../hooks/useNavigation";  
import SectionText from "../../components/text/SectionText";
import MeetListSearch from "../../components/meet/MeetListSearch";
import { getMeetList } from '../../api/meetAPI'; // API 호출 함수 임포트

const MeetList = () => {
    const { goToMeetInsert, onJoinClick, goToMeetDetail } = useNavigation();
    const { categoryId } = useParams(); 

    const numericCategoryId = parseInt(categoryId, 10);
    const [meetData, setMeetData] = useState([]); // 소모임 리스트 데이터 상태 (초기값은 빈 배열)
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    // 소모임 리스트를 API에서 가져오는 함수
    const fetchMeetList = async () => {
        setLoading(true); // 데이터 로딩 시작
        try {
            const response = await getMeetList(0, 10, 'name,asc', searchTerm, numericCategoryId);
            if (response && response.data && response.data.content) {
                setMeetData(response.data.content); // 가져온 데이터를 상태에 저장
            } else {
                setMeetData([]); // 데이터가 없을 경우 빈 배열 설정
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
            setMeetData([]); // 에러 발생 시 빈 배열 설정
        } finally {
            setLoading(false); // 데이터 로딩 끝
        }
    };

    // 컴포넌트가 마운트될 때 및 검색어가 변경될 때 API 호출
    useEffect(() => {
        fetchMeetList();
    }, [searchTerm, numericCategoryId]);

    const handleCreateButtonClick = () => {
        goToMeetInsert();
    };

    return (
        <div className="container mx-auto mt-20 w-full flex">
            <div className="w-5/6 bg-gray-100 flex flex-col p-2">
                <div className="mb-2">
                    <SectionText 
                        title="모든 모임 , " 
                        subtitle="둘러보기 ."
                    />
                    <div className="flex flex-col mt-4">
                        <MeetListSearch onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="flex justify-end mt-2">
                            <RoundedButton onClick={handleCreateButtonClick}>모임 생성하기</RoundedButton>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-start mt-2">
                    {loading ? (
                        <div>로딩 중...</div> // 로딩 중일 때 표시할 UI
                    ) : meetData && meetData.length > 0 ? (
                        meetData.map((meet) => (
                            <div className="w-1/4 p-2" key={meet.id}>
                                <MeetCard 
                                    meetId={meet.id} 
                                    image={meet.image} 
                                    title={meet.title} 
                                    description={meet.description} 
                                    tags={meet.tags}
                                    onJoinClick={onJoinClick} 
                                    onTitleClick={() => goToMeetDetail(meet.id)} // 제목 클릭 시 상세 페이지로 이동
                                />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center mt-4">모임이 없습니다.</div>
                    )}
                </div>
            </div>
            <MeetSideMenu />
        </div>
    );
};

export default MeetList;