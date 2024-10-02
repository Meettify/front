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

    return {
        goToShopList,
        goToHome,
    };
};

export default useNavigation;