import Header from "../../components/header/Header";
import Category from "../../components/meeting/Category";
import Recomend from "../../components/meeting/Recomend";
import Footer from "../../components/footer/Footer";
const Moimmain = () => {
    return (
        <div>
            <Header />
            <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
            <div className="w-2/3"> {/* Category 컴포넌트의 너비를 2/3로 설정 */}
            <Category />
            </div>
            <div className="w-1/3"> {/* Recomend 컴포넌트의 너비를 1/3로 설정 */}
            <Recomend />
            </div>
            </div>
            <Footer />
        </div>
    );
};
export default Moimmain;