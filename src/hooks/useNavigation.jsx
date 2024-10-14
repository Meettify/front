import { useNavigate } from "react-router-dom";

//버튼 클릭, 폼 제출 등 이벤트 기반 동작
const useNavigation = () => {
    const navigate = useNavigate();

    const goToComm = () => {
        navigate('/comm');
    };

    const goToEditor = () => {
        navigate('/comm/editor');
    };

    const goToDetail = (id) => {
        navigate(`/comm/detail/${id}`);
    };
    const goToShopList = () => {
        navigate('/shop/list');
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToMeetInsert = () => {
        navigate('/meet/insert');
    }

    const goToMeetDetail = (meetId) => {
        navigate(`/meet/detail/${meetId}`); // 모임 ID를 사용하여 상세 페이지로 이동
    };

    const goToCategoryList = (categoryId) => {
        navigate(`/meet/list/${categoryId}`); // 카테고리 이름을 사용하여 리스트 페이지로 이동
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

    const goToSignup = () => {
        navigate('/signup')
    };

    const goToSignupSuccess = () => {
        navigate('/signupsuccess')
    };

    const goToMyPage = () => {
        navigate('/mypage')
    };

    return {
        goToShopList,
        goToHome,
        goToMeetInsert,
        goToMeetDetail,
        goToCategoryList,
        goToPostWrite,
        goToPostDetail,
        goToPostList,
        goToSignup,
        goToSignupSuccess,
        goToMyPage,
    };
};

export default useNavigation;