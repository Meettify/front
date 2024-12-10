// import React, { useState, useEffect } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import MeetCard from "../../components/meet/MeetCard";
// import MainSection from "../../components/main/MainSection";
// import CommLatestPosts from "../../components/comm/CommLatestPosts";
// import SectionText from "../../components/text/SectionText";
// import { searchMeets } from "../../api/meetAPI";
// import useNavigation from "../../hooks/useNavigation"
// // import { searchProducts } from "../../api/productAPI"; // 상품 검색 API 호출

// const SearchPage = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const totalKeyword = searchParams.get("totalKeyword") || "";
//     const [filteredMeets, setFilteredMeets] = useState([]);
//     const [allMeets, setAllMeets] = useState([]);
//     // const [filteredProducts, setFilteredProducts] = useState([]);
//     const [isSearchVisible, setIsSearchVisible] = useState(true);
//     const { goToMeetDetail } = useNavigation();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await searchMeets(totalKeyword);
//                 console.log(result); // API 응답을 확인하기 위한 로그
//                 if (Array.isArray(result.meetSummaryDTOList)) {
//                     setAllMeets(result.meetSummaryDTOList);
//                     setFilteredMeets(result.meetSummaryDTOList); // 초기값 설정
//                 } else {
//                     setAllMeets([]); 
//                     setFilteredMeets([]); 
//                 }
//             } catch (error) {
//                 console.error('API 호출 오류:', error);
//                 setAllMeets([]); 
//                 setFilteredMeets([]); 
//             }
//         };

//         fetchData();
//     }, [totalKeyword]); // totalKeyword가 변경될 때마다 데이터를 가져옴

//     useEffect(() => {
//         const filterMeets = () => {
//             if (!totalKeyword) {
//                 setFilteredMeets(allMeets);
//                 return;
//             }

//             const lowerCaseKeyword = totalKeyword.toLowerCase();
//             const filtered = allMeets.filter(meet => 
//                 meet.meetName.toLowerCase().includes(lowerCaseKeyword) ||
//                 (meet.category && meet.category.toLowerCase().includes(lowerCaseKeyword)) || // category 체크
//                 (meet.description && meet.description.toLowerCase().includes(lowerCaseKeyword)) // description 체크
//             );

//             setFilteredMeets(filtered);
//         };

//         filterMeets();
//     }, [totalKeyword, allMeets]); // allMeets가 변경될 때마다 필터링

//     const handleSearch = () => {
//         setSearchParams({ totalKeyword });
//     };


//     return (
//         <div className="container mx-auto mt-20">
//             <div className="text-left my-10 font-bold">
//                 <h1 className="text-5xl">
//                     <span className="text-black">MEETIFY, </span>
//                     <span className="text-gray-500"> 빠른 검색.</span>
//                 </h1>
//             </div>

//             <MainSection
//                 title={<SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />}
//                 items={filteredMeets.slice(0, 10)} 
//                 renderItem={(meet) => {
//                     console.log(meet); // meet 구조를 확인
//                     return (
//                         <MeetCard 
//                             meetId={meet.meetId}
//                             imageUrls={meet.imageUrls}  
//                             title={meet.meetName}
//                             description={meet.description} 
//                             tags={meet.tags} 
//                             isMeetPage={false}
//                             onTitleClick={() => goToMeetDetail(meet.meetId)}
//                         />
//                     );
//                 }}
                
//             />

//             {filteredMeets.length > 5 && (
//                 <div className="text-center my-5">
//                     <Link 
//                         to={`/meet/list?totalKeyword=${totalKeyword}`}
//                         className="text-blue-500 hover:underline"
//                     >
//                         더보기
//                     </Link>
//                 </div>
//             )}

//             {/* 상품 섹션 추가
//             <MainSection
//                 title={<SectionText title="추천 상품." subtitle="특별한 상품을 만나보세요!" />}
//                 items={filteredProducts.slice(0, 10)} // 상품 리스트
//                 renderItem={(product) => (
//                     <ShopCard 
//                         title={product.title}
//                         description={product.description}
//                         price={product.price}
//                         imageUrl={product.imageUrl}
//                     />
//                 )}
//             /> */}

//             {/* 최신 게시글 섹션 */}
//             <div className="my-10">
//                 <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
//                 <CommLatestPosts />
//             </div>
//         </div>
//     );
// };

import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MainSection from "../../components/main/MainSection";
import CommLatestPosts from "../../components/comm/CommLatestPosts";
import SectionText from "../../components/text/SectionText";
import { searchMeets } from "../../api/meetAPI";
import useNavigation from "../../hooks/useNavigation";

// SearchPage.jsx에서 totalKeyword가 유효한지 체크
const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const totalKeyword = searchParams.get("totalKeyword") || "";
    const [filteredMeets, setFilteredMeets] = useState([]);
    const [allMeets, setAllMeets] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!totalKeyword.trim()) { // 검색어가 비어있거나 공백인 경우 처리
                console.log('검색어가 비어있거나 공백입니다.');
                setFilteredMeets([]);
                return;
            }

            try {
                const result = await searchMeets(totalKeyword);
                console.log(result);
                if (result.meetSummaryDTOList && Array.isArray(result.meetSummaryDTOList)) {
                    setAllMeets(result.meetSummaryDTOList);
                    setFilteredMeets(result.meetSummaryDTOList);  // 초기값 설정
                } else {
                    setAllMeets([]);
                    setFilteredMeets([]);
                }
            } catch (error) {
                console.error('API 호출 오류:', error);
                setAllMeets([]);
                setFilteredMeets([]);
            }
        };

        fetchData();
    }, [totalKeyword]);  // totalKeyword가 변경될 때마다 데이터를 가져옴

    useEffect(() => {
        const filterMeets = () => {
            if (!totalKeyword) {
                // 검색어가 없으면 초기 상태 유지
                setFilteredMeets(allMeets);  // 기존 소모임 목록을 그대로 보여주기
                return;
            }
    
            const lowerCaseKeyword = totalKeyword.toLowerCase();
            const filtered = allMeets.filter(meet => 
                meet.meetName.toLowerCase().includes(lowerCaseKeyword) ||
                (meet.category && meet.category.toLowerCase().includes(lowerCaseKeyword)) ||
                (meet.description && meet.description.toLowerCase().includes(lowerCaseKeyword))
            );
    
            setFilteredMeets(filtered);
        };
    
        filterMeets();
    }, [totalKeyword, allMeets]);  // allMeets가 변경될 때마다 필터링
    
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
                items={filteredMeets.slice(0, 12)}  // 필터된 소모임 데이터를 보여줌
                renderItem={(meet) => {
                    return (
                        <MeetCard 
                            meetId={meet.meetId}
                            imageUrls={meet.imageUrls}  
                            title={meet.meetName}
                            description={meet.description} 
                            tags={meet.tags} 
                            isMeetPage={false}
                            onTitleClick={() => goToMeetDetail(meet.meetId)}
                        />
                    );
                }}
            />

            {filteredMeets.length > 5 && (
                <div className="text-center my-5">
                    <Link 
                        to={`/meet/list?totalKeyword=${totalKeyword}`}
                        className="text-blue-500 hover:underline"
                    >
                        더보기
                    </Link>
                </div>
            )}

            {/* 상품 섹션 추가
//             <MainSection
//                 title={<SectionText title="추천 상품." subtitle="특별한 상품을 만나보세요!" />}
//                 items={filteredProducts.slice(0, 10)} // 상품 리스트
//                 renderItem={(product) => (
//                     <ShopCard 
//                         title={product.title}
//                         description={product.description}
//                         price={product.price}
//                         imageUrl={product.imageUrl}
//                     />
//                 )}
//             /> */}

            {/* 최신 게시글 섹션 */}
            <div className="my-10">
                <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
                <CommLatestPosts />
            </div>
        </div>
    );
};

export default SearchPage;
