import React, { useState } from 'react';
import RoundedButton from '../button/RoundedButton';

const MeetJoin = ({ meetId, onSubmit, className }) => {  // className prop 추가
  const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태 관리
  const [allChecked, setAllChecked] = useState(false);
  const [personalInfoChecked, setPersonalInfoChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleAllCheck = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);
    setPersonalInfoChecked(isChecked);
    setTermsChecked(isChecked);
  };

  const handlePersonalInfoCheck = (event) => {
    const isChecked = event.target.checked;
    setPersonalInfoChecked(isChecked);
    setAllChecked(isChecked && termsChecked);
  };

  const handleTermsCheck = (event) => {
    const isChecked = event.target.checked;
    setTermsChecked(isChecked);
    setAllChecked(isChecked && personalInfoChecked);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (personalInfoChecked && termsChecked) {
      if (onSubmit) {
        onSubmit();  // 부모 컴포넌트의 함수 호출
      }
      closeModal();
    }
  };

  return (
    <>
      {/* 가입 신청 버튼 */}
      <RoundedButton onClick={openModal} className={className}>
        가입신청
      </RoundedButton>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">모임가입 동의</h2>

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

              <button
                type="submit"
                disabled={!(personalInfoChecked && termsChecked)}
                className={`w-full py-2 px-4 font-semibold text-white rounded-lg ${personalInfoChecked && termsChecked
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                동의하고 제출
              </button>
            </form>

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
