import React from "react";
import MeetCard from "../../components/meet/MeetCard";
import ShopCard from "../../components/shop/ShopCard";
import MainSection from "../../components/main/MainSection";

const MainPage = () => {
    return (
        <div className="container mx-auto mt-20">
            <div className="text-left my-10 font-bold">
                <h1 className="text-5xl">
                    <span className="text-black">MEETIFY.</span>
                    <span className="text-gray-500"> 쇼핑과 함께하는 모임</span>
                </h1>
                <h1 className="text-5xl mt-3 text-gray-500">소통하기 가장 좋은 방법.</h1>
            </div>

            <MainSection
                title="최신모임."
                subtitle="따끈따끈한 모임이야기."
                items={[...Array(5)]}
                renderItem={() => <MeetCard />}
            />

            <MainSection
                title="편리한 쇼핑."
                subtitle="언제든, 당신에게 필요한 제품으로."
                items={[...Array(5)]}
                renderItem={(item, index) => (
                    // title={`상품명 ${index + 1}`} description="상품 내용" price={`₩${(index + 1) * 10000}`}
                    <ShopCard />
                )}
            />
        </div>
    );
};

export default MainPage;