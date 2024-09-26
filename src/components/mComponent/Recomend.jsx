
import running from "../../assets/running.jpg"

const Recomend = () => {
    return(
        <div class="bg-white">
        <div class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
            <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
            <h3 class="text-xl tracking-tight text-gray-900">오늘의 쇼핑. 당신에게 추천하는 제품.</h3>
            <a href="#" class="hidden text-sm font-semibold text-blue-600 hover:text-cyan-500 sm:block">
                Search more
                <span aria-hidden="true"> &rarr;</span>
            </a>
            </div>


            <div class=" mt-8">
            <div class=" -mb-6 w-full overflow-x-auto pb-6">
                <ul role="list" class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0">
                <li class="inline-flex flex-col text-center lg:w-auto">
                    <div class="group w-64">
                    <div class="w-full h-64 overflow-hidden rounded-md bg-gray-200">
                        <img src={running} alt="running" class="h-full w-full object-contain object-center group-hover:opacity-75"/>
                    </div>
                    <div class="mt-6">
                        <p class="text-sm text-gray-500">White</p>
                        <h3 class="mt-1 font-semibold text-gray-900">
                        <a href="#">

                            <span class="absolute "></span>

                            running shoes
                        </a>
                        </h3>
                        <p class="mt-1 text-gray-900">$3</p>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
            </div>

            <div class="mt-12 flex px-4 sm:hidden">
            <a href="#" class="text-sm font-semibold text-blue-600 hover:text-cyan-500">
                Search more
                <span aria-hidden="true"> &rarr;</span>
            </a>
            </div>
        </div>
        </div>
    );
};
export default Recomend;