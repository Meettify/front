// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';

const SearchBar = ({ searchTerm, setSearchTerm, closeSearch }) => {
    const [input, setInput] = useState(searchTerm);  // searchTerm으로 초기화
    const navigate = useNavigate();

    useEffect(() => {
        setInput(searchTerm);  // 부모로부터 받은 searchTerm을 입력에 반영
    }, [searchTerm]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
        setSearchTerm(event.target.value);  // 부모 상태 업데이트
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.trim()) {
            navigate(`/search?totalKeyword=${encodeURIComponent(input.trim())}`);
            closeSearch();  // 검색 후 검색창 닫기
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && input.trim()) {
            navigate(`/search?totalKeyword=${encodeURIComponent(input.trim())}`);
            closeSearch();  // 엔터키로 검색 후 검색창 닫기
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="검색어를 입력하세요..."
                    className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-r-md hover:from-blue-600 hover:to-blue-700 transition shadow-lg flex items-center">
                    <LuSearch size={20} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;





// import React, { useState } from 'react';
// import { LuSearch } from 'react-icons/lu'; 
// import { useNavigate } from 'react-router-dom'; 
// import useSearchStore from '../../stores/useSearchStore';

// const SearchBar = () => {
//     const { closeSearch } = useSearchStore();
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const handleInputChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (searchTerm.trim()) {  // 검색어가 비어있지 않은 경우에만 실행
//             navigate(`/search?totalKeyword=${encodeURIComponent(searchTerm.trim())}`);
//             setSearchTerm('');  // 검색 후 입력 필드 비우기
//             closeSearch();  // 검색 창 닫기
//         }
//     };

//     return (
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <form onSubmit={handleSubmit} className="flex">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     placeholder="검색어를 입력하세요..."
//                     className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
//                 />
//                 <button 
//                     type="submit" 
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-r-md hover:from-blue-600 hover:to-blue-700 transition shadow-lg flex items-center">
//                     <LuSearch size={20} />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SearchBar;
