import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppRouter from "../../router/AppRouter";

const BasicLayout = () => {
    return (
        <>
            <Header/>
                <AppRouter/>
            <Footer/>
        </>
    );
};
export default BasicLayout;