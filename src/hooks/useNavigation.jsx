import { useNavigate } from "react-router-dom";

//버튼 클릭, 폼 제출 등 이벤트 기반 동작
const useNavigation = () => {
    const navigate = useNavigate();

    const goToShopList = () => {
        navigate('/shop/list');
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToMeetList = () => {
        navigate('/meet/list');
    }

    const goToMeetInsert = () => {
        navigate('/meet/insert');
    }

    const onJoinClick = (meetId) => {
        // 가입 처리 로직을 여기에 추가 (예: API 호출)
        navigate(`/meet/join/${meetId}`);
    };

    const goToMeetDetail = (meetId) => {
        navigate(`/meet/detail/${meetId}`); // 모임 ID를 사용하여 상세 페이지로 이동
    };

    const goToCategoryList = (category) => {
        navigate(`/meet/list/${category}`); // 카테고리 이름을 사용하여 리스트 페이지로 이동
    };

    const goToPostWrite = () => {
        navigate('/meet/post/write');//글쓰기 페이지로 이동
    };

    const goToPostDetail = (pageId) => {
        navigate(`/meet/post/detail/${pageId}`);//페이지 아이디를 받아 디테일 이동
    }

    const goToPostList = () => {
        navigate('/meet/post'); // 게시판 페이지로 이동하는 함수
    };    

    return {
        goToShopList,
        goToHome,
        goToMeetList,
        goToMeetInsert,
        onJoinClick,
        goToMeetDetail,
        goToCategoryList,
        goToPostWrite,
        goToPostDetail,
        goToPostList,
    };
};

export default useNavigation;