import React from "react";

const MemberDetailModal = ({ isOpen, onClose, selectedMember }) => {
    if (!isOpen || !selectedMember) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${
            date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
        }.${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="p-6 rounded-lg shadow-lg max-w-lg w-full bg-gray-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-center items-center mb-4">
                    <h1 className="text-[30px] font-bold">회원 상세</h1>
                </div>
                <hr className="mt-2 mb-2 border-gray-300"/>

                {/* 회원 정보 */}
                <h1 className="font-bold text-left text-[24px] mb-2">회원 정보</h1>
                <div className="mb-4 text-left bg-gray-50 p-5 rounded-md">
                    <p>
                        <span className="font-bold">가입 날짜:</span>{" "}
                        {formatDate(selectedMember.createdAt)}
                    </p>
                    <p>
                        <span className="font-bold">회원 등급:</span>{" "}
                        {selectedMember.memberRole}
                    </p>
                    <p>
                        <span className="font-bold">회원 이름:</span>{" "}
                        {selectedMember.memberName}
                    </p>
                    <p>
                        <span className="font-bold">회원 닉네임:</span>{" "}
                        {selectedMember.nickName}
                    </p>
                    <p>
                        <span className="font-bold">회원 이메일:</span>{" "}
                        {selectedMember.memberEmail}
                    </p>
                    
                    
                </div>

                <hr className="border-gray-300 my-4" />

                {/* 회원 주소 */}
                <h2 className="font-bold text-left text-[24px] mb-2">회원 주소</h2>
                <div className="mb-4 text-left bg-gray-50 p-5 rounded-md">
                    <p>
                        <span className="font-bold">우편 번호:</span>{" "}
                        {selectedMember.memberAddr?.memberZipCode}
                    </p>
                    <p>
                        <span className="font-bold">회원 주소:</span>{" "}
                        {selectedMember.memberAddr?.memberAddr}
                    </p>
                    <p>
                        <span className="font-bold">상세 주소:</span>{" "}
                        {selectedMember.memberAddr?.memberAddrDetail}
                    </p>
                </div>
                <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-2 px-4 rounded-md mt-4 transition-colors duration-200"
                    onClick={onClose}
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default MemberDetailModal;
