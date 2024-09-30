import Header from "../../components/header/Header";
import Recomend from "../../components/meeting/Recomend";
import Footer from "../../components/footer/Footer";
import { Route } from "react-router-dom";
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