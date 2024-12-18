import { useEffect, useState } from 'react';
import { getAllCommunityPosts } from '../api/commAPI';
import useAdminMainStore from '../stores/useAdminMainStore';

const useCommChartData = () => {
  const [chartData, setChartData] = useState([]);
  const [todayPostCount, setTodayPostCount] = useState(0);
  const { setTodayPostsCount, setAllCommunityPostsCount } = useAdminMainStore();

  useEffect(() => {
    const calculateChartData = async () => {
      let allPosts = []; // 모든 데이터를 저장할 배열
      let currentPage = 0;
      let totalPages = 1;
      const todayDate = new Date().toISOString().split('T')[0];  // 오늘 날짜 (YYYY-MM-DD 형식)

      // 게시물 데이터와 날짜별 게시물 수를 모으는 과정
      while (currentPage <= totalPages) {
        const response = await getAllCommunityPosts(currentPage, 10, 'desc'); 
        const { communities, totalPage } = response;
        totalPages = totalPage;

        // 중복된 boardId를 제거하면서 게시물 데이터를 추가
        allPosts = [
          ...allPosts,
          ...communities.filter(post => !allPosts.some(existingPost => existingPost.boardId === post.boardId))
        ]; 

        currentPage++;
      }

      // 날짜별 게시물 수 카운트
      const countByDate = allPosts.reduce((acc, post) => {
        const postDate = post.regTime.split(' ')[0];

        if (acc[postDate]) {
          acc[postDate] += 1;
        } else {
          acc[postDate] = 1;
        }

        return acc;
      }, {});

      // 오늘 날짜의 게시글 수 구하기
      const todayCount = countByDate[todayDate] || 0;
      setTodayPostCount(todayCount);
      setTodayPostsCount(todayPostCount);
      setAllCommunityPostsCount(allPosts.length);

      // 날짜를 기준으로 데이터를 정렬 (내림차순)
      const sortedDates = Object.entries(countByDate)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      // 최신 5일 간의 데이터만 남기기
      const recentFiveDaysData = sortedDates.slice(0, 5);

      // 차트 데이터로 설정
      setChartData(recentFiveDaysData);
    };

    calculateChartData();
  }, []);

  return chartData;
};

export default useCommChartData;
