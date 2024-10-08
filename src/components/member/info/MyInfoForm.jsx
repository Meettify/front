import React, { useState } from "react";
import { useAuth } from '../../../hooks/useAuth';

const MyInfoForm = ({ onPasswordMatch }) => {
    const { user } = useAuth();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => {
        setEnteredPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        console.log(`user.memberPw : ${user.memberPw}`);
        console.log(`user.enteredPassword : ${enteredPassword}`);
        if (enteredPassword === user.memberPw) {
            onPasswordMatch(true);  // 비밀번호 일치 시
            setError('');
        } else {
            onPasswordMatch(false);  // 비밀번호 불일치 시
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold text-center">회원정보를 변경하려면 비밀번호를 입력해주세요</h2>

            <input
                type="password"
                className="p-2 w-[288px] mx-auto border border-gray-300 rounded-md block"
                placeholder="비밀번호"
                value={enteredPassword}
                onChange={handlePasswordChange}
            />

            <button 
                className="p-2 w-[288px] mx-auto bg-blue-500 text-white rounded-md block"
                onClick={handlePasswordSubmit}
            >
                확인
            </button>
            
            {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
    );
};

export default MyInfoForm;
