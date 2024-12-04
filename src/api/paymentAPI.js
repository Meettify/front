import request from './request';

const BASE_URL = '/payment';

const paymentAPI = {
    tossPayConfirm: async (data) => {
        console.log('Toss API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                url: `${BASE_URL}/toss/confirm`,
                data,
            });
            console.log('Toss API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Toss API 오류:', error);  // 오류 로그
            throw error;
        }
    },
    tossPayCancel: async (data) => {
        console.log('Toss 취소 API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                url: `${BASE_URL}/toss/cancel`,
                data,
            });
            console.log('Toss 취소 API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Toss 취소 API 오류:', error);  // 오류 로그
            throw error;
        }
    },
    iamportConfirm: async (data) => {
        console.log('Iamport API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                url: `${BASE_URL}/iamport/confirm`,
                data,
            });
            console.log('Iamport API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Iamport API 오류:', error);  // 오류 로그
            throw error;
        }
    },
    iamportCancel: async (data) => {
        console.log('Iamport 취소 API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                url: `${BASE_URL}/iamport/cancel`,
                data,
            });
            console.log('Iamport 취소 API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Iamport 취소 API 오류:', error);  // 오류 로그
            throw error;
        }
    },
    tossPayStatus: async (orderUid) => {
        console.log('Toss 결제 상태 조회 요청:', orderUid); // 요청 로그
        try {
            const response = await request.get({
                url: `${BASE_URL}/toss/${orderUid}`,
                headers: {
                    'Authorization': `Bearer ${API_KEY}`, // 필요 시 인증 헤더 추가
                },
            });
            console.log('Toss 결제 상태 응답:', response.data); // 응답 로그
            return response;
        } catch (error) {
            console.error('Toss 결제 상태 조회 API 오류:', error); // 오류 로그
            throw error;
        }
    },
    iamportStatus: async (orderUid) => {
        console.log('Iamport 결제 상태 조회 요청:', orderUid); // 요청 로그
        try {
            const response = await request.get({
                url: `${BASE_URL}/iamport/${orderUid}`,
            });
            console.log('Iamport 결제 상태 응답:', response.data); // 응답 로그
            return response;
        } catch (error) {
            console.error('Iamport 결제 상태 조회 API 오류:', error); // 오류 로그
            throw error;
        }
    },
};

export default paymentAPI;
