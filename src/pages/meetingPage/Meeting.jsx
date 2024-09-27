import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Recomend from "../../components/meeting/Recomend.jsx"
import GroupDetail from "../group/GroupDetail.jsx";
import BasicLayout from "../layout/BasicLayout.jsx";

const Moim = () => {
    return (
        <div>
            <BasicLayout>
                <div className="w-2/3"> {/* Category 컴포넌트의 너비를 2/3로 설정 */}
                <GroupDetail/>
                </div>
            </BasicLayout>
        </div>
    );
};
export default Moim;