import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

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
        navigate('/meetBoards');  // 게시물 등록
    };
    
    const goToPostDetail = (meetBoardId) => {
        navigate(`/meetBoards/${meetBoardId}`);  // 게시물 상세 보기
    };
    
    const goToPostEdit = (meetBoardId) => {
        navigate(`/meetBoards/${meetBoardId}`);  // 게시물 수정
    };
    
    const goToPostList = (meetId) => {
        navigate(`/meetBoards/list/${meetId}?page=${currentPage}&size=10&sort=${sortOrder}`);  // 'currentPage', 'sortOrder' 상태가 필요
    };
    
    const goToPostListAfterDelete = (meetId) => {
        navigate(`/meetBoards/${meetId}/${meetBoardId}`);  // 게시물 삭제 후 게시판 리스트로 이동
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
        goToPostEdit,
        goToPostListAfterDelete,
    };
};

export default useNavigation;
