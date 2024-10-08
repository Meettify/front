import React, { useState } from "react";
import { useAuth } from '../../../hooks/useAuth';
import AddressSearch from '../signup/AddressSearch';
import { getCheckNickName, putUpdateMember } from "../../../api/memberAPI";
import { validateNickname, validatePassword } from '../../../utils/validation';
import '../../../styles/LoginForm.css';

const EditProfileForm = () => {
    const { user } = useAuth();
    
    const [formData, setFormData] = useState({
        nickname: user.nickName || '',
        postalCode: user.memberAddr?.memberZipCode || '',
        address: user.memberAddr?.memberAddr || '',
        addressDetail: user.memberAddr?.memberAddrDetail || '',
        originalMemberPw: '',
        updateMemberPw: '',
        confirmUpdatePw: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        nickname: '',
        originalMemberPw: '',
        updateMemberPw: '',
        confirmUpdatePw: '',
    });

    const [passwordValid, setPasswordValid] = useState({
        length: false,
        hasAlphabet: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'nickname') {
            if (validateNickname(value).isValid) {
                getCheckNickName(value).then(check => {
                    setValidationErrors(prev => ({
                        ...prev,
                        nickname: check ? '' : '이미 사용 중인 닉네임입니다.'
                    }));
                });
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    nickname: '닉네임 한글, 영문만 입력 가능합니다.'
                }));
            }
        }

        if (name === 'updateMemberPw') {
            const validation = validatePassword(value);
            setPasswordValid(validation);
        }

        if (name === 'confirmUpdatePw') {
            if (formData.updateMemberPw !== value) {
                setValidationErrors(prev => ({
                    ...prev,
                    confirmUpdatePw: '비밀번호가 동일하지 않습니다.'
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    confirmUpdatePw: ''
                }));
            }
        }
    };

    const handlePostcodeComplete = (data) => {
        setFormData(prev => ({
            ...prev,
            postalCode: data.postalCode,
            address: data.address
        }));
        setIsPostcodeOpen(false);
    };

    const handleSubmit = () => {
        const updatedData = {
            nickName: formData.nickname,
            originalMemberPw: formData.originalMemberPw,
            updateMemberPw: formData.updateMemberPw,
            memberAddr: {
                memberAddr: formData.address,
                memberAddrDetail: formData.addressDetail,
                memberZipCode: formData.postalCode
            }
        };
        console.log("회원정보 수정 데이터:", updatedData);
        // 여기에 API 호출 로직 추가
    };

    const isButtonDisabled = !!validationErrors.nickname || !!validationErrors.updateMemberPw || !!validationErrors.confirmUpdatePw;

    return (
        <div className="flex flex-col items-center mt-3">
            <h2 className="text-3xl mb-8">회원정보 수정</h2>

            <input
                type="text"
                value={user.memberName}
                placeholder="이름"
                className="p-2 mb-4 w-[288px] bg-white"
                disabled
                readOnly
            />

            <input
                type="email"
                value={user.memberEmail}
                placeholder="이메일"
                className="p-2 mb-4 w-[288px] bg-white"
                disabled
                readOnly
            />

            <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="닉네임"
                className="border p-2 mb-4 w-[288px] rounded"
            />
            {validationErrors.nickname && (
                <p className="text-red-500 mb-4">{validationErrors.nickname}</p>
            )}

            <input
                type="password"
                name="originalMemberPw"
                value={formData.originalMemberPw}
                onChange={handleInputChange}
                placeholder="현재 비밀번호"
                className="border p-2 mb-4 w-[288px] rounded"
                required
            />
            {validationErrors.originalMemberPw && (
                <p className="text-red-500 mb-4">{validationErrors.originalMemberPw}</p>
            )}

            <input
                type="password"
                name="updateMemberPw"
                value={formData.updateMemberPw}
                onChange={handleInputChange}
                placeholder="새 비밀번호"
                className="border p-2 mb-4 w-[288px] rounded"
                required
            />
            {validationErrors.updateMemberPw && (
                <p className="text-red-500 mb-4">{validationErrors.updateMemberPw}</p>
            )}

            <input
                type="password"
                name="confirmUpdatePw"
                value={formData.confirmUpdatePw}
                onChange={handleInputChange}
                placeholder="새 비밀번호 확인"
                className="border p-2 mb-4 w-[288px] rounded"
                required
            />
            {validationErrors.confirmUpdatePw && (
                <p className="text-red-500 mb-4">{validationErrors.confirmUpdatePw}</p>
            )}

            <div className="flex w-72 gap-5 border border-gray-300 rounded mb-4">
                <input
                    className="w-40 p-2 rounded"
                    type="text"
                    placeholder="우편번호"
                    value={formData.postalCode}
                    readOnly
                />
                <AddressSearch onComplete={handlePostcodeComplete} />
            </div>

            <input
                type="text"
                value={formData.address}
                placeholder="주소"
                className="border p-2 mb-4 w-72 rounded"
                readOnly
            />

            <input
                type="text"
                name="addressDetail"
                value={formData.addressDetail}
                onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                placeholder="상세주소"
                className="border p-2 mb-4 w-[288px] rounded"
                required
            />

            <button
                onClick={handleSubmit}
                className={`p-2 w-[288px] text-white ${isButtonDisabled ? 'bg-blue-300' : 'bg-blue-500'}`}
                disabled={isButtonDisabled}
            >
                수정
            </button>
        </div>
    );
};

export default EditProfileForm;
