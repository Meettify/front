import React from "react";
import SupportQna from "../../components/support/SupportQna";

const SupportPage = () => {
    return (
        <div className="max-w-5xl mx-auto mt-12 px-4 text-left">
            <h2 className="text-4xl font-bold mb-6">
                <span className="text-black">고객센터.</span> <span className="text-gray-500">도움이 필요하신가요?</span>
            </h2>

            <div className="text-2xl font-bold mb-6">어떤 문제가 있는지 입력해주세요.</div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="문의 검색하기"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
            </div>

            <div className="text-2xl font-bold mb-6">자주 묻는 질문</div>
            <div className="border-t border-gray-300">
                <SupportQna question="질문1">
                    <p>첫 번째 답변 목록이야</p>
                </SupportQna>
                <SupportQna question="질문2">
                    <p>두 번째 답변 목록이고</p>
                </SupportQna>
                <SupportQna question="질문3">
                    <p>세 번째 답변 목록일걸?</p>
                </SupportQna>
                <SupportQna question="질문4">
                    <p>네 번째 답변 목록이겠지</p>
                </SupportQna>
                <SupportQna question="질문5">
                    <p>다섯 번째 답변 목록 끝</p>
                </SupportQna>
            </div>
        </div>
    );
};

export default SupportPage;
