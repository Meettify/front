import React from "react";
import { useSearchParams } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import ShopCard from "../../components/shop/ShopCard";
import MainSection from "../../components/main/MainSection";
import CommLatestPosts from "../../components/comm/CommLatestPosts";
import SectionText from "../../components/text/SectionText";
import MeetListData from "../../components/meet/MeetListData"; // 데이터 임포트
//import ShopListData from "../../components/shop/ShopListData"; // 데이터 임포트

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    // 검색어에 맞는 데이터 필터링
    const filteredMeets = MeetListData.filter(meet =>
        meet.title.toLowerCase().includes(query.toLowerCase())
    );

    // const filteredShops = ShopListData.filter(shop =>
    //     shop.title.toLowerCase().includes(query.toLowerCase())
    // );

    return (
        <div className="container mx-auto mt-20">
            <div className="text-left my-10 font-bold">
                <h1 className="text-5xl">
                    <span className="text-black">MEETIFY, </span>
                    <span className="text-gray-500"> 빠른 검색.</span>
                </h1>
            </div>

            <MainSection
                title={<SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />}
                items={filteredMeets}
                renderItem={(meet) => (
                    <MeetCard 
                        key={meet.id}
                        meetId={meet.id}
                        image={meet.image}
                        title={meet.title}
                        description={meet.description}
                        tags={meet.tags}
                    />
                )}
            />

            {/* <MainSection
                title={<SectionText title="편리한 쇼핑." subtitle="언제든, 당신에게 필요한 제품으로." />}
                items={filteredShops}
                renderItem={(shop) => (
                    <ShopCard 
                        key={shop.id}
                        shopId={shop.id}
                        image={shop.image}
                        title={shop.title}
                        price={shop.price}
                    />
                )}
            /> */}

            <div className="my-10">
                <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
                <CommLatestPosts />
            </div>
        </div>
    );
};

export default SearchPage;
