import React from "react";
import useNavigation from "../../hooks/useNavigation";
import RoundedButton from "../button/RoundedButton";

const MeetPost = () => {
    const { goToPostWrite, goToPostDetail } = useNavigation();

    const handleButtonClick = (event) => {
        event.stopPropagation(); // 이벤트 전파 방지
        goToPostWrite(); // 게시글 작성하기 페이지로 이동
    };

    const handleRowClick = (pageId) => {
        goToPostDetail(pageId); // 해당 게시글 상세 페이지로 이동
    };

    return (
        <div className="container mx-auto mt-20 w-2/3">
            <div className="text-4xl font-bold mb-6 text-left"> 모임 게시판</div>
            <div className="bg-gray-100 p-6 rounded-md mb-6 text-left max-w-7xl">
                <p className="text-lg mb-2">
                    유용한 답변을 다른 사람들과도 공유하고 싶으신가요? 그렇다면 추천 기능을 이용해 보세요!
                </p>
                <p className="text-sm text-gray-700">
                    회원님이 문제를 해결할 수 있도록 도움을 주신 분이 있으신가요? 아니면 다른 사람의 답변이 도움이 되었다면 추천해 주세요.
                    <a href="#" className="text-blue-500 ml-1"> 모임 더 알아보기 - Meettify 커뮤니티</a>
                </p>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div></div>
                <div className="flex space-x-2">
                    <RoundedButton onClick={handleButtonClick}>글쓰기</RoundedButton>
                </div>
            </div>

            <table className="w-full table-fixed border-t border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-center font-medium w-1/12">번호</th>
                        <th className="p-3 text-left font-medium w-5/12">제목</th>
                        <th className="p-3 text-center font-medium w-2/12">작성자</th>
                        <th className="p-3 text-center font-medium w-2/12">작성일</th>
                        <th className="p-3 text-center font-medium w-1/12">조회수</th>
                        <th className="p-3 text-center font-medium w-1/12">답글</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(7)].map((_, index) => (
                        <tr 
                            key={index} 
                            className="border-b border-gray-200 hover:bg-gray-50" 
                            onClick={() => handleRowClick(index + 1)} // 클릭 시 게시글 ID 전달
                        >
                            <td className="p-3 text-center">{index + 1}</td>
                            <td className="p-3 text-left">글 제목 {index + 1}</td>
                            <td className="p-3 text-center">작성자 {index + 1}</td>
                            <td className="p-3 text-center">2024. 10. 01</td>
                            <td className="p-3 text-center">13</td>
                            <td className="p-3 text-center">3</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-6">
                <nav className="flex space-x-1">
                    <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">1</button>
                </nav>
            </div>
        </div>
    );
};

export default MeetPost;