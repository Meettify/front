// 이미지 import
import artImage from '../assets/images/meet/artImage.jpg';
import campingImage from '../assets/images/meet/campingImage.jpg';
import emotion1 from '../assets/images/meet/emotion1.png';
import emotion3 from '../assets/images/meet/emotion3.png';

// mock 데이터를 mockData로 내보내기
export const mockData = [
  {
    id: 1,
    title: '헬스 모임',
    description: '서울에서 함께 운동하는 헬스 모임입니다.',
    tags: ['운동', '헬스'],
    members: [
      { id: 1, name: '홍길동', role: 'member' },
      { id: 2, name: '김철수', role: 'member' },
    ],
    pendingMembers: [
      { id: 11, name: '이승기' },
      { id: 12, name: '박보검' },
    ],
    host: { id: 3, name: '박영희', role: 'host' },
    isMember: false,
    isHost: false,
    isAdmin: false,
    image: artImage,  // 이미지 경로 추가
  },
  {
    id: 2,
    title: '독서 토론 모임',
    description: '매주 한 권의 책을 읽고 토론하는 독서 모임입니다.',
    tags: ['독서', '토론'],
    members: [
      { id: 4, name: '이영수', role: 'member' },
    ],
    pendingMembers: [
      { id: 13, name: '김태희' },
    ],
    host: { id: 5, name: '강민수', role: 'host' },
    isMember: true,
    isHost: false,
    isAdmin: false,
    image: campingImage,  // 이미지 경로 추가
  },
  {
    id: 3,
    title: '서울 하이킹 모임',
    description: '서울 근교에서 하이킹을 즐기는 모임입니다.',
    tags: ['하이킹', '야외활동'],
    members: [
      { id: 6, name: '김민지', role: 'member' },
      { id: 7, name: '최성훈', role: 'member' },
    ],
    pendingMembers: [
      { id: 14, name: '손흥민' },
      { id: 15, name: '류현진' },
    ],
    host: { id: 8, name: '최영준', role: 'host' },
    isMember: false,
    isHost: true,
    isAdmin: true,
    image: emotion1,  // 이미지 경로 추가
  },
  {
    id: 4,
    title: '요리 모임',
    description: '요리를 배우고 함께 만들어 보는 모임입니다.',
    tags: ['요리', '배움'],
    members: [
      { id: 9, name: '박준형', role: 'member' },
    ],
    pendingMembers: [],
    host: { id: 10, name: '서지수', role: 'host' },
    isMember: true,
    isHost: true,
    isAdmin: false,
    image: emotion3,  // 이미지 경로 추가
  }
];
