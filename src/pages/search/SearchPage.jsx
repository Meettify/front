import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MeetCard from "../../components/meet/MeetCard";
import MainSection from "../../components/main/MainSection";
import SectionText from "../../components/text/SectionText";
import { searchMeets } from "../../api/meetAPI";
import useNavigation from "../../hooks/useNavigation";
import ShopCard from "../../components/shop/ShopCard"; // ShopCard 컴포넌트 import

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const totalKeyword = searchParams.get("totalKeyword") || "";  // 검색어 받아오기
    const [filteredMeets, setFilteredMeets] = useState([]);
    const [allMeets, setAllMeets] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);  // 상품 필터링된 리스트
    const [products, setProducts] = useState([]);  // 전체 상품 리스트
    const [filteredBoards, setFilteredBoards] = useState([]);  // 게시글 필터링된 리스트
    const { goToMeetDetail } = useNavigation();

    // 소모임 데이터 가져오기
    useEffect(() => {
        const fetchMeets = async () => {
            if (!totalKeyword.trim()) {  // 검색어가 비어있거나 공백인 경우
                setFilteredMeets([]);
                return;
            }

            try {
                const result = await searchMeets(totalKeyword);
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

        fetchMeets();
    }, [totalKeyword]);  // totalKeyword가 변경될 때마다 데이터를 가져옴

    // 소모임 필터링
    useEffect(() => {
        const filterMeets = () => {
            if (!totalKeyword) {
                setFilteredMeets(allMeets);  // 검색어가 없으면 초기 상태로 돌아감
                return;
            }

            const lowerCaseKeyword = totalKeyword.toLowerCase();
            const filtered = allMeets.filter(meet => 
                meet.meetName.toLowerCase().includes(lowerCaseKeyword) ||
                (meet.category && meet.category.toLowerCase().includes(lowerCaseKeyword))
            );

            setFilteredMeets(filtered);
        };

        filterMeets();
    }, [totalKeyword, allMeets]);  // totalKeyword 또는 allMeets가 변경될 때마다 필터링

    // 상품 데이터 가져오기
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await searchMeets(totalKeyword);  // 같은 API로 상품 데이터를 받는다
                if (result.responseItemDTOList && Array.isArray(result.responseItemDTOList)) {
                    setProducts(result.responseItemDTOList);
                    filterProducts(result.responseItemDTOList, totalKeyword);  // 상품 필터링
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error("상품 데이터를 불러오는 중 오류 발생:", error);
                setProducts([]);
                setFilteredProducts([]);
            }
        };

        fetchProducts();
    }, [totalKeyword]);  // 상품은 totalKeyword가 변경될 때마다 다시 호출

    // 상품 필터링 함수
    useEffect(() => {
        filterProducts(products, totalKeyword);
    }, [totalKeyword, products]);

    const filterProducts = (items, keyword) => {
        if (!keyword.trim()) {
            setFilteredProducts(items);  // 검색어가 비어있으면 전체 상품을 보여줌
        } else {
            const filtered = items.filter(product =>
                product.itemName.toLowerCase().includes(keyword.toLowerCase()) ||
                product.itemDetails.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredProducts(filtered);  // 필터링된 상품 리스트 설정
        }
    };

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const result = await searchMeets(totalKeyword);  // 같은 API로 게시글 데이터를 받는다
                if (result.responseBoardList && Array.isArray(result.responseBoardList)) {
                    setFilteredBoards(result.responseBoardList);
                } else {
                    setFilteredBoards([]);
                }
            } catch (error) {
                console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
                setFilteredBoards([]);
            }
        };

        fetchBoards();
    }, [totalKeyword]);  // 게시글은 totalKeyword가 변경될 때마다 다시 호출

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
                title={<SectionText title="최신모임." subtitle="따끈따끈한 모임이야기." />}
                items={filteredMeets.slice(0, 12)}  // 필터된 소모임 리스트
                renderItem={(meet) => {
                    return (
                        <MeetCard 
                            key={meet.meetId}
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

            {/* "더보기" 링크 */}
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

            {/* 상품 섹션 */}
            <MainSection
                title={<SectionText title="추천 상품." subtitle="특별한 상품을 만나보세요!" />}
                items={filteredProducts.slice(0, 10)}  // 필터된 상품 리스트
                renderItem={(product) => {
                    const imageUrl = product.images?.[0]?.uploadImgUrl || 'https://via.placeholder.com/150';  // 이미지 URL 설정
                    return (
                        <ShopCard 
                            key={product.itemId}
                            title={product.itemName}
                            description={product.itemDetails}
                            price={`₩${product.itemPrice}`}
                            imageUrl={imageUrl}  // 올바른 이미지 URL 사용
                        />
                    );
                }}
            />

            {/* "더보기" 링크 */}
            {filteredProducts.length > 5 && (
                <div className="text-center my-5">
                    <Link 
                        to={'/shop'}
                        className="text-blue-500 hover:underline"
                    >
                        더보기
                    </Link>
                </div>
            )}

            {/* 최신 게시글 섹션 */}
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
                            <tr key={post.boardId} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="p-2 text-center">{index + 1}</td>
                                <td className="p-2 text-left">
                                    <Link to={`/comm/detail/${post.boardId}`} className="text-black hover:underline">
                                        {post.title}
                                    </Link>
                                </td>
                                <td className="p-2 text-center">{post.nickName}</td>
                                <td className="p-2 text-center">{new Date(post.regTime).toLocaleDateString()}</td>
                                <td className="p-2 text-center">{post.viewCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* "더보기" 링크 */}
            {filteredBoards.length > 5 && (
                <div className="text-center my-5">
                    <Link 
                        to={'/comm'}
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






// import React, { useState, useEffect } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import MeetCard from "../../components/meet/MeetCard";
// import MainSection from "../../components/main/MainSection";
// import CommLatestPosts from "../../components/comm/CommLatestPosts";
// import SectionText from "../../components/text/SectionText";
// import { searchMeets } from "../../api/meetAPI";
// import useNavigation from "../../hooks/useNavigation";
// import FilterSection from "../../components/shop/FilterSection";

// // SearchPage.jsx에서 totalKeyword가 유효한지 체크
// const SearchPage = () => {
//     const [searchParams] = useSearchParams();
//     const totalKeyword = searchParams.get("totalKeyword") || "";
//     const [filteredMeets, setFilteredMeets] = useState([]);
//     const [allMeets, setAllMeets] = useState([]);
//     const { goToMeetDetail } = useNavigation();

//     const [products, setProducts] = useState([]);  // 상품 리스트 상태
//     const [filteredProducts, setFilteredProducts] = useState([]);  // 필터된 상품 리스트 상태
    
//     useEffect(() => {
//         const fetchData = async () => {
//             if (!totalKeyword.trim()) { // 검색어가 비어있거나 공백인 경우 처리
//                 console.log('검색어가 비어있거나 공백입니다.');
//                 setFilteredMeets([]);
//                 return;
//             }

//             try {
//                 const result = await searchMeets(totalKeyword);
//                 console.log(result);
//                 if (result.meetSummaryDTOList && Array.isArray(result.meetSummaryDTOList)) {
//                     setAllMeets(result.meetSummaryDTOList);
//                     setFilteredMeets(result.meetSummaryDTOList);  // 초기값 설정
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
//     }, [totalKeyword]);  // totalKeyword가 변경될 때마다 데이터를 가져옴

//     useEffect(() => {
//         const filterMeets = () => {
//             if (!totalKeyword) {
//                 // 검색어가 없으면 초기 상태 유지
//                 setFilteredMeets(allMeets);  // 기존 소모임 목록을 그대로 보여주기
//                 return;
//             }
    
//             const lowerCaseKeyword = totalKeyword.toLowerCase();
//             const filtered = allMeets.filter(meet => 
//                 meet.meetName.toLowerCase().includes(lowerCaseKeyword) ||
//                 (meet.category && meet.category.toLowerCase().includes(lowerCaseKeyword)) ||
//                 (meet.description && meet.description.toLowerCase().includes(lowerCaseKeyword))
//             );
    
//             setFilteredMeets(filtered);
//         };
    
//         filterMeets();
//     }, [totalKeyword, allMeets]);  // allMeets가 변경될 때마다 필터링

//      // 상품 검색 처리
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const items = await getItemList(1, 100, 'desc'); // 상품 목록 불러오기
//                 setProducts(items);
//                 filterProducts(items, totalKeyword);
//             } catch (error) {
//                 console.error("상품 데이터를 불러오는 중 오류 발생:", error);
//                 setProducts([]);
//                 setFilteredProducts([]);
//             }
//         };

//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         filterProducts(products, totalKeyword);
//     }, [totalKeyword, products]);

//     const filterProducts = (items, keyword) => {
//         if (!keyword.trim()) {
//             setFilteredProducts(items);  // 검색어가 비어있으면 전체 상품을 보여줌
//         } else {
//             const filtered = items.filter(product =>
//                 product.itemName.toLowerCase().includes(keyword.toLowerCase()) ||
//                 product.itemDetails.toLowerCase().includes(keyword.toLowerCase())
//             );
//             setFilteredProducts(filtered);  // 검색된 상품 리스트 갱신
//         }
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
//                 items={filteredMeets.slice(0, 12)}  // 필터된 소모임 데이터를 보여줌
//                 renderItem={(meet) => {
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

//             {/* 상품 필터 및 검색 섹션 */}
//             <MainSection
//                 title={<SectionText title="추천 상품." subtitle="특별한 상품을 만나보세요!" />}
//                 items={filteredProducts.slice(0, 10)}  // 필터된 상품 리스트
//                 renderItem={(product) => (
//                     <ShopCard 
//                         key={product.itemId}
//                         title={product.itemName}
//                         description={product.itemDetails}
//                         price={`₩${product.itemPrice}`}
//                         imageUrl={product.files?.[0] ? `https://example.com/${product.files[0]}` : 'https://via.placeholder.com/150'}
//                     />
//                 )}
//             />

//             {/* 최신 게시글 섹션 */}
//             <div className="my-10">
//                 <SectionText title="따뜻한 소통." subtitle="공감하는 순간." />
//                 <CommLatestPosts />
//             </div>
//         </div>
//     );
// };

// export default SearchPage;
