import React from "react";

const ChatIcon = ({ className }) => (
    // <svg
    //     className={`w-9 h-9 ${className}`}
    //     aria-hidden="true"
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="currentColor"
    //     viewBox="0 0 24 24"
    // >
    //     <path
    //         fillRule="evenodd"
    //         d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
    //         clipRule="evenodd"
    //     />
    // </svg>

    <svg
        className={`w-9 h-9 ${className}`} // Tailwind CSS 클래스를 적용할 수 있도록 설정
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            strokeLinecap="round" // React에서 stroke-linecap 대신 strokeLinecap 사용
            strokeLinejoin="round" // React에서 stroke-linejoin 대신 strokeLinejoin 사용
            strokeWidth="1.5" // React에서 stroke-width 대신 strokeWidth 사용
            d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
        />
    </svg>
);

export default ChatIcon;