import React, { useState } from 'react';
import RoundedButton from '../button/RoundedButton';

const MeetJoin = ({ meetId, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리
  const [allChecked, setAllChecked] = useState(false);
  const [personalInfoChecked, setPersonalInfoChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  // '모두 동의' 체크박스 처리
  const handleAllCheck = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);
    setPersonalInfoChecked(isChecked);
    setTermsChecked(isChecked);
  };

  // 개별 체크박스 처리
  const handlePersonalInfoCheck = (event) => {
    setPersonalInfoChecked(event.target.checked);
  };

  const handleTermsCheck = (event) => {
    setTermsChecked(event.target.checked);
  };

  const openModal = () => setIsModalOpen(true);  // 모달 열기
  const closeModal = () => setIsModalOpen(false);  // 모달 닫기

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personalInfoChecked && termsChecked) {
      alert('가입이 신청되었습니다.');
      if (onSubmit) {
        onSubmit();  // 부모 컴포넌트의 함수 호출
      }
      closeModal();  // 모달 닫기
    }
  };

  return (
    <>
      {/* 가입 신청 버튼 (모달을 열기 위한 트리거) */}
      <RoundedButton onClick={openModal}>
        가입신청
      </RoundedButton>

      {/* 모달창 */}
      {isModalOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"> {/* max-w-md를 사용하여 최대 너비 설정 */}
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">모임가입 동의</h2>
                
                {/* 모두 동의 체크박스 */}
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="allCheck"
                        checked={allChecked}
                        onChange={handleAllCheck}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allCheck" className="ml-2 text-sm text-gray-600 font-semibold">
                        모두 동의합니다.
                    </label>
                </div>

                {/* 개인정보 수집 및 이용 동의 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="personalInfoCheck"
                            checked={personalInfoChecked}
                            onChange={handlePersonalInfoCheck}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="personalInfoCheck" className="ml-2 text-sm text-gray-600">
                            개인정보 수집 및 이용에 대한 동의
                        </label>
                    </div>
                    <p className="text-gray-500 text-xs ml-6">
                        소모임 서비스 이용을 위해 이름, 이메일 등 필요한 개인정보를 수집하며, 이는 소모임 운영을 위해서만 사용됩니다.
                    </p>
                </div>

                {/* 서비스 이용 약관 동의 */}
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="termsCheck"
                            checked={termsChecked}
                            onChange={handleTermsCheck}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="termsCheck" className="ml-2 text-sm text-gray-600">
                            서비스 이용 약관 동의
                        </label>
                    </div>
                    <p className="text-gray-500 text-xs ml-6">
                        소모임의 서비스 이용에 관련된 기본적인 규칙과 정책에 동의합니다. 이는 원활한 커뮤니티 운영을 위한 사항입니다.
                    </p>
                </div>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    disabled={!(personalInfoChecked && termsChecked)}
                    className={`w-full py-2 px-4 font-semibold text-white rounded-lg ${
                        personalInfoChecked && termsChecked
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    동의하고 제출
                </button>
            </form>

            {/* 모달 닫기 버튼 */}
            <div className="flex justify-end mt-4">
                <RoundedButton onClick={closeModal} style={{ backgroundColor: 'red', color: 'white' }}>
                    취소
                </RoundedButton>
            </div>
        </div>
    </div>
)}

    </>
  );
};

export default MeetJoin;
