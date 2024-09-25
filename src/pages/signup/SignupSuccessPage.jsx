import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>회원가입 성공!</h1>
            <p className="m-20">환영합니다! 회원가입에 성공하였습니다.</p>
            <button onClick={() => navigate("/")}>
                홈페이지
            </button>
        </div>
    );
};

export default SignupSuccessPage;
