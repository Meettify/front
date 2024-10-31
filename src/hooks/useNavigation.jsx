import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const goToCart = () => {
        navigate('/cart');
    };

    const goToMemList = () => {
        navigate('/admin/memList');
    };

    const goToItemList = () => {
        navigate('/admin/itemList');
    };

    const goToComm = () => {
        navigate('/comm');
    };

    const goToCommAdd = () => {
        navigate('/comm/add');
    };

    const goToCommEdit = () => {
        navigate(`/comm/edit/${id}`);
    };

    const goToCommDetail = (id) => {
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

    const goToMeetDetail = (meetId, categoryTitle) => {
        navigate(`/meet/detail?categoryTitle=${categoryTitle}&meetId=${meetId}`);
    };

    const goToCategoryList = (categoryTitle) => {
        navigate(`/meet/list?categoryTitle=${categoryTitle}`);
    };

    const goToSearchList = (categoryTitle, query) => {
        navigate(`/meet/list?categoryTitle=${categoryTitle}&query=${query}`);
    };

    const handleNavigateToCategory = (categoryTitle) => {
        goToCategoryList(categoryTitle);
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
        handleNavigateToCategory,
        goToPostWrite,
        goToPostDetail,
        goToPostList,
        goToSignup,
        goToSignupSuccess,
        goToMyPage,
        goToCommDetail,
        goToCommAdd,
        goToComm,
        goToItemList,
        goToCommEdit,
        goToMemList,
        goToCart,
    };
};

export default useNavigation;
