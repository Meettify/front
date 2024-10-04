import React from "react";
import useNavigation  from '../../../hooks/useNavigation'

const SignupSuccessPage = () => {
    const { goToHome } = useNavigation();

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <h1>회원가입 성공!</h1>
            <p className="m-10">환영합니다! 회원가입에 성공하였습니다.</p>
            <button 
                className="border border-blue-300 bg-blue-500 text-white w-[144px] h-[44px] rounded mt-5 text-xl"
                onClick={goToHome}>
                홈페이지
            </button>
        </div>
    );
};

export default SignupSuccessPage;
