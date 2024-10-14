import React, { useState } from "react";
import { useAuth } from '../../../hooks/useAuth';
import AddressSearch from '../signup/AddressSearch';
import { getCheckNickName, putUpdateMember } from "../../../api/memberAPI";
import { validateNickname, validatePassword } from '../../../utils/validation';
import useNavigation from "../../../hooks/useNavigation";
import '../../../styles/LoginForm.css';

const EditProfileForm = () => {
    const { user } = useAuth();
    const { goToHome } = useNavigation();
    
    const [formData, setFormData] = useState({
        nickname: user?.nickName ?? '',
        postalCode: user?.memberAddr?.memberZipCode ?? '',
        address: user?.memberAddr?.memberAddr ?? '',
        addressDetail: user?.memberAddr?.memberAddrDetail ?? '',
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

    const [passwordMatch, setPasswordMatch] = useState('');
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const handleUpdateMemberPwChange = (e) => {
        const updateMemberPw = e.target.value;
        setFormData(prev => ({ ...prev, updateMemberPw }));
        const validation = validatePassword(updateMemberPw);
        setPasswordValid(validation);
    
        if (formData.confirmUpdatePw) {
          if (updateMemberPw === formData.confirmUpdatePw) {
            setPasswordMatch('비밀번호가 동일합니다.');
          } else {
            setPasswordMatch('비밀번호가 동일하지 않습니다.');
          }
        } else {
          setPasswordMatch(''); 
        }
      };
    
    const handleConfirmUpdatePwChange = (e) => {
        const confirmUpdatePw = e.target.value;
        setFormData(prev => ({ ...prev, confirmUpdatePw }));

        if (formData.updateMemberPw) {
            if (formData.updateMemberPw === confirmUpdatePw) {
            setPasswordMatch('비밀번호가 동일합니다.');
            setValidationErrors(prev => ({ ...prev, confirmUpdatePw: '' }));
            } else {
            setPasswordMatch('비밀번호가 동일하지 않습니다.');
            setValidationErrors(prev => ({ ...prev, confirmUpdatePw: '비밀번호가 동일하지 않습니다.' }));
            }
        } else {
            setPasswordMatch(''); 
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'nickname') {

            if (value === user.nickName){
                return;
            }

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
                    nickname: '닉네임은 한글, 영문만 입력 가능합니다.'
                }));
            }
        }

        if (name === 'updateMemberPw') {
            const validation = validatePassword(value);
            handleUpdateMemberPwChange(e)
            if(value !== '' && formData.originalMemberPw === value){
                setValidationErrors(prev => ({ ...prev, updateMemberPw: (validation.isValid) ? '기존 비밀번호는 사용할 수 없습니다.' : '' }));    
            } else{
                setValidationErrors(prev => ({ ...prev, updateMemberPw: (validation.isValid) ? '' : '비밀번호 필수 조건을 확인해주세요' }));
            }
        }

        if (name === 'confirmUpdatePw') {
            handleConfirmUpdatePwChange(e);
        }
    };

    const getValidationClass = (fieldName) => {
        if (validationErrors[fieldName]) {
            return 'invalid';
        } else if(fieldName === 'confirmUpdatePw'){
            if(!passwordMatch){
                return 'border-gray-300';
            }else{
                return passwordMatch.includes('동일하지') ? 'invalid' : 'valid';
            }
        }else if (formData[fieldName]) {
            return 'valid';
        }
        return '';
    };

    const handlePostcodeComplete = (data) => {
        setFormData(prev => ({
            ...prev,
            postalCode: data.postalCode,
            address: data.address
        }));
        setIsPostcodeOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateMemberDTO = {
            nickName: formData.nickname,
            originalMemberPw: formData.originalMemberPw,
            updateMemberPw: formData.updateMemberPw,
            memberAddr: {
                memberAddr: formData.address,
                memberAddrDetail: formData.addressDetail,
                memberZipCode: formData.postalCode
            }
        };
        const result = await putUpdateMember(localStorage.getItem('memberId'), updateMemberDTO);

        if (result.status === 200){
            alert('성공적으로 변경되었습니다.')
            goToHome();
        } else{
            alert('변경에 실패하였습니다.')
        }
    };

    const isButtonDisabled = Object.values(validationErrors).every(error => error === '' || error === undefined) 
    && Object.values(formData).every(field => field !== '');

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="text-3xl mb-8">회원정보 수정</h2>

                <input
                    type="text"
                    value={user.memberName}
                    placeholder="이름"
                    disabled
                    readOnly
                />

                <input
                    type="email"
                    value={user.memberEmail}
                    placeholder="이메일"
                    disabled
                    readOnly
                />

                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    placeholder="닉네임"
                    className={getValidationClass('nickname')}
                />
                {validationErrors.nickname && <p className="error-message">{validationErrors.nickname}</p>}

                <input
                    type="password"
                    name="originalMemberPw"
                    value={formData.originalMemberPw}
                    onChange={handleInputChange}
                    placeholder="현재 비밀번호"
                    className={getValidationClass('originalMemberPw')}
                    required
                />

                <input
                    type="password"
                    name="updateMemberPw"
                    value={formData.updateMemberPw}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={handleInputChange}
                    placeholder="새 비밀번호"
                    className={getValidationClass('updateMemberPw')}
                    required
                />
                {validationErrors.updateMemberPw && <p className="error-message">{validationErrors.updateMemberPw}</p>}

                {passwordFocused && (
                <div className="password-popup top-[390px]">
                    <p>비밀번호 필수 조건</p>
                        <ul>
                            <li className={passwordValid.length ? 'valid' : ''}>8자 ~ 20자</li>
                            <li className={passwordValid.hasAlphabet ? 'valid' : ''}>알파벳 포함</li>
                            <li className={passwordValid.hasNumber ? 'valid' : ''}>숫자 포함</li>
                            <li className={passwordValid.hasSpecialChar ? 'valid' : ''}>특수 문자 포함</li>
                        </ul>
                    </div>
                )}

                <input
                    type="password"
                    name="confirmUpdatePw"
                    value={formData.confirmUpdatePw}
                    onChange={handleInputChange}
                    placeholder="새 비밀번호 확인"
                    className={getValidationClass('confirmUpdatePw')}
                    required
                />
                {passwordMatch && (
                    <p className={passwordMatch.includes('동일하지') ? 'error-message' : 'success-message'}>
                        {passwordMatch}
                    </p>
                )}

                <div className="flex w-72 gap-5 border border-gray-200 rounded mb-4">
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
                    readOnly
                />

                <input
                    type="text"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                    placeholder="상세주소"
                    required
                />

                <button
                    type="submit"
                    className={`p-2 mt-5 w-[288px] rounded text-white ${isButtonDisabled ? 'bg-blue-500' : 'bg-blue-300'}`}
                    disabled={!isButtonDisabled}
                >
                    변경하기
                </button>
            </form>
        </>
        
    );
};

export default EditProfileForm;
