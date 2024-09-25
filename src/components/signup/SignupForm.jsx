import React, { useState } from 'react';
import { signup } from '../../services/authService';
import { validatePassword, validateNickname, validateName } from '../../utils/validation'; // 이름 유효성 검사 추가
import AddressSearch from './AddressSearch';
import '../../index.css';
import '../../styles/LoginForm.css';

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

  const [validationErrors, setValidationErrors] = useState({});
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValid, setPasswordValid] = useState({ length: false, number: false });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidation = validateName(formData.name);  // 이름 유효성 검사 추가
    const nicknameValidation = validateNickname(formData.nickName);
    const passwordValidation = validatePassword(formData.password);

    if (!nameValidation.isValid) {
      setValidationErrors(prev => ({ ...prev, name: '이름은 한글과 영문(대소문자)만 입력 가능합니다.' }));
      return;
    }

    if (!nicknameValidation.length || !nicknameValidation.isValid) {
      setValidationErrors(prev => ({ ...prev, nickName: '닉네임은 한글, 영문(대소문자), 숫자 6~12자만 입력 가능합니다.' }));
      return;
    }

    if (!passwordValidation.length || !passwordValidation.number) {
      setValidationErrors(prev => ({ ...prev, password: '비밀번호는 8~16자, 숫자를 포함해야 합니다.' }));
      return;
    }

    const result = await signup(formData);
    if (result.success) {
      window.location.href = '/login';
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    const validation = validatePassword(password);
    setPasswordValid(validation);

    if (password === formData.confirmPassword) {
      setPasswordMatch('비밀번호가 동일합니다.');
    } else {
      setPasswordMatch('비밀번호가 동일하지 않습니다.');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData(prev => ({ ...prev, confirmPassword }));
    if (formData.password === confirmPassword) {
      setPasswordMatch('비밀번호가 동일합니다.');
    } else {
      setPasswordMatch('비밀번호가 동일하지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <input 
        type="text" 
        placeholder="이름" 
        value={formData.name} 
        onChange={e => setFormData({ ...formData, name: e.target.value })} 
        required 
      />
      {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}

      <input 
        type="text" 
        placeholder="닉네임" 
        value={formData.nickName} 
        onChange={e => setFormData({ ...formData, nickName: e.target.value })} 
        required 
      />
      {validationErrors.nickName && <p className="error-message">{validationErrors.nickName}</p>}

      <input 
        type="email" 
        placeholder="이메일" 
        value={formData.email} 
        onChange={e => setFormData({ ...formData, email: e.target.value })} 
        required 
      />

      <input 
        type="password" 
        placeholder="비밀번호" 
        value={formData.password} 
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChange={handlePasswordChange}
        required 
      />
      {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}

      {passwordFocused && (
        <div className='password-popup'>
          <p>비밀번호 필수 조건</p>
          <ul>
            <li className={passwordValid.length ? 'valid' : ''}>8자 ~ 16자</li>
            <li className={passwordValid.number ? 'valid' : ''}>숫자 한 개 이상</li>
          </ul>
        </div>
      )}

      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        value={formData.confirmPassword} 
        onChange={handleConfirmPasswordChange}
        required 
      />
      {passwordMatch && (
        <p className={passwordMatch.includes('동일하지') ? 'error-message' : 'success-message'}>
          {passwordMatch}
        </p>
      )}

      <div className='flex w-full gap-5'>
        <input className='w-40 p-2' type="text" placeholder="우편번호" value={formData.postalCode} readOnly />
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
        type="submit" 
        disabled={!formData.name || !formData.nickName || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
