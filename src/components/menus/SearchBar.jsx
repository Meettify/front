import React, { useState } from 'react';
import { LuSearch } from 'react-icons/lu'; 
import { useNavigate } from 'react-router-dom'; 
import useSearchStore from '../../stores/useSearchStore';

const SearchBar = () => {
    const { closeSearch } = useSearchStore();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);

        // 검색어가 입력될 때마다 조건에 따라 페이지를 이동할 수 있습니다.
        if (event.target.value.length > 2) { // 예: 3글자 이상일 때
            navigate(`/search?query=${encodeURIComponent(event.target.value)}`);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm('');
        closeSearch();
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
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
