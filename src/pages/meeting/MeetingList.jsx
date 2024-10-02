import List from "../../components/meeting/List";
import Recomend from "../../components/meeting/Recomend";

const MeetingList = () => {
    return (
        <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
            <List />
            <Recomend />
        </div>        
    );
};
export default MeetingList;