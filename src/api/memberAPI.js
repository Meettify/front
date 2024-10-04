import request from './request';

// @RequestMapping("/api/v1/members")
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 로그인 response : TokenDTO
export const postLogin = async (data) => {
    return await request.post({
        url: `${BASE_URL}/members/login`, 
        data
    })
}

// 회원가입 response : 200, ResponseMemberDTO
export const postSignup = async (data) => {
    return await request.post({
        url: `${BASE_URL}/members/login`, 
        data
    })
}

// 닉네임 중복 체크
export const getCheckNickName = async (nickName) => {
    const response = await request.get({
        url: `${BASE_URL}/members/nickName/${nickName}`,
    });
    return response.data;
}

// 이메일 중복 체크
export const getCheckEmail = async (email) => {
    const response = await request.get({
        url: `${BASE_URL}/members/${email}`,
    });

    return response.data;
}

// 회원 정보 수정
export const putUpdateMember = async (memberId, updateMemberDTO) => {
    const response = await request.put({
        url: `${BASE_URL}/members/${memberId}`,
        data: updateMemberDTO,
    });

    return response.data;
}

// 회원 탈퇴
export const deleteMember = async (memberId) => {
    const response = await request.delete({
        url: `${BASE_URL}/members/${memberId}`,
    });

    return response.data;
}