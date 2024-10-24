import request from "./request";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 소모임 등록 API
export const postMeetInsert = async (data) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/meets`,
            data,
        });
        return response; // 전체 응답 객체를 반환
    } catch (error) {
        console.error('소모임 등록 오류:', error);
        if (error.response) {
            return error.response; // 에러 시에도 전체 응답 반환
        } else {
            return { status: 500, message: '서버에 연결할 수 없습니다.' };
        }
    }
};

// 소모임 가입 승인 및 회원 조회 API
export const getMembersList = async (meetId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/meets/${meetId}/members`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error('회원 리스트 조회 오류:', error);

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

export const deleteMeet = async (meetId) => {
    try {
        const response = await request.del({
            url: `/meets/${meetId}`, // BASE_URL은 이미 설정되어 있으므로 상대 경로만 필요
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response; // 전체 응답 객체를 반환
    } catch (error) {
        console.error('소모임 삭제 오류:', error);
        if (error.response) {
            return error.response; // 에러 발생 시 응답 반환
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};


// 소모임 리스트 조회 API
export const getMeetList = async (page, size, sort, name, category) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/meets`,
            params: {
                page,
                size,
                sort,
                name,
                category // 카테고리를 문자열로 전달
            },
        });
        return response.data;
    } catch (error) {
        console.error('소모임 리스트 조회 오류:', error);
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

// 소모임 상세 조회 API
export const getMeetingDetail = async (meetId) => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/meets/${meetId}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error('소모임 상세 조회 오류:', error);

        if (error.response) {
            return error.response.data;
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

// 마이페이지의 가입한 모임 리스트 API
export const getMeetJoinList = async () => {
  try {
    const response = await request.get({
        url: `${BASE_URL}/meets/myMeet`,
    });
    return response.data;
} catch (error) {
    console.error('가입한 모임 리스트 GET 에러', error);
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