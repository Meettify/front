import React from "react";
import HomeSection from "../components/home/HomeSection";
import homeImg01 from "../assets/images/homeImg01.jpg";
import homeImg02 from "../assets/images/homeImg02.jpg";

const HomePage = () => {
    return (
        <div>
            <HomeSection
                imageUrl={homeImg01}
                buttonText="커뮤니티 바로가기"
                linkTo="/comm"
            />

            <HomeSection
                imageUrl={homeImg02}
                buttonText="모임 바로가기"
                linkTo="/meet"
            />

            <HomeSection
                imageUrl={homeImg01}
                buttonText="쇼핑 바로가기"
                linkTo="/shop"
            />
        </div>
    );
};

export default HomePage;