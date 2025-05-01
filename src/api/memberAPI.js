import request from './request';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 로그인 response : TokenDTO
export const postLogin = async (data) => { 
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
        return response;
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
        const response = await request.del({
            url: `${BASE_URL}/members/${memberId}`,
        });
        return response;
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

// 마이페이지 가입한 모임 리스트 API
export const getMeetJoinList = async (page = 1, size = 10) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/meets/my-meet?page=${page}&size=${size}`,
        });
        return response.data;
    } catch (error) {
        console.error('가입한 모임 리스트 에러', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
}

// 마이페이지 모임탈퇴 API
export const putLeaveMeet = async (meetId, meetMemberId) => {
    try {
        const response = await request.put({
            url: `${BASE_URL}/meets/${meetId}/${meetMemberId}`,
        });
        return response.data;
    } catch (error) {
        console.error('가입한 모임 탈퇴 에러', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 모임취소 API / 수정해야됨
export const putCancelMeet = async () => {
    try {
        const response = await request.put({
            url: `${BASE_URL}/meets/`, // 수정해야됨
        });
        return response.data;
    } catch (error) {
        console.error('모임신청 취소 에러', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 작성한 커뮤니티 글
export const getMyCommunityList = async (page = 0, size = 10, sort = 'desc') => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/community/my-community`,
        params: { page: page+1, size, sort },
      });
      return response.data;
    } catch (error) {
        console.error('getMyCommunityList Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 작성한 커뮤니티 글 수량
export const getMyCommunityListCount = async () => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/community/count-my-community`,
      });
      return response.data;
    } catch (error) {
        console.error('getMyCommunityListCount Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 작성한 문의
export const getMyInquiryList = async (page = 0, size = 10, sort = 'desc') => {
    try {
      const response = await request.get({
        url: `${BASE_URL}/questions/my-questions`,
        params: { page: page+1, size, sort },
      });
      return response.data;
    } catch (error) {
        console.error('getMyInquiryList Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
            status: 500,
            message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 작성한 문의 글 수량
export const getMyInquiryListCount = async () => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/questions/count-my-questions`,
        });
        return response.data;
    } catch (error) {
        console.error('getMyInquiryListCount Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 주문한 상품
export const getMyOrderList = async (page = 0, size = 10, sort = 'desc') => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/orders/my-order`,
            params: { page: page+1, size, sort },
        });
        return response.data;
    } catch (error) {
        console.error('getMyOrderList Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 내가 주문한 상품 수량
export const getMyOrderCount = async () => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/orders/count-my-order`,
        });
        return response.data;
    } catch (error) {
        console.error('getMyOrderCount Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 주문조회
export const getPayment = async (orderUid) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/payment/toss`,
            params: { orderUid },
        });
        return response.data;
    } catch (error) {
        console.error('getPaymentToss Error', error);
        try {
            const response = await request.get({
                url: `${BASE_URL}/payment/iamport`,
                params: { orderUid },
            });
            return response.data;
        } catch(error){
            console.error('getPaymentIamPort Error', error);
            if (error.response) {
                return error.response;
            } else {
                return {
                    status: 500,
                    message: '서버에 연결할 수 없습니다.',
                };
            }
        }
    }
};

// 마이페이지 토스 주문취소
export const PostCancelToss = async (data) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/payment/toss/cancel`,
            data,
        });
        return response.data;
    } catch (error) {
        console.error('PostCancelToss Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지 아임포트 주문취소
export const PostCancelIamPort = async (data) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/payment/iamport/cancel`,
            data,
        });
        return response.data;
    } catch (error) {
        console.error('PostCancelIamPort Error', error);
        if (error.response) {
            return error.response;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};