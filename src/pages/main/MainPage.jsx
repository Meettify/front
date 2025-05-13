import React, { useEffect, useState } from "react";
import ShopCard from "../../components/shop/ShopCard";
import SectionText from "../../components/text/SectionText";
import useCommStore from "../../stores/useCommStore";
import useAdminStore from "../../stores/useAdminStore";
import { Link } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import useNavigation from "../../hooks/useNavigation";
import MeetCategoryData from "../../components/meet/MeetCategoryData";
import "../main/MainPage.css";

const MainPage = () => {
  const { posts, fetchPosts, topPosts, fetchTopPosts, topItems } =
    useCommStore();
  const { itemList, fetchItemList, fetchTopItems } = useAdminStore();
  const [limitedItems, setLimitedItems] = useState([]);
  const { goToCategoryList, goToMeetDetail } = useNavigation();

  const handleButtonClick = (id, isCategory, categoryTitle) => {
    if (isCategory && categoryTitle) {
      goToCategoryList(categoryTitle);
    } else {
      goToMeetDetail(id, categoryTitle);
    }
  };
  useEffect(() => {
    console.log("TOP POST 확인:", topPosts);
  }, [topPosts]);

  useEffect(() => {
    fetchTopPosts(); // 커뮤니티 인기글
    fetchTopItems(); // 상품 인기글
  }, []);

  return (
    <div className="page-wrap MainPage min-h-screen pb-32">
      {/* 최신 모임 섹션 */}
      <div className="new-meets my-16">
        <SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />
        <div className="slider animation-slider">
          <div className="slider-wrap">
            {[...MeetCategoryData, ...MeetCategoryData].map((meet, idx) => (
              <div
                className="card-wrap"
                key={`${meet.categoryId}-${idx}`}
                onClick={() =>
                  handleButtonClick(meet.categoryId, true, meet.categoryTitle)
                }
              >
                <MeetCard
                  meetId={meet.categoryId}
                  imageUrls={[meet.image]}
                  title={meet.title}
                  description={meet.description}
                  tags={meet.tags}
                  isMeetPage={true}
                  onTitleClick={() => goToCategoryList(meet.categoryTitle)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 쇼핑 섹션 */}
      <div className="my-16">
        <SectionText
          title="🔥 인기 상품"
          subtitle="지금 가장 인기 있는 상품이에요."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topItems?.length > 0 ? (
            topItems.map((item) => (
              <ShopCard
                key={item.itemId}
                title={item.itemName}
                description={item.itemDetails}
                price={`₩${item.itemPrice?.toLocaleString()}`}
                imageUrl={
                  item.images?.[0]?.uploadImgUrl ??
                  "https://via.placeholder.com/150"
                }
              />
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-4">
              인기 상품이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 커뮤니티 섹션 */}
      <div className="my-16">
        <SectionText title="인기 커뮤니티." subtitle="가장 많이 본 이야기." />
        {topPosts.length > 0 ? (
          <table className="w-full table-auto border-t border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-center font-medium w-1/12">순위</th>
                <th className="p-2 text-left font-medium w-5/12">제목</th>
                <th className="p-2 text-center font-medium w-2/12">작성자</th>
                <th className="p-2 text-center font-medium w-2/12">작성일</th>
                <th className="p-2 text-center font-medium w-1/12">조회수</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, index) => (
                <tr
                  key={post.communityId}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${
                    index === 0 ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="p-2 text-center text-lg font-semibold">
                    {index === 0
                      ? "🔥"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>
                  <td className="p-2 text-left">
                    <Link
                      to={`/comm/detail/${post.communityId}`}
                      className="text-blue-500 hover:text-orange-500 hover:underline"
                    >
                      {post.title}
                    </Link>
                    {index < 3 && (
                      <span className="ml-2 text-xs bg-yellow-300 text-black px-2 py-0.5 rounded">
                        BEST
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">{post.nickName}</td>
                  <td className="p-2 text-center">
                    {new Date(post.regTime).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="p-2 text-center text-rose-600 font-bold">
                    {post.viewCount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            인기 게시글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
