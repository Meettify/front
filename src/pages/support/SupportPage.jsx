import React from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import SupportQna from "../../components/support/SupportQna";
import RoundedButton from "../../components/button/RoundedButton";
import useQuestionsStore from "../../stores/useQuestionsStore";

const SupportPage = () => {
    const { myQuestionsCount, fetchMyQuestions, questions, loading } = useQuestionsStore();
    const navigate = useNavigate();  // useNavigate로 변경

    // 샘플 공지사항 데이터
    const noticeList = [
        { id: 1, image: "https://via.placeholder.com/150", title: "test1", quantity: 1, price: 100 },
        { id: 2, image: "https://via.placeholder.com/150", title: "test2", quantity: 2, price: 200 },
    ];

    // 내 문의 목록 버튼 클릭 시
    const handleMyQuestionsClick = () => {
        navigate("/my-questions"); // 내 문의 목록 페이지로 이동
    };

    return (
        <div className="max-w-5xl mx-auto mt-12 px-4 text-left">
            <h2 className="text-4xl font-bold mb-6">
                <span className="text-black">고객센터.</span>{" "}
                <span className="text-gray-500">도움이 필요하신가요?</span>
            </h2>

            {/* 공지사항 게시판 */}
            <div className="mt-12 mb-12">
                <table className="w-full text-sm border-t border-b border-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-4 text-left">공지사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticeList.map((notice) => (
                            <tr key={notice.id} className="border-t">
                                <td className="py-2 px-4">
                                    <a
                                        href={`/notice/${notice.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {notice.title}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 버튼들 우측 정렬 */}
                <div className="mt-6 flex justify-end space-x-4">
                    {/* 문의하기 버튼 */}
                    <RoundedButton style={{ padding: '6px 14px', fontSize: '12px' }}>
                        <Link to="/contact">문의하기</Link>
                    </RoundedButton>

                    {/* 내 문의 목록 버튼 */}
                    <RoundedButton
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={handleMyQuestionsClick}  // 클릭 시 내 문의 목록 페이지로 이동
                    >
                        내 문의 목록
                    </RoundedButton>
                </div>
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
