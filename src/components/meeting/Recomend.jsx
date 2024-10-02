
import running from "../../assets/running.jpg"

const Recomend = () => {
    return(
        <div className="w-1/3"> {/* Recomend 컴포넌트의 너비를 1/3로 설정 */}
            <div className="bg-white">
                <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
                        <h3 className="text-xl tracking-tight text-gray-900">오늘의 쇼핑. 당신에게 추천하는 제품.</h3>
                        <a href="#" className="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
                            Search more
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <div className=" mt-8">
                        <div className=" -mb-6 w-full overflow-x-auto pb-6">
                            <ul role="list" className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
                                <li className="inline-flex flex-col text-center lg:w-auto">
                                    <div className="group w-64">
                                        <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200">
                                            <img src={running} alt="running" className="h-full w-full object-contain object-center group-hover:opacity-75"/>
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-sm text-gray-500">White</p>
                                            <h3 className="mt-1 font-semibold text-gray-900">
                                            <a href="#">
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
                        <a href="#" className="text-sm font-semibold text-blue-600 hover:text-cyan-500">
                            Search more
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Recomend;