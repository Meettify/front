import React, { useState } from 'react';
import { HttpStatusCode } from "axios";
import { postSignup, getCheckEmail, getCheckNickName} from '../../../api/memberAPI';
import { validatePassword, validateNickname, validateName, validateEmail } from '../../../utils/validation';
import AddressSearch from './AddressSearch';
import useNavigation from '../../../hooks/useNavigation';

import '../../../styles/LoginForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
    postalCode: '',
    address: '',
    addressDetail: '',
  });

  const { goToSignupSuccess } = useNavigation();

  const [validationErrors, setValidationErrors] = useState({});
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false, 
    hasAlphabet: false, 
    hasNumber: false, 
    hasSpecialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handlePostcodeComplete = (data) => {
    setFormData(prev => ({
      ...prev,
      postalCode: data.postalCode,
      address: data.address,
    }));
    setIsPostcodeOpen(false);
  };

  const validateFields = () => {
    const nameValidation = validateName(formData.name);
    const nicknameValidation = validateNickname(formData.nickName);
    const passwordValidation = validatePassword(formData.password);

    const newValidationErrors = {};

    if (!nameValidation.isValid) {
      newValidationErrors.name = '이름은 한글과 영문만 입력 가능합니다.';
    }

    if (!nicknameValidation.isValid) {
      newValidationErrors.nickName = '닉네임은 한글, 영문만 입력 가능합니다.';
    }

    if (!passwordValidation.isValid) {
      newValidationErrors.password = '비밀번호는 8자 이상 20자 이하이어야 하며, 영문, 숫자, 특수 문자를 포함해야 합니다.';
    }

    setValidationErrors(newValidationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      memberEmail: formData.email,
      memberName: formData.name,
      nickName: formData.nickName,
      memberPw: formData.password,
      memberAddr: {
        memberAddr: formData.address,
        memberAddrDetail: formData.addressDetail,
        memberZipCode: formData.postalCode,
      },
    };

    const result = await postSignup(requestData);

    if (result.status === HttpStatusCode.Ok){
      goToSignupSuccess();
    }else{
      const resultMessage = result.data.message;
      const message = resultMessage.slice(0, resultMessage.indexOf("회원 이메일")).trim();
      const email = resultMessage.slice(resultMessage.indexOf("회원 이메일 :") + "회원 이메일 :".length).trim();

      if (message === "추방된 회원입니다."){
        alert(`'${email}' 은(는) 추방된 이메일 입니다.\n다른 이메일을 사용해 주세요`)
      }

      console.error('회원가입 실패:', result);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    const validation = validatePassword(password);
    setPasswordValid(validation);

    if (formData.confirmPassword) {
      if (password === formData.confirmPassword) {
        setPasswordMatch('비밀번호가 동일합니다.');
      } else {
        setPasswordMatch('비밀번호가 동일하지 않습니다.');
      }
    } else {
      setPasswordMatch(''); 
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword }));
    
    if (formData.password) {
      if (formData.password === confirmPassword) {
        setPasswordMatch('비밀번호가 동일합니다.');
        setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
      } else {
        setPasswordMatch('비밀번호가 동일하지 않습니다.');
        setValidationErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 동일하지 않습니다.' }));
      }
    } else {
      setPasswordMatch(''); 
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // 유효성 검사를 위해 필드별로 검사 수행
    if (field === 'name') {
      const nameValidation = validateName(value);
      setValidationErrors(prev => ({ ...prev, name: nameValidation.isValid ? '' : '이름은 한글과 영문만 입력 가능합니다.' }));
    }

    if (field === 'nickName') {
      const nicknameValidation = validateNickname(value);

      if (nicknameValidation.isValid) {
        getCheckNickName(value).then(check => {
          setValidationErrors(prev => ({
            ...prev,
            nickName: check ? '' : '이미 사용 중인 닉네임입니다.'
          }));
        });
      } else {
        setValidationErrors(prev => ({
          ...prev,
          nickName: nicknameValidation.isValid ? '' : '닉네임은 한글, 영문만 입력 가능합니다.'
        }));
      }
    }

    if (field === 'email') {
      const emailValidation = validateEmail(value);
      if (!value) {
        setValidationErrors(prev => ({ ...prev, email: '' }));
      } else if (emailValidation.isValid) {
        getCheckEmail(value).then(check => {
          setValidationErrors(prev => ({ 
            ...prev, 
            email: check ? '' : '이미 사용 중인 이메일입니다.' 
          }));
        });
      } else {
        setValidationErrors(prev => ({ 
          ...prev, 
          email: '올바른 이메일 형식이 아닙니다.' 
        }));
      }
    }

    if (field === 'password') {
      const passwordValidation = validatePassword(value);
      handlePasswordChange(e);
      setValidationErrors(prev => ({ ...prev, password: (passwordValidation.isValid) ? '' : '비밀번호 필수 조건을 확인해주세요' }));
    }

    if (field === 'confirmPassword') {
      handleConfirmPasswordChange(e);
    }
  };

  const getValidationClass = (fieldName) => {
    if (validationErrors[fieldName]) {
      return 'invalid';
    } else if(fieldName === 'confirmPassword'){
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

  const isFormValid = Object.values(validationErrors).every(error => error === '' || error === undefined) 
  && Object.values(formData).every(field => field !== '');

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input 
        type="text" 
        placeholder="이름" 
        value={formData.name} 
        onChange={handleInputChange('name')} 
        className={getValidationClass('name')}
        required 
      />
      {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}

      <input 
        type="text" 
        placeholder="닉네임" 
        value={formData.nickName} 
        onChange={handleInputChange('nickName')} 
        className={getValidationClass('nickName')}
        required 
      />
      {validationErrors.nickName && <p className="error-message">{validationErrors.nickName}</p>}

      <input 
          type="email" 
          placeholder="이메일" 
          value={formData.email} 
          onChange={handleInputChange('email')} 
          className={getValidationClass('email')}
          required 
        />
      {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}

      <input 
        type="password" 
        placeholder="비밀번호" 
        value={formData.password} 
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChange={handleInputChange('password')}
        className={getValidationClass('password')}
        required 
      />
      {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}

      {passwordFocused && (
        <div className="password-popup">
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
        placeholder="비밀번호 확인" 
        value={formData.confirmPassword} 
        onChange={handleInputChange('confirmPassword')}
        className={getValidationClass('confirmPassword')}
        required 
      />
      {passwordMatch && (
        <p className={passwordMatch.includes('동일하지') ? 'error-message' : 'success-message'}>
          {passwordMatch}
        </p>
      )}

      <div className="flex w-72 gap-5 border border-gray-300 rounded">
        <input className="w-40 p-2 rounded" type="text" placeholder="우편번호" value={formData.postalCode} readOnly />
        <AddressSearch onComplete={handlePostcodeComplete} />
      </div>
      
      <input type="text" placeholder="주소" value={formData.address} readOnly />

      <input 
        type="text" 
        placeholder="상세주소" 
        value={formData.addressDetail} 
        onChange={e => setFormData({ ...formData, addressDetail: e.target.value })} 
        required 
      />

      <button 
        className={`border border-blue-300 text-white w-[144px] h-[44px] rounded mt-5 font-bold text-xl
          ${isFormValid ? 'bg-blue-500' : 'bg-blue-300'}`}
        type="submit" 
        disabled={!isFormValid} >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
