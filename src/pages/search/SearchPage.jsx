import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MainSection from "../../components/main/MainSection";
import SectionText from "../../components/text/SectionText";
import { searchAll } from "../../api/searchAPI";
import { searchMeets } from "../../api/meetAPI";
import { searchCommunityPosts } from "../../api/commAPI";
import { searchItems } from "../../api/shopAPI";
import useNavigation from "../../hooks/useNavigation";
import ShopCard from "../../components/shop/ShopCard"; // ShopCard 컴포넌트 import

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const totalKeyword = searchParams.get("totalKeyword") || ""; // 검색어 받아오기
  const [filteredMeets, setFilteredMeets] = useState([]);
  const [allMeets, setAllMeets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // 상품 필터링된 리스트
  const [products, setProducts] = useState([]); // 전체 상품 리스트
  const [filteredBoards, setFilteredBoards] = useState([]); // 게시글 필터링된 리스트
  const { goToMeetDetail } = useNavigation();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("검색 실행: ", totalKeyword);
        const result = await searchAll(totalKeyword);
        console.log("isMember test : ", result.meetSummaryDTOList.isMember);

        setFilteredMeets(result.meetSummaryDTOList || []);
        setFilteredBoards(result.responseBoardList || []);
        setFilteredProducts(result.responseItemDTOList || []);
      } catch (error) {
        console.error("검색 오류", error);
      }
    };

    fetchData(); // ✅ 무조건 실행
  }, [location.search]); // ✅ 파라미터가 같아도 URL이 바뀌면 실행됨

  return (
    <div className="container mx-auto mt-20">
      <div className="text-left my-10 font-bold">
        <h1 className="text-5xl">
          <span className="text-black">MEETIFY, </span>
          <span className="text-gray-500"> 빠른 검색.</span>
        </h1>
      </div>

      {/* 소모임 섹션 */}
      <MainSection
        title={
          <SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />
        }
        items={filteredMeets.slice(0, 8)}
        renderItem={(meet) => (
          <MeetCard
            key={meet.meetId}
            meetId={meet.meetId}
            imageUrls={meet.imageUrls}
            title={meet.meetName}
            description={meet.description}
            tags={meet.tags}
            isMeetPage={false}
            isMember={meet.member} // ✅ 필요한 경우
            onCardClick={() => goToMeetDetail(meet.meetId)}
          />
        )}
      />

      {/* "더보기" 링크 */}
      {filteredMeets.length >= 10 && (
        <div className="text-center my-5">
          <Link
            to={`/list?totalKeyword=${totalKeyword}`}
            className="text-blue-500 hover:underline"
          >
            더보기
          </Link>
        </div>
      )}

      {/* 상품 섹션 */}
      <MainSection
        title={
          <SectionText
            title="추천 상품."
            subtitle="특별한 상품을 만나보세요!"
          />
        }
        items={filteredProducts.slice(0, 10)} // 필터된 상품 리스트
        renderItem={(product) => {
          const imageUrl =
            product.images?.[0]?.uploadImgUrl ||
            "https://via.placeholder.com/150"; // 이미지 URL 설정
          return (
            <>
              <ShopCard
                key={product.itemId}
                title={product.itemName}
                description={product.itemDetails}
                price={`₩${product.itemPrice}`}
                imageUrl={imageUrl} // 올바른 이미지 URL 사용
                onClick={() => navigate(`/shop/detail/${product.itemId}`)}
              />
              {filteredProducts.length === 0 && (
                <div className="text-center text-gray-400 py-10 min-h-[200px]">
                  관련된 상품이 없습니다.
                </div>
              )}
            </>
          );
        }}
      />

      {/* "더보기" 링크 */}
      {filteredProducts.length >= 10 && (
        <div className="text-center my-5">
          <Link
            to={`/shop?totalKeyword=${totalKeyword}`}
            className="text-blue-500 hover:underline"
          >
            더보기
          </Link>
        </div>
      )}

      {/* 최신 커뮤니티 섹션 */}
      <div className="my-10">
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
            {filteredBoards.map((post, index) => (
              <tr
                key={post.communityId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-left">
                  <Link
                    to={`/comm/detail/${post.communityId}`}
                    className="text-black hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="p-2 text-center">{post.nickName}</td>
                <td className="p-2 text-center">
                  {new Date(post.regTime).toLocaleDateString()}
                </td>
                <td className="p-2 text-center">{post.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredBoards.length === 0 && (
        <div className="text-center text-gray-400 py-10 min-h-[200px]">
          관련된 커뮤니티가 없습니다.
        </div>
      )}
      {/* "더보기" 링크 */}
      {filteredBoards.length >= 10 && (
        <div className="text-center my-5">
          <Link
            to={`/comm?totalKeyword=${totalKeyword}`}
            className="text-blue-500 hover:underline"
          >
            더보기
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
