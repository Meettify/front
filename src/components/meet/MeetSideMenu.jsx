import React, { useEffect } from "react";
import useAdminStore from '../../stores/useAdminStore';  // Zustand Store 임포트
import running from '../../assets/images/meet/running.jpg';  // 기본 이미지

const MeetSideMenu = () => {
    const { itemList, fetchItemList, loading, error } = useAdminStore();  // Zustand에서 itemList, loading, error, fetchItemList 가져오기

    useEffect(() => {
        fetchItemList();  // 컴포넌트가 마운트될 때 상품 목록을 가져옵니다
    }, [fetchItemList]);  // `fetchItemList`가 변경되면 다시 실행

    if (loading) return <div className="text-center text-gray-500">로딩 중...</div>;
    if (error) return <div className="text-center text-red-500">오류가 발생했습니다: {error}</div>;

    return (
        <div className="w-1/6">
            <aside className="bg-gray-200 h-full items-center">
            <div className="mt-5px py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 w-full">
                    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
                        <h3 className="text-xl tracking-tight text-gray-900 text-center">
                            오늘의 쇼핑. 당신에게 추천하는 제품.
                        </h3>
                    </div>
                    <div className="mt-8">
                        <div className="-mb-6 w-full overflow-x-auto pb-6">
                            <ul role="list" className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:space-x-0 justify-center">
                                {itemList.slice(0, 4).length > 0 ? itemList.slice(0, 4).map(item => (
                                    <li key={item.itemId} className="inline-flex flex-col text-center lg:w-auto mb-6"> {/* mb-6 추가해서 항목 간 간격을 넓힘 */}
                                        <div className="group w-full max-w-xs">
                                            <div className="w-full h-30 overflow-hidden rounded-md bg-gray-200 flex justify-center items-center">
                                                <img 
                                                    src={item.images && item.images.length > 0 ? item.images[0].uploadImgUrl : running}  // 이미지가 있으면 첫 번째 이미지 사용, 없으면 기본 이미지
                                                    alt={item.itemName || 'Unknown Product'}
                                                    className="w-full h-full object-contain"
                                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                                />
                                            </div>
                                            <div className="mt-4 text-center"> {/* 이미지와 상품명 사이에 충분한 간격 */}
                                                <h3 className="mt-2 font-semibold text-gray-900"> {/* 상품명과 가격 간격 */}
                                                    <a href={`/shop/detail/${item.itemId}`}>
                                                        {item.itemName || 'Unknown Product'}
                                                    </a>
                                                </h3>
                                                <p className="mt-2 text-gray-900">${item.itemPrice || '0'}</p> {/* 가격과 상품명 간격을 mt-2로 설정 */}
                                            </div>
                                        </div>
                                    </li>
                                )) : (
                                    <p className="text-center text-gray-500">추천 상품이 없습니다.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default MeetSideMenu;







// // MeetSideMenu.jsx
// import React from "react";
// import running from '../../assets/images/meet/running.jpg';

// const MeetSideMenu = () => {
//     return (
//         <aside className="bg-gray-200 h-full flex flex-col justify-center items-center">
//             <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 w-full">
//                 <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
//                     <h3 className="text-xl tracking-tight text-gray-900 text-center">오늘의 쇼핑. 당신에게 추천하는 제품.</h3>
//                     <a href="shop/recomend" className="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
//                         Search more
//                         <span aria-hidden="true"> &rarr;</span>
//                     </a>
//                 </div>

//                 <div className="mt-8">
//                     <div className="-mb-6 w-full overflow-x-auto pb-6">
//                         <ul role="list" className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:space-x-0 justify-center">
//                             <li className="inline-flex flex-col text-center lg:w-auto">
//                                 <div className="group w-full max-w-xs">
//                                     <div className="w-full h-30 overflow-hidden rounded-md bg-gray-200 flex justify-center items-center">
//                                         <img 
//                                             src={running} 
//                                             alt="running" 
//                                             className="w-full h-full object-contain"
//                                             style={{ maxHeight: '100%', maxWidth: '100%' }} // 비율 유지
//                                         />
//                                     </div>
//                                     <div className="mt-2 text-center">
//                                         <p className="text-sm text-gray-500">White</p>
//                                         <h3 className="mt-1 font-semibold text-gray-900">
//                                             <a href="/shop/recomend">
//                                                 <span className="absolute "></span>
//                                                 running shoes
//                                             </a>
//                                         </h3>
//                                         <p className="mt-1 text-gray-900">$3</p>
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="mt-12 flex px-4 sm:hidden">
//                     <a href="/shop/recomend" className="text-sm font-semibold text-blue-600 hover:text-cyan-500">
//                         Search more
//                         <span aria-hidden="true"> &rarr;</span>
//                     </a>
//                 </div>
//             </div>
//         </aside>
//     );
// };

// export default MeetSideMenu;
