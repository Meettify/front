import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import LoginLogo from '../../assets/emailLogin.png'; // 로그인 이미지
import naverLogo from '../../assets/naverLoginLogo.png'; // 네이버 로그인 이미지
import googleLogo from '../../assets/googleLoginLogo.png'; // 구글 로그인 이미지
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { login: storeLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData.email, formData.password);
    if (result.success) {
      storeLogin(result.user);
      window.location.href = '/';
    } else {
      setErrorMessage('이메일 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleSocialLogin = (provider) => {
    // provider에 따라 소셜 로그인 처리
    console.log(`/oauth2/authorization/${provider}`);
    // API 호출 로직

    window.location.href = `/oauth2/authorization/${provider}`;
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <input 
        className='bg-white border border-zinc-400 rounded-md text-black'
        type="email" 
        placeholder="이메일" 
        value={formData.email} 
        onChange={e => setFormData({ ...formData, email: e.target.value })} 
        required 
      />
      {errorMessage && <p className="error-message mt-0">{errorMessage}</p>}

      <input 
        className='bg-white border border-zinc-400 rounded-md text-black'
        type="password" 
        placeholder="비밀번호" 
        value={formData.password} 
        onChange={e => setFormData({ ...formData, password: e.target.value })} 
        required 
      />
      
      <button 
      className='bg-white w-3/4 '
      type="submit" 
      disabled={!formData.email || !formData.password}>
        <img src={LoginLogo} alt="로그인" />
      </button>

      <p className='text-gray-400'>-------- 간편 로그인 --------</p>
      <div className="social-login">
        <button 
        className='bg-white'
        onClick={() => handleSocialLogin('naver')}>
          <img src={naverLogo} alt="Naver 로그인" />
        </button>
        
        <button 
        className='bg-white'
        onClick={() => handleSocialLogin('google')}>
          <img 
          src={googleLogo} 
          alt="Google 로그인" />
        </button>
        
      </div>
    </form>
  );
};

export default LoginForm;
