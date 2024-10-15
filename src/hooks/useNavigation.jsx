import { useNavigate } from "react-router-dom";

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
        navigate(`/meet/detail?categoryId=${categoryId}&meetId=${meetId}`); 
    };            

    const goToCategoryList = (categoryId) => {
        navigate(`/meet/list?categoryId=${categoryId}`);
    };     

    const goToSearchList = (categoryId, query) => {
        navigate(`/meet/list?categoryId=${categoryId}&query=${query}`);
    };

    const handleNavigateToCategory = (categoryId) => {
        goToCategoryList(categoryId);
    };

    const goToPostWrite = () => {
        navigate('/meet/post/write');
    };

    const goToPostDetail = (pageId) => {
        navigate(`/meet/post/detail/${pageId}`);
    };

    const goToPostList = () => {
        navigate('/meet/post');
    };

    const goToSignup = () => {
        navigate('/signup');
    };

    const goToSignupSuccess = () => {
        navigate('/signupsuccess');
    };

    const goToMyPage = () => {
        navigate('/mypage');
    };

    return {
        goToShopList,
        goToHome,
        goToMeetInsert,
        goToMeetDetail,
        goToCategoryList,
        goToSearchList,
        goToDetail,
        goToEditor,
        goToComm,
        handleNavigateToCategory,
        goToPostWrite,
        goToPostDetail,
        goToPostList,
        goToSignup,
        goToSignupSuccess,
        goToMyPage,
    };
};

export default useNavigation;
