import React from "react";
import HomeSection from "../components/home/HomeSectionTop";
import homePageTop from "../assets/images/homepage.avif";
import HomeSectionUnder from "../components/home/HomeSectionUnder";

const HomePage = () => {
  return (
    <div>
      <HomeSection
        imageUrl={homePageTop}
        heading="나와 같은 사람들과 연결되는 공간"
        subText="커뮤니티, 모임, 쇼핑까지 Meettify에서 시작하세요"
        buttonText="지금 시작하기"
        linkTo="/main"
      />

      <HomeSectionUnder />
    </div>
  );
};

export default HomePage;
