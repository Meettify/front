import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { deleteMember } from '../../../api/memberAPI';

const DeleteMemberForm = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { logout } = useAuth();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isChecked) {
            const confirmation = window.confirm('정말로 탈퇴하시겠습니까?');
            if (confirmation) {
                const result = await deleteMember(localStorage.getItem('memberId'));
                if(result.status === 200){
                    logout();
                }else{
                    alert('탈퇴에 실패하였습니다.');
                }
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg drop-shadow-lg max-w-[894px] max-h-full m-auto mt-32 mb-32">
            <h2 className="text-2xl font-bold text-red-600 mb-4">탈퇴 안내</h2>
            <p className="mb-4">
                사용하고 계신 아이디는 탈퇴할 경우 복구가 불가능합니다.
            </p>
            <p className="mb-4">
                탈퇴 후 회원님의 모든 정보는 삭제되며, 다시는 동일한 아이디로 가입할 수 없습니다.
            </p>
            <p className="text-red-500">
                가입된 모임은 자동으로 탈퇴되며, 판매 및 구매 상품은 삭제되니 탈퇴 전 취소해 주세요.
            </p>
            <p className="text-red-500 mb-6">
                또한, Meettify 서비스를 더 이상 사용할 수 없습니다.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-red-600 cursor-pointer"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <span className="ml-2 text-gray-700">
                            안내 사항을 모두 확인하였으며, 이에 동의합니다.
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className={`w-full max-w-[846px] max-h-[48px] p-3 text-white rounded-lg ${isChecked ? 'bg-red-600' : 'bg-gray-400'}`}
                    disabled={!isChecked}
                >
                    확인
                </button>
            </form>
        </div>
    );
};

export default DeleteMemberForm;
