import React from 'react';

const MeetListSearch = ({ onChange, value }) => {
    return (
        <input 
            type="text" 
            placeholder="모임 검색하기" 
            className="border p-2 rounded w-full" 
            onChange={(e) => onChange(e.target.value)} // 입력값 변경 시 호출
            value={value} // 현재 입력값 유지
        />
    );
};

export default MeetListSearch;
