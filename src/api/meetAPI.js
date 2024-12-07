import request from "./request";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// 소모임 등록 API
export const postMeetInsert = async (data) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/api/v1/search`,
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
export const getMeetList = async (page = 0, size = 10, sort = "meetName", category = "") => {
    try {
        const response = await request.get({
            url: `${BASE_URL}/meets`,
            params: {
                page,
                size,
                sort,
                name: '',  // name을 빈 문자열로 설정
                category: category || undefined, // category가 비어있지 않을 경우 전달
            },
        });
        return response.data;
    } catch (error) {
        console.error('소모임 리스트 조회 오류:', error);
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

// 소모임 수정 API
export const updateMeet = async (meetId, updateMeetDTO, newImages = []) => {
    try {
        const formData = new FormData();
        
        // UpdateMeetDTO를 JSON 문자열로 변환하여 추가
        formData.append('updateMeetDTO', new Blob([JSON.stringify(updateMeetDTO)], {
            type: 'application/json'
        }));

        // 새 이미지 처리
        newImages.forEach((image) => {
            formData.append('images', image); // 'images'라는 이름으로 추가
        });

        const response = await request.put({
            url: `${BASE_URL}/meets/${meetId}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data', // Content-Type 설정
            },
        });
        return response;
    } catch (error) {
        console.error('소모임 수정 오류:', error);
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

// 소모임 가입 신청 API
export const postMeetJoin = async (meetId) => {
    try {
        const response = await request.post({
            url: `${BASE_URL}/meets/${meetId}/members`, // 가입 신청 엔드포인트 수정
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data; // 가입 신청 성공 응답 반환
    } catch (error) {
        console.error('가입 신청 오류:', error);
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


// 회원 역할 업데이트 API
export const updateMemberRole = async (meetId, meetMemberId, newRole) => {
    try {
        const response = await request.put({
            url: `${BASE_URL}/meets/admin/${meetId}/${meetMemberId}`,  // 엔드포인트 수정
            data: { newRole },
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.error('회원 역할 업데이트 오류:', error);
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

// // 전체 검색 API
// export const searchMeets = async (totalKeyword) => {
//     try {
//         const response = await request.get({
//             url: `${BASE_URL}/search`, // URL은 실제 API 엔드포인트에 맞게 수정해야 합니다.
//             params: { totalKeyword }
//         });
//         return response.data; // 응답 데이터를 반환
//     } catch (error) {
//         console.error('검색 오류:', error);
//         if (error.response) {
//             return error.response.data; // 에러 응답 데이터 반환
//         } else {
//             return {
//                 status: 500,
//                 message: '서버에 연결할 수 없습니다.',
//             };
//         }
//     }
// };

// export const searchMeets = async (totalKeyword) => {
//     try {
//         if (!totalKeyword || totalKeyword.trim() === "") {
//             return { meetSummaryDTOList: [] }; // 빈 검색어인 경우 빈 결과 반환
//         }

//         const response = await request.get({
//             url: `${BASE_URL}/search`, // URL은 실제 API 엔드포인트에 맞게 수정해야 합니다.
//             params: {
//                 totalKeyword,   // 서버에서 사용하는 파라미터 이름에 맞게
//                 page: 0,         // 페이지 번호를 추가할 수도 있음 (기본값 0)
//                 size: 10,        // 한 번에 가져올 항목 수 (기본값 10)
//             }
//         });

//         return response.data; // 응답 데이터 반환
//     } catch (error) {
//         console.error('검색 오류:', error);
//         if (error.response) {
//             return error.response.data; // 에러 응답 데이터 반환
//         } else {
//             return {
//                 status: 500,
//                 message: '서버에 연결할 수 없습니다.',
//             };
//         }
//     }
// };

// 전체 검색 API
export const searchMeets = async (totalKeyword) => {
    try {
        // 검색어가 비어있거나 유효하지 않으면 빈 결과 반환
        if (!totalKeyword || totalKeyword.trim() === "") {
            return { meetSummaryDTOList: [] };  // 빈 검색어 처리
        }

        // 소모임 검색 API 호출
        const response = await request.get({
            url: `${BASE_URL}/search`,  // 실제 소모임 검색 API 엔드포인트
            params: { totalKeyword: totalKeyword.trim() }  // 검색어 전달 (trim 적용)
        });

        return response.data;  // 응답 데이터 반환
    } catch (error) {
        console.error('검색 오류:', error);
        if (error.response) {
            return error.response.data;  // 에러 응답 데이터 반환
        } else {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        }
    }
};

