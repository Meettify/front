import exercise from '../../assets/exercise.jpg';

const List = () => {
    return (
        <div className="w-2/3">
            <div className="flex justify-around min-h-screen">
                <div className="space-x-4 max-w-[1000px] flex flex-col items-center justify-around ml-12">
                    <div className="block mb-4 border-b border-slate-300 pb-2 w-full">
                        <h2 
                            className="text-slate-700 transition-all text-left text-2xl"
                        >
                            <b>Meettify , </b> 당신의 선택은?
                        </h2>
                        <div className="flex justify-between items-center px-4 mt-2">
                            <h4 className="text-left">
                                <b># 운동</b>
                            </h4>
                            <button 
                                type='button' 
                                className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition-colors duration-200 min-w-[100px]"
                            >
                                모임 생성
                            </button>
                        </div>
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
                                            (모임명)
                                        </p>
                                    </div>
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 ">
                                        (모임설명)
                                    </p>
                                </div>
                                <div className="p-1 pt-0">
                                    <button
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-2 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                        type="button">
                                        Go to (모임명)
                                    </button>
                                </div>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
