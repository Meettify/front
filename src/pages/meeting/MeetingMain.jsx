import Header from "../../components/header/Header";
import Category from "../../components/meeting/Category";
import Recomend from "../../components/meeting/Recomend";
import Footer from "../../components/footer/Footer";
const MeetingMain = () => {
    return (
        <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
            <Category />
            <Recomend />
        </div>
    );
};
export default MeetingMain;