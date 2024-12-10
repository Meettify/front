import request from './request';

const BASE_URL = '/payment';
const tossSecretKey = import.meta.env.VITE_TOSS_SECRET_KEY;
const apiKey = import.meta.env.VITE_API_KEY;
const secretKey = import.meta.env.VITE_SECRET_KEY;

const paymentAPI = {
    // Toss 결제 확인 API
    tossPayConfirm: async (data) => {
        const paymentData = {
            pay: {
                orderId: data.orderId,
                amount: data.amount,
                paymentKey: data.paymentKey,
                requestedAt: data.requestedAt,
                approvedAt: data.approvedAt,
                orderUid: data.orderUid,
                orderName: data.orderName,
                orders: data.orders, // 이 부분의 데이터 형식 검토 필요
            },
            address: {
                memberAddr: data.memberAddr,
                memberAddrDetail: data.memberAddrDetail,
                memberZipCode: data.memberZipCode,
            },
        };
    
        try {
            // 요청 보내기
            const response = await request.post({
                method: 'post',
                url: `${BASE_URL}/toss/confirm`,
                data: paymentData,  // 데이터를 하나로 묶어서 전송
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Toss ${tossSecretKey}`,
                },
            });
            return response;  // 성공적으로 응답 받으면 반환
        } catch (error) {
            console.error('Toss 결제 확인 API 오류:', error);  // 오류 로그
            throw new Error(`Toss 결제 확인 API 호출 실패: ${error.message}`);
        }
    },    

    tossPayCancel: async (data) => {
        console.log('Toss 취소 API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                method: 'post',
                url: `${BASE_URL}/toss/cancel`,
                data: {
                    paymentKey: data.paymentKey,
                    orderUid: data.orderUid,
                    amount: data.amount,
                    cancelReason: data.cancelReason,
                },
            });
            console.log('Toss 취소 API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Toss 취소 API 오류:', error);  // 오류 로그
            throw error;
        }
    },

    // Iamport 결제 확인 API
    iamportConfirm: async (data) => {
        const paymentData = {
            pay: {
                itemCount: data.itemCount,
                impUid: data.impUid,
                orderUid: data.orderUid,
                payMethod: data.payMethod,
                payPrice: data.payPrice,
                orderName: data.orderName,
                orders: data.orders,
            },
            address: {
                memberAddr: data.memberAddr,
                memberAddrDetail: data.memberAddrDetail,
                memberZipCode: data.memberZipCode,
            },
        };

        try {
            // 요청 보내기
            const response = await request.post({
                method: 'post',
                url: `${BASE_URL}/iamport/confirm`,
                data: paymentData,  // 데이터를 하나로 묶어서 전송
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}:${secretKey}`,  // 아임포트 인증 헤더
                },
            });
            return response;  // 성공적으로 응답 받으면 반환
        } catch (error) {
            console.error('Iamport 결제 확인 API 오류:', error);  // 오류 로그
            throw error;
        }
    },

    iamportCancel: async (data) => {
        console.log('Iamport 취소 API 요청 데이터:', data);  // 요청 데이터 로그
        try {
            const response = await request.post({
                method: 'post',
                url: `${BASE_URL}/iamport/cancel`,
                data: {
                    impUid: data.impUid,
                    orderUid: data.orderUid,
                },
            });
            console.log('Iamport 취소 API 응답 데이터:', response.data);  // 응답 데이터 로그
            return response;
        } catch (error) {
            console.error('Iamport 취소 API 오류:', error);  // 오류 로그
            throw error;
        }
    },

    // 결제 상태 조회 API (Toss)
    tossPayStatus: async (orderUid) => {
        console.log('Toss 결제 상태 조회 요청:', orderUid); // 요청 로그
        try {
            if (!orderUid) {
                throw new Error('주문 ID가 필요합니다.');
            }

            const response = await request.get({
                url: `${BASE_URL}/toss/${orderUid}`,
            });

            if (response.data.code !== 200) {
                throw new Error(`Toss 결제 상태 조회 오류: ${response.data.message}`);
            }

            console.log('Toss 결제 상태 응답:', response.data); // 응답 로그
            return response;
        } catch (error) {
            console.error('Toss 결제 상태 조회 API 오류:', error.message); // 오류 로그
            throw error;
        }
    },

    // 결제 상태 조회 API (Iamport)
    iamportStatus: async (orderUid) => {
        console.log('Iamport 결제 상태 조회 요청 시작:', orderUid);  // 요청 로그
        try {
            if (!orderUid) {
                throw new Error('주문 ID가 필요합니다.');
            }

            const response = await request.get({
                url: `${BASE_URL}/iamport/${orderUid}`,
            });

            if (response.data.code !== 200) {
                throw new Error(`Iamport 결제 상태 조회 오류: ${response.data.message}`);
            }

            console.log('Iamport 결제 상태 조회 응답:', response.data); // 응답 로그
            return response;
        } catch (error) {
            console.error('Iamport 결제 상태 조회 API 오류:', error.message);  // 오류 로그
            throw error;
        }
    },
};

export default paymentAPI;
