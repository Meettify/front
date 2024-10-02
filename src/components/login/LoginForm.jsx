import React, { useState } from 'react';
import { postLogin } from '../../api/memberAPI';
import { useAuth } from '../../hooks/useAuth';
import naverLogo from '../../assets/naverLoginLogo.png'; // 네이버 로그인 이미지
import googleLogo from '../../assets/googleLoginLogo.png'; // 구글 로그인 이미지
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    memberPw: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { login: storeLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await postLogin(formData);

    if (result && result.accessToken) {
      storeLogin(result); // 상태 관리에 토큰 저장
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
        value={formData.memberPw} 
        onChange={e => setFormData({ ...formData, memberPw: e.target.value })} 
        required 
      />
      
      <div>
        <button 
          className='w-[288px] h-[46px] text-white border border-gray-400 bg-gray-400 rounded-md'
          type="submit" 
          disabled={!formData.email || !formData.memberPw}>
          로그인
        </button>
      </div>
      
      <p className="text-black text-center mb-4 mt-4">
        계정이 없으신가요? 
        <button 
          onClick={() => window.location.href = '/signup'} // 회원가입 페이지로 이동
          className="text-blue-500 underline bg-white ml-2">
          회원가입
        </button>
      </p>

      {/* <p className='text-gray-400'>-------- 간편 로그인 --------</p> */}
      <div className="social-login">
        <button 
        onClick={() => handleSocialLogin('naver')}>
          <img 
            className='w-[288px] h-[46px]'
            src={naverLogo} 
            alt="Naver 로그인" />
        </button>
        
        <button 
        onClick={() => handleSocialLogin('google')}>
          <img
            className='w-[288px] h-[46px]' 
            src={googleLogo} 
            alt="Google 로그인" />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
