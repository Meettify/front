import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MainSection from "../../components/main/MainSection";
import CommLatestPosts from "../../components/comm/CommLatestPosts";
import SectionText from "../../components/text/SectionText";
import MeetListData from "../../components/meet/MeetListData";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const totalKeyword = searchParams.get("totalKeyword") || "";
    const categoryTitle = searchParams.get("categoryTitle") || "";

    const filteredMeets = MeetListData.filter(meet =>
        meet.title.toLowerCase().includes(totalKeyword.toLowerCase())
    );

    const handleSearch = () => {
        setSearchParams({ totalKeyword, categoryTitle });
    };

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
                items={filteredMeets.slice(0, 10)} 
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

            {filteredMeets.length > 5 && (
                <div className="text-center my-5">
                    <Link 
                        to={`/meet/list?totalKeyword=${totalKeyword}&categoryTitle=${categoryTitle}`}
                        className="text-blue-500 hover:underline"
                    >
                        더보기
                    </Link>
                </div>
            )}

            <div className="my-10">
                <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
                <CommLatestPosts />
            </div>
        </div>
    );
};

export default SearchPage;
