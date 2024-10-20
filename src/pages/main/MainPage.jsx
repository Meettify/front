import React from "react";
import MeetCard from "../../components/meet/MeetCard";
import ShopCard from "../../components/shop/ShopCard";
import MainSection from "../../components/main/MainSection";
import CommLatestPosts from "../../components/comm/CommLatestPosts";
import SectionText from "../../components/text/SectionText";

const MainPage = () => {
    return (
        <div className="max-w-5xl mx-auto mt-12 px-4">
            <div className="text-left my-8 font-bold">
                <h1 className="text-4xl">
                    <span className="text-black">MEETIFY.</span>
                    <span className="text-gray-500"> 쇼핑과 함께하는 모임</span>
                </h1>
                <h1 className="text-4xl mt-2 text-gray-500">소통하기 가장 좋은 방법.</h1>
            </div>

            <MainSection
                title={<SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />}
                items={[...Array(5)]}
                renderItem={() => <MeetCard />}
            />

            <MainSection
                title={<SectionText title="편리한 쇼핑." subtitle="언제든, 당신에게 필요한 제품으로." />}
                items={[...Array(5)]}
                renderItem={() => <ShopCard />}
            />

            <div className="my-8">
                <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
                <CommLatestPosts />
            </div>
        </div>
    );
};

export default MainPage;
