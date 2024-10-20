import React, { useEffect, useState } from "react";
import MeetCard from "../../components/meet/MeetCard";
import ShopCard from "../../components/shop/ShopCard";
import SectionText from "../../components/text/SectionText";
import useCommStore from "../../stores/useCommStore";
import useAdminStore from "../../stores/useAdminStore";
import { Link } from "react-router-dom";

const MainPage = () => {
    const { posts, fetchPosts } = useCommStore(); // CommPage의 게시글 데이터 가져오기
    const { itemList, fetchItemList } = useAdminStore(); // ShopPage의 상품 데이터 가져오기
    const [latestPosts, setLatestPosts] = useState([]);
    const [limitedItems, setLimitedItems] = useState([]);

    useEffect(() => {
        fetchPosts(); // 게시글 불러오기
        fetchItemList(); // 상품 불러오기
    }, [fetchPosts, fetchItemList]);

    useEffect(() => {
        // 최신 게시물 3개 가져오기
        setLatestPosts(posts.slice(0, 3));
        // 상품 목록에서 4개 가져오기
        setLimitedItems(itemList.slice(0, 4));
    }, [posts, itemList]);

    return (
        <div className="max-w-7xl mx-auto mt-12 px-4">
            {/* 최신 모임 섹션 */}
            <div className="my-8">
                <SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />
                <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, index) => (
                        <MeetCard key={index} />
                    ))}
                </div>
            </div>

            {/* 편리한 쇼핑 섹션 */}
            <div className="my-8">
                <SectionText title="편리한 쇼핑." subtitle="언제든, 당신에게 필요한 제품으로." />
                <div className="grid grid-cols-4 gap-4">
                    {limitedItems.map((item) => (
                        <ShopCard
                            key={item.itemId}
                            title={item.itemName}
                            description={item.itemDetails}
                            price={`₩${item.itemPrice}`}
                            imageUrl={
                                item.files?.[0]
                                    ? `https://example.com/${item.files[0]}`
                                    : "https://via.placeholder.com/150"
                            }
                        />
                    ))}
                </div>
            </div>

            {/* 따뜻한 소통 섹션 (최신 게시글) */}
            <div className="my-8">
                <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
                <table className="w-full table-auto border-t border-gray-300 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 text-center font-medium w-1/12">번호</th>
                            <th className="p-2 text-left font-medium w-5/12">제목</th>
                            <th className="p-2 text-center font-medium w-2/12">작성자</th>
                            <th className="p-2 text-center font-medium w-2/12">작성일</th>
                            <th className="p-2 text-center font-medium w-1/12">조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestPosts.map((post, index) => (
                            <tr key={post.boardId} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2 text-left">
                                    <Link to={`/comm/detail/${post.boardId}`} className="text-blue-500 hover:underline">
                                        {post.title}
                                    </Link>
                                </td>
                                <td className="p-2 text-center">{post.nickName}</td>
                                <td className="p-2 text-center">
                                    {new Date(post.regTime).toLocaleDateString()}
                                </td>
                                <td className="p-2 text-center">{post.views || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPage;
