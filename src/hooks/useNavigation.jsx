import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const goToShopDetail = (id) => {
        navigate(`/shop/detail/${id}`);
    };

    const goToShopAdd = () => {
        navigate('/shop/add');
    };

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

    const goToShop = () => {
        navigate('/shop');
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToMeetInsert = () => {
        navigate('/meet/insert');
    }

    const goToMeetDetail = (meetId) => {
        navigate(`/meet/detail/${meetId}`);
    };

    const goToCategoryList = (category) => {
        navigate(`/meet/list?category=${category}`);
    };

    const goToSearchList = (totalKeyword) => {
        navigate(`/meet/list?totalKeyword=${totalKeyword}`);
    };

    const handleNavigateToCategory = (category) => {
        goToCategoryList(category);
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

    const goToSupport = () => {
        navigate('/support');
    }

    return {
        goToShopList,
        goToShop,
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
        goToShopAdd,
        goToSupport,
        goToShopDetail,
    };
};

export default useNavigation;
