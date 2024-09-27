import Header from "../../components/header/Header";
import Recomend from "../../components/meeting/Recomend";
import Footer from "../../components/footer/Footer";

const BasicLayout = () => {
    return (
        <>
            <Header/>
            <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
            <div className="w-2/3">
            </div>
            <div className="w-1/3"> 
                <Recomend/>
            </div>
            </div>
            <Footer/>
        </>
    );
};
export default BasicLayout;