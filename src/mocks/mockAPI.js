// /src/mocks/mockAPI.js
import { mockData } from './mockData';

// 모임 리스트 가져오기
export const getMeetings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);  // 0.5초 후 데이터를 반환 (비동기 처리 시뮬레이션)
  });
};

// 특정 모임의 세부 정보 가져오기
export const getMeetingById = async (meetId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meeting = mockData.find(meet => meet.id === parseInt(meetId));
      resolve(meeting);
    }, 500);  // 0.5초 후 데이터를 반환
  });
};

// 모임 가입 승인
export const approveMember = async (meetId, memberId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const meeting = mockData.find(meet => meet.id === parseInt(meetId));
      if (meeting) {
        const member = meeting.members.find(m => m.id === parseInt(memberId));
        if (member) {
          member.role = 'approved';  // 승인된 회원으로 역할 변경
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    }, 500);
  });
};
