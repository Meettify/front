import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SupportQna from "../../components/support/SupportQna";
import RoundedButton from "../../components/button/RoundedButton";
import useQuestionsStore from "../../stores/useQuestionsStore";

const SupportPage = () => {
  const { fetchMyQuestions } = useQuestionsStore();
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/notice/noticeList?page=${page}&size=5`
      );
      const data = await res.json();
      setNotices(data.communities || []);
      setTotalPages(data.totalPage || 1);
    } catch (err) {
      console.error("공지사항 불러오기 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const handleMyQuestionsClick = () => {
    navigate("/my-questions");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full px-4 py-8">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-black">고객센터.</span>{" "}
            <span className="text-gray-500">도움이 필요하신가요?</span>
          </h2>

          {/* 공지사항 테이블 */}
          <div className="mt-6 mb-6">
            <table className="w-full text-sm border-t border-b border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-4 text-left w-[10%]">번호</th>
                  <th className="py-2 px-4 text-left w-[70%]">제목</th>
                  <th className="py-2 px-4 text-left w-[20%]">작성일</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-2 px-4">
                      로딩 중...
                    </td>
                  </tr>
                ) : (
                  notices.map((notice, idx) => (
                    <tr key={notice.noticeId} className="border-t">
                      <td className="py-2 px-4">{page * 5 + idx + 1}</td>
                      <td className="py-2 px-4">
                        <Link
                          to={`/notice/${notice.noticeId}`}
                          className="text-black hover:underline"
                        >
                          {notice.title}
                        </Link>
                      </td>
                      <td className="py-2 px-4 text-gray-500 text-sm">
                        {notice.regTime}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* 페이징 네비게이션 */}
            <div className="mt-4 flex justify-center space-x-2 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>

            {/* 문의 버튼 */}
            <div className="mt-6 flex justify-end space-x-4">
              <RoundedButton style={{ padding: "6px 14px", fontSize: "12px" }}>
                <Link to="/contact">문의하기</Link>
              </RoundedButton>
              <RoundedButton
                style={{ padding: "6px 14px", fontSize: "12px" }}
                onClick={handleMyQuestionsClick}
              >
                내 문의 목록
              </RoundedButton>
            </div>
          </div>

          {/* 자주 묻는 질문 */}
          <div className="text-4xl font-bold mb-6">자주 묻는 질문</div>
          <div className="border-t border-gray-300">
            <SupportQna question="회원가입은 어디서 하나요?">
              <p className="text-gray-600 text-sm">
                홈페이지 상단의 "회원가입" 버튼을 클릭한 후, 이메일과 비밀번호를
                입력하여 회원가입을 완료할 수 있습니다.
              </p>
            </SupportQna>
            <SupportQna question="소모임에 어떻게 가입하나요?">
              <p className="text-gray-600 text-sm">
                소모임 페이지에서 원하는 소모임을 선택하고 "가입하기" 버튼을
                클릭하여 신청할 수 있습니다.
              </p>
            </SupportQna>
            <SupportQna question="상품을 어떻게 주문하나요?">
              <p className="text-gray-600 text-sm">
                상품 페이지에서 상품을 선택하고 "장바구니 담기" 또는 "구매하기"
                버튼을 클릭하여 주문할 수 있습니다.
              </p>
            </SupportQna>
            <SupportQna question="주문한 상품은 언제 배송되나요?">
              <p className="text-gray-600 text-sm">
                주문 후 2~3일 이내 배송됩니다. 배송 현황은 "내 주문" 페이지에서
                확인 가능합니다.
              </p>
            </SupportQna>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
