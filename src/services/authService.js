import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('/api/login', { email, password });
  const { token, user } = response.data;

  // 세션 스토리지에 토큰 저장
  sessionStorage.setItem('token', token);

  return { success: true, user };
};

export const signup = async (formData) => {
  const response = await axios.post('/api/signup', formData);
  return response.data;
};
