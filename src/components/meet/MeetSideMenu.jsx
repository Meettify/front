import React from 'react';
import running from '../../assets/images/meet/running.jpg';

const MeetSideMenu = ({ className }) => {
    return (
        <div className={`bg-gray-200 h-full ${className}`}>
            <aside className="bg-gray-200 h-full"> 
                <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                        <h3 className="text-xl tracking-tight text-gray-900">오늘의 쇼핑. 당신에게 추천하는 제품.</h3>
                        <a href="shop/recomend" className="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
                            Search more
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <div className="mt-8">
                        <div className="w-full overflow-hidden pb-6">
                            <ul role="list" className="mx-auto flex flex-wrap justify-center space-x-4">
                                <li className="inline-flex flex-col text-center">
                                    <div className="group w-64">
                                        <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200">
                                            <img 
                                                src={running} 
                                                alt="running" 
                                                className="h-full w-full object-contain object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="mt-6">
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
                                {/* 추가 아이템이 필요하다면 이곳에 더 추가하세요 */}
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
