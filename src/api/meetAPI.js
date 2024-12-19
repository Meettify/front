import request from "./request";
import axios from "axios";

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
            url: `/meets/${meetId}`, 
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response; 
    } catch (error) {
        console.error('소모임 삭제 오류:', error);
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

// 로그인된 사용자의 인증 토큰 (JWT 등)을 헤더에 포함시킬 필요가 있음
const getAuthToken = () => {
    const token = `${sessionStorage.getItem('accessToken')}`;
    if (token) {
        console.log('Access Token:', token);// 토큰이 존재하면 사용 (예: API 요청 헤더에 포함)
        return token;
        } else {
            console.log('토큰이 존재하지 않습니다.');
            return null;
        };
};


// 모임 게시판 리스트 API (axios 사용)
export const MeetBoardList = async (meetId, page = 0, size = 10, sort = 'desc') => {
    try {
        if (!meetId || isNaN(meetId)) {
            throw new Error('Invalid meetId');
        }
        // 인증 토큰 가져오기
        const authToken = `${sessionStorage.getItem('accessToken')}`;  
        //console.log('Auth Token in MeetBoardList:', authToken);  // 여기서도 토큰 값 확인
        if (!authToken) {
            throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해 주세요.');
        }
        // API 호출: meetId, page, size를 쿼리 파라미터로 전달
        const url = `${BASE_URL}/meetBoards/list/${meetId}`;
        const response = await axios.get(url, {
            params: {
                page,      // 페이지 번호
                size,      // 페이지 크기
                sort,      // 정렬 방식 (기본값: 'desc')
            },
            headers: {
                'Authorization': `Bearer ${authToken}`,  // 인증 토큰 헤더에 포함
            }
        });
        // 응답 데이터가 없으면 '게시글이 존재하지 않습니다.' 반환
        if (!response.data || !response.data.meetBoards || response.data.meetBoards.length === 0) {
            return { content: [], totalPages: 0, message: '게시글이 존재하지 않습니다.' };
        }
        // 정상 응답 반환
        return {
            content: response.data.meetBoards || [],  // 게시글 목록
            totalPages: response.data.totalPage || 0  // 총 페이지 수
        };
    } catch (error) {
        console.error('모임 게시판 데이터를 불러오는 데 실패했습니다:', error);
        // axios 에러 처리
        if (error.response) {
            // 서버에서 반환한 오류 응답 처리
            return {
                status: error.response.status,
                message: error.response.data.message || '서버에서 오류가 발생했습니다.',
            };
        } else if (error.request) {
            
            return {
                status: 500,
                message: '서버에 요청이 전달되지 않았습니다.',
            };
        } else {
            return {
                status: 500,
                message: error.message || '알 수 없는 오류가 발생했습니다.',
            };
        }
    }
};

// 모임 게시판 상세 조회 API
export const getMeetBoardDetail = async (meetBoardId) => {
    try {
        const response = await axios.get({
            url:`${BASE_URL}/meetBoards/${meetBoardId}`,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,  // 인증 토큰 헤더에 포함
                'accept': '*/*',
                "Content-Type": "application/json",
            }
        });
        return response.data;  // 응답 데이터 반환
    } catch (error) {
        console.error('소모임 게시판 상세 조회 오류:', error);

        if (error.response) {
            // 서버에서 반환한 오류 응답 처리
            return error.response.data;
        } else if (error.request) {
            return {
                status: 500,
                message: '서버에 연결할 수 없습니다.',
            };
        } else {
            // 기타 오류 발생 시
            return {
                status: 500,
                message: error.message || '알 수 없는 오류가 발생했습니다.',
            };
        }
    }
};

//모임 게시판 글 작성 API
export const postMeetBoardInsert = async (formData, meetId) => {
    try {
        formData.append('meetId', meetId);
        const token = getAuthToken(); 
        if (!token) {
            throw new Error('토큰이 존재하지 않습니다.');
        }

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,  // 토큰 추가
        };

        // API 호출
        const response = await axios.post(`${BASE_URL}/meetBoards`, formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response:', response.data);  // 서버의 응답 데이터 확인
        return response.data; // API 응답 반환
    } catch (error) {
        console.error('게시글 작성 오류:', error);
        throw error; // 에러 발생시 던져서 외부에서 처리
    }
};


// 게시글 수정 API 함수
export const updateMeetBoard = async (meetBoardId, title, content, images) => {
    try {
        const formData = new FormData();

        // 게시글 수정 내용
        formData.append('updateBoard', JSON.stringify({
            meetBoardId,
            meetBoardTitle: title,
            meetBoardContent: content,
            imagesUrl: 'main.jpg', // 여기서 이미지 URL은 파일 이름 또는 기본 이미지를 넣습니다.
        }));

        // 파일 업로드 처리
        images.forEach((image) => {
            formData.append('images', image);  // 파일들 추가
        });

        // 요청 보내기
        const response = await axios.put(`${BASE_URL}/meetBoards/${meetBoardId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // multipart/form-data 설정
            },
        });

        return response.data;  // 성공적인 응답 처리
    } catch (error) {
        console.error('게시글 수정 중 오류 발생:', error);
        throw error;
    }
};

// 게시글 삭제 API 함수
export const deleteMeetBoard = async (meetId, meetBoardId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/meetBoards/${meetId}/${meetBoardId}`, {
            headers: {
                'accept': '*/*',  // 요청의 Accept 헤더 설정
            }
        });

        return response.data;  // 삭제 성공 시 응답 데이터
    } catch (error) {
        console.error('게시글 삭제 중 오류 발생:', error.response?.data || error);
        throw error;  // 오류 발생 시 예외 처리
    }
};

// 추천 상품을 가져오는 함수
export const getRecommendedItems = async () => {
    const token = `${sessionStorage.getItem('accessToken')}`;  // 인증 토큰 가져오기
    if (!token) {
        console.error('인증 토큰이 없습니다. 로그인 후 다시 시도해 주세요.');
        //window.location.href = '/login';  // 로그인 페이지로 리다이렉트 (경로는 실제 로그인 경로에 맞게 수정)
        return;
    }
    try {
        const response = await axios.get(`${BASE_URL}/items/recommend-items`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Authorization 헤더에 토큰 포함
                'Accept': '*/*',  // Accept 헤더 추가
            },
        });
        return response.data;  // 추천 상품 데이터 반환
    } catch (error) {
        // 오류 처리
        if (error.response) {
            console.error('API 호출 오류:', error.response.data.message || error.message);
        } else {
            console.error('네트워크 오류:', error.message);
        }
        throw error;  // 오류 발생 시 예외 처리
    }
};



