import React from "react";

const MyInfoSidebar = ({ onChangeForm }) => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center gap-2">
            <button 
                className={'p-2 mt-5 w-3/4 rounded bg-yellow-500 text-white'} 
                onClick={() => onChangeForm('editProfile')}
            >
                회원정보 수정
            </button>
            
            <button 
                className={'p-2 w-3/4 rounded bg-red-500 text-white'} 
                onClick={() => onChangeForm('deleteMember')}
            >
                회원 탈퇴
            </button>
            
        </div>
    );
};

export default MyInfoSidebar;
