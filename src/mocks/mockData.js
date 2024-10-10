// mockData.js
export const mockMeetings = [
    {
      id: 0,
      title: '헬스 모임',
      description: '서울에서 함께 운동하는 헬스 모임입니다.',
      tags: ['운동', '헬스'],
      members: [
        { id: 1, name: '홍길동', role: 'member' },
        { id: 2, name: '김철수', role: 'member' },
      ],
      host: { id: 3, name: '박영희', role: 'host' },
      isMember: false,
      isHost: false,
      isAdmin: false,
    },
    {
      id: 1,
      title: '독서 토론 모임',
      description: '매주 한 권의 책을 읽고 토론하는 독서 모임입니다.',
      tags: ['독서', '토론'],
      members: [
        { id: 4, name: '이영수', role: 'member' },
      ],
      host: { id: 5, name: '강민수', role: 'host' },
      isMember: true,
      isHost: false,
      isAdmin: false,
    },
    {
      id: 2,
      title: '서울 하이킹 모임',
      description: '서울 근교에서 하이킹을 즐기는 모임입니다.',
      tags: ['하이킹', '야외활동'],
      members: [
        { id: 6, name: '김민지', role: 'member' },
        { id: 7, name: '최성훈', role: 'member' },
      ],
      host: { id: 8, name: '최영준', role: 'host' },
      isMember: false,
      isHost: true,
      isAdmin: true,
    },
    {
      id: 3,
      title: '요리 모임',
      description: '요리를 배우고 함께 만들어 보는 모임입니다.',
      tags: ['요리', '배움'],
      members: [
        { id: 9, name: '박준형', role: 'member' },
      ],
      host: { id: 10, name: '서지수', role: 'host' },
      isMember: true,
      isHost: true,
      isAdmin: false,
    }
  ];
  