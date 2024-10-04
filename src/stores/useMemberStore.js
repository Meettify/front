import { create } from 'zustand';
import request from '../api/request';


const useMemberStore = create((set) => ({
  memberData: null,
  error: null,
  loading: false,

// 회원 정보 조회
fetchMemberData: async (id) => {
  set({ loading: true, error: null });
  try {
    const response = await request.get({
      url: `/members/${id}`, // GET /api/v1/members/{memberId}
    });
    set({ memberData: response.data, loading: false });
  } catch (error) {
    console.error('Failed to fetch member data:', error.message);
    set({ error: 'Failed to fetch member data', loading: false });
  }
},

  // 회원 정보 수정
  updateMemberData: async (id, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await request.put({
        url: `/members/${memberId}`, // PUT /api/v1/members/{memberId}
        data: updateData,
      });
      set({ memberData: response.data, loading: false });
    } catch (error) {
      console.error('Failed to update member data:', error.message);
      set({ error: 'Failed to update member data', loading: false });
    }
  },

// 회원 탈퇴
deleteMember: async (id) => {
  set({ loading: true, error: null });
  try {
    await request.del({
      url: `/members/${id}`, // DELETE /api/v1/members/{memberId}
    });
    set({ memberData: null, loading: false });
  } catch (error) {
    console.error('Failed to delete member:', error.message);
    set({ error: 'Failed to delete member', loading: false });
  }
},

  // 닉네임 중복 체크
  checkNickName: async (nickName) => {
    set({ loading: true, error: null });
    try {
      const response = await request.get({
        url: `/members/nickName/${nickName}`, // GET /api/v1/members/nickName/{nickName}
      });
      set({ memberData: response.data, loading: false });
    } catch (error) {
      console.error('Failed to check nickname:', error.message);
      set({ error: 'Failed to check nickname', loading: false });
    }
  },

  // 이메일 중복 체크
  checkEmail: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await request.get({
        url: `/members/email/${memberEmail}`, // GET /api/v1/members/email/{memberEmail}
      });
      set({ memberData: response.data, loading: false });
    } catch (error) {
      console.error('Failed to check email:', error.message);
      set({ error: 'Failed to check email', loading: false });
    }
  },

  // 회원가입
  signup: async (signupData) => {
    set({ loading: true, error: null });
    try {
      const response = await request.post({
        url: '/members', // POST /api/v1/members
        data: signupData,
      });
      set({ memberData: response.data, loading: false });
    } catch (error) {
      console.error('Failed to signup:', error.message);
      set({ error: 'Failed to signup', loading: false });
    }
  },

  // 로그인
  login: async (loginData) => {
    set({ loading: true, error: null });
    try {
      const response = await request.post({
        url: '/members/login', // POST /api/v1/members/login
        data: loginData,
      });
      sessionStorage.setItem('accessToken', response.data.token); // 로그인 성공 시 토큰 저장
      set({ memberData: response.data, loading: false });
    } catch (error) {
      console.error('Failed to login:', error.message);
      set({ error: 'Failed to login', loading: false });
    }
  },
}));

export default useMemberStore;