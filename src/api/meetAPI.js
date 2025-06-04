import request from "./request";
import axios from "axios";

// ✅ JWT 토큰이 필요한 API에는 Authorization 헤더 추가 필요

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const getAuthToken = () => {
    const token = sessionStorage.getItem("accessToken");
  return token ? `Bearer ${token}` : null;
};

// 🔐 모임 생성 - 인증 필요
export const postMeetInsert = async (data) => {
  try {
    const token = getAuthToken();
    const response = await request.post({
      url: `${BASE_URL}/meets`,
      data,
      headers: {
          Authorization: token,
          "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("소모임 등록 오류:", error);
    return error.response || { status: 500, message: "서버에 연결할 수 없습니다." };
  }
};

// 🔐 회원 리스트 조회 - 관리자 권한 필요
export const getMembersList = async (meetId) => {
  try {
    const token = getAuthToken();
    const response = await request.get({
      url: `${BASE_URL}/meets/${meetId}/members`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("회원 리스트 조회 오류:", error);
    return error.response || { status: 500, message: "서버에 연결할 수 없습니다." };
  }
};

// 🔐 모임 삭제 - 관리자 권한 필요
export const deleteMeet = async (meetId) => {
  try {
    const token = getAuthToken();
    const response = await request.del({
      url: `${BASE_URL}/meets/${meetId}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("소모임 삭제 오류:", error);
    return error.response || { status: 500, message: "서버에 연결할 수 없습니다." };
  }
};

// 소모임 리스트 조회 API
export const getMeetList = async (page = 1, size = 9, category = "", name = "") => {
  const token = getAuthToken();
 console.log("name type:", typeof name, "value:", name);
  const response = await request.get({
    url: `${BASE_URL}/meets`,
    headers: { Authorization: token },
    params: {
      page,
      size,
      ...(category && { category }),
      ...(name && { name }),
    },
  });
  return response.data;
};


// 소모임 상세 조회 API
export const getMeetingDetail = async (meetId) => {
    try {
        const token = getAuthToken();  // 토큰 가져오기
        const response = await request.get({
            url: `${BASE_URL}/meets/${meetId}`,
            headers: {
                Authorization: token,  // ⬅️ 토큰 추가!
                "Content-Type": "application/json",
            }
        });
      console.log("반환 값 확인 : ", response.data)
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

// 🔐 모임 가입 신청 - 인증 필요
export const postMeetJoin = async (meetId) => {
  try {
    const token = getAuthToken();
    const response = await request.post({
      url: `${BASE_URL}/meets/${meetId}/members`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("가입 신청 오류:", error);
    return error.response || { status: 500, message: "서버에 연결할 수 없습니다." };
  }
};


// 🔐 회원 역할 업데이트 - 관리자 권한 필요
export const updateMemberRole = async (meetId, meetMemberId, newRole) => {
  try {
    const token = getAuthToken();
    const response = await request.put({
      url: `${BASE_URL}/meets/admin/${meetId}/${meetMemberId}`,
      data: { newRole },
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("회원 역할 업데이트 오류:", error);
    return error.response || { status: 500, message: "서버에 연결할 수 없습니다." };
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

// 모임 게시판 리스트 API (axios 사용)
export const MeetBoardList = async (meetId, page = 0, size = 10, sort = 'postDate,desc') => {
    try {
        if (!meetId || isNaN(meetId)) {
            throw new Error('Invalid meetId');
        }
        const authToken = `${sessionStorage.getItem('accessToken')}`;
        if (!authToken) {
            throw new Error('인증 토큰이 없습니다. 로그인 후 다시 시도해 주세요.');
        }

        const url = `${BASE_URL}/meetBoards/list/${meetId}`;
        const response = await axios.get(url, {
            params: {
                page,
                size,
                sort,
            },
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        // API 응답 데이터에서 필요한 정보 추출
        const { 
            meetBoardPage = [], 
            totalPages = 0, 
            isFirst = false, 
            isLast = false, 
            totalItems = 0, 
            hasPrevious = false, 
            hasNext = false, 
            currentPage = 0 
        } = response.data;

        // 반환할 데이터 구조
        return {
            content: meetBoardPage,  // 게시글 목록 (기존 meetBoardPage)
            totalPages,              // 총 페이지 수
            totalItems,              // 총 게시글 수
            isFirst,                 // 첫 번째 페이지 여부
            isLast,                  // 마지막 페이지 여부
            hasPrevious,             // 이전 페이지 존재 여부
            hasNext,                 // 다음 페이지 존재 여부
            currentPage,             // 현재 페이지 번호
        };
    } catch (error) {
        console.error('모임 게시판 데이터를 불러오는 데 실패했습니다:', error);
        if (error.response) {
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

// 소모임 게시판 상세 조회 API
export const getMeetBoardDetail = async (meetBoardId, page = 1, size = 10) => {
  try {
    const token = getAuthToken();
    const response = await request.get({
      url: `${BASE_URL}/meetBoards/${meetBoardId}?page=${page}&size=${size}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시물 상세 조회 오류:", error);
    if (error.response) {
      console.error("서버 오류 메시지:", error.response.data?.message);
      console.error("서버 오류 상세:", error.response.data?.detail || "에러 발생");
      return error.response.data;
    } else {
      return {
        status: 500,
        message: "서버에 연결할 수 없습니다.",
      };
    }
  }
};



//모임 게시판 글 작성 API
export const postMeetBoardInsert = async ( formData, meetId , images = []) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("토큰이 존재하지 않습니다.");


    const headers = {
      Authorization: `${token}`,
      // ❗ multipart/form-data는 생략해야 브라우저가 boundary 자동 생성
    };

    const response = await axios.post(`${BASE_URL}/meetBoards`, formData, { headers });

    console.log("Response:", response.data);

    if (response.data && response.data.meetBoardId) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      throw new Error("응답에서 게시글 정보를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("게시글 작성 오류:", error);
    return {
      success: false,
      message: error.message || "게시글 작성 중 오류가 발생했습니다.",
    };
  }
};



// 게시글 수정 API 함수
export const updateMeetBoard = async (meetBoardId, title, content, remainImgId, newFiles) => {
  try {
    const formData = new FormData();
    const token = getAuthToken();

    // ✅ 1. DTO 형태와 정확히 일치하는 JSON 생성
    const updateBoardData = {
      meetBoardId: meetBoardId,        // 필수
      meetBoardTitle: title,           // 제목
      meetBoardContent: content,       // 내용
      imagesUrl: remainImgId || [],      // 기존 이미지 파일명 배열
    };

    // ✅ 2. JSON을 Blob으로 감싸고 'updateBoard' 키로 추가
    formData.append(
      'updateBoard',
      new Blob([JSON.stringify(updateBoardData)], { type: 'application/json' })
    );

    // ✅ 3. 새로 업로드한 이미지 파일들 추가
    if (Array.isArray(newFiles)) {
      newFiles.forEach((image) => {
        formData.append('images', image);
      });
    }

    // ✅ 4. 요청 전송 (Content-Type은 생략해야 함!)
    const response = await axios.put(`${BASE_URL}/meetBoards/${meetBoardId}`, formData, {
      headers: {
        'Authorization': `${token}`,
        // 'Content-Type': 'multipart/form-data' ❌ 생략! 브라우저가 boundary 자동 설정
      },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error);
    throw error;
  }
};


// 게시글 삭제 API 함수
export const deleteMeetBoard = async (meetId, meetBoardId) => {
    try {
        const token = getAuthToken(); // 인증 토큰 확인
        if (!token) {
            throw new Error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        }
        const numericMeetId = Number(meetId);
        const numericMeetBoardId = Number(meetBoardId);

        // meetId와 meetBoardId가 숫자인지 확인
        if (isNaN(numericMeetId) || isNaN(numericMeetBoardId)) { 
            throw new Error('Invalid meetId or meetBoardId'); 
        } 
        const url = `${BASE_URL}/meetBoards/${numericMeetId}/${numericMeetBoardId}`; 
        console.log(`Deleting board at: ${url}`); 
        const response = await axios.delete(url, { 
            headers: { 
                'Authorization': `${token}`, 
                'accept': '*/*', } 
            });
             if (response.status === 200) { 
                return response.data; 
            } else { 
                throw new Error(`게시글 삭제 실패: ${response.statusText}`); 
            } 
        }catch (error) { console.error('게시글 삭제 중 오류 발생:', error.response?.data || error.message); 
                if (error.response) { 
                    return { 
                        status: error.response.status, 
                        message: error.response.data.message || '서버에서 오류가 발생했습니다.', 
                    }; 
                } else { 
                    return { 
                        status: 500, message: error.message || '서버에 연결할 수 없습니다.', 
                    };
                }
            }
};
    
// 추천 상품을 가져오는 함수
export const getRecommendedItems = async () => {
  const token = getAuthToken();
  console.log("token : " + token)
    try {
        const response = await axios.get(`${BASE_URL}/items/recommend-items`, {
            headers: {
                'Authorization': `${token}`,  // Authorization 헤더에 토큰 포함
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



