import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 로그인 response : TokenDTO
export const postLogin = async (data) => {
    console.log(`DATA : ${data}`);
    console.log(`DATA.email : ${data.email}`);
    console.log(`DATA.memberPw : ${data.memberPw}`);
    console.log(`BASE_URL : ${BASE_URL}/members/login`);
    
    try {
        const response = await request.post({
            url: `${BASE_URL}/members/login`, 
            data
        });
        return response;
    } catch (error) {
        console.error('로그인 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 회원가입 response : 200, ResponseMemberDTO
export const postSignup = async (data) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/members`, 
            data
        });
        return response;
    } catch (error) {
        console.error('회원가입 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 닉네임 중복 체크
export const getCheckNickName = async (nickName) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/members/nickName/${nickName}`,
        });
        return response.data;
    } catch (error) {
        console.error('닉네임 중복 체크 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 이메일 중복 체크
export const getCheckEmail = async (email) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/members/email/${email}`,
        });
        return response.data;
    } catch (error) {
        console.error('이메일 중복 체크 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 회원 정보 수정
export const putUpdateMember = async (memberId, updateMemberDTO) => {
    try {
        const response = await request.put({
            url: `${BASE_URL}/members/${memberId}`,
            data: updateMemberDTO,
        });
        return response.data;
    } catch (error) {
        console.error('회원 정보 수정 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 회원 탈퇴
export const deleteMember = async (memberId) => {
    try {
        const response = await request.delete({
            url: `${BASE_URL}/members/${memberId}`,
        });
        return response.data;
    } catch (error) {
        console.error('회원 탈퇴 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}

// 회원 정보 조회
export const getMember = async (memberId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/members/${memberId}`
        });
        console.log(`회원정보 조회 : `);
        console.log(`memberEmail : ${response.data.memberEmail} `);
        console.log(`memberName : ${response.data.memberName} `);
        console.log(`nickName : ${response.data.nickName} `);
        response.data.nickName='닉네임테스트';
        console.log(`memberAddr : ${response.data.memberAddr?.memberAddr} `);
        console.log(`memberAddrDetail : ${response.data.memberAddr?.memberAddrDetail} `);
        console.log(`memberZipCode : ${response.data.memberAddr?.memberZipCode} `);
        return response.data;
    } catch (error) {
        console.error('회원 정보 조회 오류:', error);
        if (error.response) {
            return error.response;
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
}