import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SupportQna from '../../components/support/SupportQna';
import RoundedButton from '../../components/button/RoundedButton';
import useQuestionsStore from '../../stores/useQuestionsStore';
import useNoticeStore from '../../stores/useNoticeStore';

const SupportPage = () => {
    const { myQuestionsCount, fetchMyQuestions, questions, loading } = useQuestionsStore();
    const { notices, fetchNotices, loading: noticesLoading } = useNoticeStore();
    const navigate = useNavigate();

    // 공지사항 목록 가져오기
    useEffect(() => {
        fetchNotices(); // Zustand 상태 갱신
    }, [fetchNotices]);

    const handleMyQuestionsClick = () => {
        navigate('/my-questions');
    };

    return (
        <div className="max-w-5xl mx-auto mt-4 px-2 text-left">
            <h2 className="text-4xl font-bold mb-6">
                <span className="text-black">고객센터.</span>{' '}
                <span className="text-gray-500">도움이 필요하신가요?</span>
            </h2>

            <div className="mt-6 mb-6">
                <table className="w-full text-sm border-t border-b border-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-4 text-left text-[14px]">공지사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticesLoading ? (
                            <tr>
                                <td className="py-2 px-4">로딩 중...</td>
                            </tr>
                        ) : (
                            notices.map((notice) => (
                                <tr key={notice.noticeId} className="border-t">
                                    <td className="py-2 px-4">
                                        <Link
                                            to={`/notice/${notice.noticeId}`}
                                            className="text-black hover:underline"
                                        >
                                            {notice.title}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
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

            <div className="text-4xl font-bold mb-6">자주 묻는 질문</div>
            <div className="border-t border-gray-300">
                <SupportQna question="회원가입은 어디서 하나요?">
                    <p className="text-gray-600 text-sm">홈페이지 상단의 "회원가입" 버튼을 클릭한 후, <br />
                        이메일과 비밀번호를 입력하여 회원가입을 완료할 수 있습니다. <br />
                        가입 후 다양한 기능을 이용하실 수 있습니다.</p>
                </SupportQna>
                <SupportQna question="소모임에 어떻게 가입하나요?">
                    <p className="text-gray-600 text-sm">소모임 페이지에서 원하는 소모임을 선택하고 <br />
                        "가입하기" 버튼을 클릭하여 가입 신청을 할 수 있습니다. <br />
                        소모임 관리자가 승인하면 참여가 가능합니다.</p>
                </SupportQna>
                <SupportQna question="상품을 어떻게 주문하나요?">
                    <p className="text-gray-600 text-sm">상품 페이지에서 원하는 상품을 선택하고, <br />
                        "장바구니에 담기" 또는 "구매하기" 버튼을 클릭하여 주문 절차를 진행할 수 있습니다. <br />
                        결제 후 상품을 확인할 수 있습니다.</p>
                </SupportQna>
                <SupportQna question="소모임 활동 중 상품을 구매할 수 있나요?">
                    <p className="text-gray-600 text-sm">네, 소모임에 참여하면서 관련된 상품을 구매할 수 있습니다. <br />
                        소모임 카테고리에서 관련 상품을 찾아 바로 주문할 수 있습니다.</p>
                </SupportQna>
                <SupportQna question="주문한 상품은 언제 배송되나요?">
                    <p className="text-gray-600 text-sm">주문한 상품은 결제 완료 후 2~3일 내에 배송됩니다. <br />
                        배송 현황은 "내 주문" 페이지에서 확인할 수 있습니다.</p>
                </SupportQna>
                {/* 추가 SupportQna 생략 */}
            </div>
        </div>
    );
};

export default SupportPage;