import { useEffect, useState } from 'react';
import { getAllMemberLists } from '../api/adminMainAPI';
import useAdminMainStore from '../stores/useAdminMainStore';

const useMemberChartData = () => {
  const { setAllMemberLists, setAllMembersCount, setTodayMemberCount, setTotalMemberListsPage } = useAdminMainStore();
  const [chartData, setChartData] = useState([]); // 차트 데이터 상태

  // 오늘 날짜 가져오기 (yyyy-MM-dd)
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // 날짜별 회원 수를 그룹화하는 함수
  const groupMembersByDate = (members) => {
    return members.reduce((acc, member) => {
      const date = member.createdAt.split('T')[0];
      acc[date] = (acc[date] || 0) + 1; // 날짜별 회원 수 카운트
      return acc;
    }, {});
  };

  // 최신 5일간 데이터를 정렬 및 반환하는 함수
  const calculateRecentChartData = (groupedData) => {
    const sortedData = Object.entries(groupedData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedData.slice(0, 5); // 최신 5일간의 데이터만 반환
  };

  // 오늘 가입한 회원 수를 계산하는 함수
  const calculateTodayMemberCount = (groupedData) => {
    const today = getTodayDate();
    return groupedData[today] || 0;
  };

  // 회원 리스트 데이터를 불러오는 함수
  const fetchMemberLists = async (page = 1, size = 10, sort = 'desc') => {
    try {
      let allMembers = [];
      let currentPage = page;
      let hasNextPage = true;

      // 모든 페이지의 데이터를 불러오기
      while (hasNextPage) {
        const response = await getAllMemberLists(currentPage, size, sort);
        allMembers = [...allMembers, ...response.contents.filter(member => !allMembers.some(members => members.memberId === member.memberId))];
        hasNextPage = response.hasNextPage;
        currentPage = response.nowPageNumber + 1;
        setTotalMemberListsPage(response.totalPage);
      }

      // 전체 회원 데이터를 저장
      setAllMemberLists(allMembers);
      setAllMembersCount(allMembers.length);

      // 날짜별 회원 수 그룹화 및 차트 데이터 생성
      const groupedData = groupMembersByDate(allMembers);
      const todayCount = calculateTodayMemberCount(groupedData);
      setTodayMemberCount(todayCount);

      // 차트 데이터 반환
      const recentChartData = calculateRecentChartData(groupedData);
      setChartData(recentChartData);
    } catch (error) {
      console.error('Error fetching member lists:', error);
    }
  };

  useEffect(() => {
    fetchMemberLists();
  }, []);

  return chartData; // 차트 데이터 반환
};

export default useMemberChartData;
