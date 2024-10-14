import React from 'react';

const MeetListSearch = ({ onChange }) => {
    return (
        <input 
            type="text" 
            placeholder="모임 검색하기" 
            className="border p-2 rounded w-full" 
            onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 호출
        />
    );
};

export default MeetListSearch;
