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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) { // 검색어가 비어있지 않은 경우에만 실행
            navigate(`/search?totalKeyword=${encodeURIComponent(searchTerm)}`);
            setSearchTerm(''); // 검색 후 입력 필드 비우기
            closeSearch(); // 검색 창 닫기
        }
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
