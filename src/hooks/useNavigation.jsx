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

    const goToMeetDetail = (meetId, categoryId) => {
        navigate(`/meet/detail?categoryId=${categoryId}&meetId=${meetId}`); // 쿼리 문자열 전달
    };

    const goToCategoryList = (categoryId) => {
        navigate(`/meet/list?categoryId=${categoryId}`);
    };

    const handleNavigateToCategory = (categoryId) => {
        goToCategoryList(categoryId); // goToCategoryList를 호출
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
        handleNavigateToCategory,
        goToPostWrite,
        goToPostDetail,
        goToPostList,
        goToSignup,
        goToSignupSuccess,
        goToMyPage,
        goToDetail,
        goToEditor,
        goToComm,
    };
};

export default useNavigation;