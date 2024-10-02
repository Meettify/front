import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import Footer from "../components/menus/Footer";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
    return (
        <>
            <header>
                <BasicMenu />
            </header>
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BasicLayout;