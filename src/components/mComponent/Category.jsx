
import exercise from '../../assets/exercise.jpg';

const Category = () => {
    return (
        <div className="flex justify-around min-h-screen">
            <div className="space-x-4 max-w-[1000px] flex flex-col items-center justify-around ml-12">
                <div className="block mb-4 border-b border-slate-300 pb-2 w-full justify-around ml-12">
                    <h2 
                        className="block w-full px-4 py-2 text-slate-700 transition-all text-left"
                    >
                        <b>모든 모임.</b> 오늘도, 소통하기 좋은 날.
                    </h2>
                </div>
                <div className='flex flex-wrap justify-around w-full'>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[30%] h-auto m-2">
                            <div className="mx-auto mt-2 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-34 w-34">
                                <img
                                    src={exercise}
                                    alt="card-image" 
                                    className="object-cover w-full h-full" 
                                />
                            </div>
                            <div className="p-1 text-center">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                        Exercise
                                    </p>
                                </div>
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">

                                    운동에 관한 모임들
                                </p>
                            </div>
                            <div className="p-1 pt-0">
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                    type="button">
                                    Go to Exercise
                                </button>
                            </div>
                        </div>
                    ))} 
                </div>
            </div>
        </div>
    );
};

export default Category;

