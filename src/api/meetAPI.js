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

// 소모임 삭제 API 추가
export const deleteMeet = async (meetId) => {z
    try {
        const response = await request.delete({
            url: `${BASE_URL}/meets/${meetId}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
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

export const getMeetJoinList = async () => {
    const response = {
        data: [
          {
            meetId: 1,
            meetName: "테스트제목",
            meetLocation: "서울 종로구",
            category: "SPORTS",
            meetMaximum: 20,
            images: "이미지경로1",
            meetRole : "ADMIN",
          },
          {
            meetId: 2,
            meetName: "테스트제목2",
            meetLocation: "서울 강남구",
            category: "MUSIC",
            meetMaximum: 15,
            images: "이미지경로2",
            meetRole : "MEMBER",
          },
          {
            meetId: 3,
            meetName: "테스트제목3",
            meetLocation: "부산 해운대구",
            category: "ART",
            meetMaximum: 10,
            images: "이미지경로3",
            meetRole : "WAITING",
          },
          {
            meetId: 4, 
            meetName: "테스트제목4", 
            meetLocation: "경기 수원시 팔달구", 
            category: "MOVIE", 
            meetMaximum: 5,
            images: "이미지경로4", 
            meetRole : "DORMANT", 
          },
          {
            meetId: 5, 
            meetName: "테스트제목5", 
            meetLocation: "강원 춘천시", 
            category: "PET", 
            meetMaximum: 10,
            images: "이미지경로5", 
            meetRole : "EXPEL", 
          },
        ],
      };

      return response;
}