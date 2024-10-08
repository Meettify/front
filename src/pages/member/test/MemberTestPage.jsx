import { Link } from "react-router-dom";
import React from "react";

const MemberTestPage = () => {
    return (
        <>
            <h1>Member Test Page</h1>
            <p>이 페이지에서 회원 정보를 테스트할 수 있습니다.</p>

            <Link to="/memberinfo">Go to Member Info</Link>
        </>
    );
};

export default MemberTestPage;