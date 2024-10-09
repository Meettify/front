import React from "react";
import running from '../../assets/images/meet/running.jpg';

const MeetSideMenu = () => {
    return (
        <div className="w-1/6">
            <aside className="bg-gray-200 h-full flex flex-col justify-center items-center"> 
                <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 w-full">
                    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-0">
                        <h3 className="text-xl tracking-tight text-gray-900 text-center">오늘의 쇼핑. 당신에게 추천하는 제품.</h3>
                        <a href="shop/recomend" className="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
                            Search more
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <div className="mt-8">
                        <div className="-mb-6 w-full overflow-x-auto pb-6">
                            <ul role="list" className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-1 lg:gap-x-8 lg:space-x-0 justify-center">
                                <li className="inline-flex flex-col text-center lg:w-auto">
                                    <div className="group w-full max-w-xs">
                                        <div className="w-full h-30 overflow-hidden rounded-md bg-gray-200 flex justify-center items-center">
                                            <img 
                                                src={running} 
                                                alt="running" 
                                                className="w-full h-full object-contain"
                                                style={{ maxHeight: '100%', maxWidth: '100%' }} // 비율 유지
                                            />
                                        </div>
                                        <div className="mt-2 text-center"> {/* 간격 조정: mt-6에서 mt-4로 변경 */}
                                            <p className="text-sm text-gray-500">White</p>
                                            <h3 className="mt-1 font-semibold text-gray-900">
                                                <a href="/shop/recomend">
                                                    <span className="absolute "></span>
                                                    running shoes
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-gray-900">$3</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex px-4 sm:hidden">
                        <a href="/shop/recomend" className="text-sm font-semibold text-blue-600 hover:text-cyan-500">
                            Search more
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default MeetSideMenu;
