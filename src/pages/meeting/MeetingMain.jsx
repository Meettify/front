import Category from "../../components/meeting/Category";
import Recomend from "../../components/meeting/Recomend";

const MeetingMain = () => {
    return (
        <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
            <Category />
            <Recomend />
        </div>
    );
};
export default MeetingMain;