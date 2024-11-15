import React, { useEffect, useState } from 'react';
import useNavigation from '../../../hooks/useNavigation';
import { getMyInquiryList } from '../../../api/memberAPI';

const MyInquiryList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const sort = 'desc';
  const { goToHome } = useNavigation();


  const fetchQuestions = async (page = 0, size = 10, sortOrder = 'desc') => {
    try {
      const response = await getMyInquiryList(page, size, sortOrder);
      setQuestions(response.contents);
      setTotalPages(response.totalPage);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  
  useEffect(() => {
    fetchQuestions(currentPage -1, pageSize, sort);
  }, [currentPage])

  const handleDetailClick = (questionId) => {
    console.log("문의 디테일", questionId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `
      ${date.getFullYear()}.
      ${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)}.
      ${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}`;
  };

  return (
    <div className='ml-5'>
      <h2 className="text-2xl font-semibold mb-10 text-left">내가 작성한 문의</h2>
      <div className="overflow-hidden">
        <table className="w-11/12 bg-white border border-gray-200">
          <thead>
            <tr className='border-b'>
              <th className="w-1/8 px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500">No</th>
              <th className="w-3/5 px-6 py-3 border-r border-l bg-gray-50 text-center text-sm font-medium text-gray-500">제목</th>
              <th className="w-1/4 px-6 py-3 border-r bg-gray-50 text-center text-sm font-medium text-gray-500">작성일</th>
              <th className='w-full px-6 py-3 bg-gray-50 text-center text-sm font-medium text-gray-500' >상태</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <tr key={question.questionId} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-700 text-sm">{questions.length - index}</td>
                  <td className="px-6 py-4 text-blue-500 text-sm  text-left" >
                    <p className='cursor-pointer w-fit' onClick={() => handleDetailClick(question.questionId)}>{question.title}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-sm">{formatDate(question.regTime)}</td>
                  <td className={`px-6 py-4 ${question.replyStatus ? 'text-green-500' : 'text-gray-500'} text-left`}>
                    {question.replyStatus ? '답변완료' : '답변대기'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-sm">
                  작성한 문의가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2 w-4/5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyInquiryList;