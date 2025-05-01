import { useEffect } from 'react';
import useMypageStore from '../stores/useMypageStore';
import { 
    getMeetJoinList, 
    getMyCommunityList,
    getMyInquiryList,
    getMyCommunityListCount, 
    getMyInquiryListCount,
    getMyOrderList,
    getMyOrderCount,
} from '../api/memberAPI';

export const useMyPage = () => {
    const { 
        meetJoinList,
        setMeetJoinList, 
        setHasNextMeetPage,
        meetJoinPage,
        setMeetJoinPage,
        posts, 
        setPosts, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        setTotalPages,
        totalPostCount,
        setTotalPostCount,
        inquirys,
        inquiryTotalPages,
        inquiryCurrentPage,
        totalInquiryCount,
        totalInquiryOkCount,
        setInquirys,
        setInquiryTotalPages,
        setInquiryCurrentPage,
        setTotalInquiryCount,
        setTotalInquiryOkCount,
        myOrderCurrentPage,
        myOrderListCount,
        myOrderList,
        myOrdertotalPages,
        setMyOrderList,
        setMyOrdertotalPages,
        setMyOrderCurrentPage,
        setMyOrderListCount,

    } = useMypageStore();

    // 마이페이지 모임 - S
useEffect(() => {
  const fetchMeets = async () => {
    try {
      const response = await getMeetJoinList(meetJoinPage, 10); // ✅ 페이지 전달

      // ✅ 응답 유효성 먼저 확인
      if (!response || !Array.isArray(response.content)) {
        setMeetJoinList([]); // 초기화 또는 무시
        setHasNextMeetPage(false);
        return;
      }
        
        console.log('받은 데이터:', response);
console.log('content:', response.content);
console.log('hasNext:', response.hasNext);

      const content = response.content;

      const roleOrder = {
        ADMIN: 1,
        MEMBER: 2,
        WAITING: 3,
        DORMANT: 4,
        EXPEL: 5,
      };

      const formattedMeets = content
        .map((meet) => ({
          meetMemberId: meet.meetMemberId,
          meetId: meet.meetId,
          meetName: meet.meetName,
          meetLocation: meet.location,
          category: meet.category,
          meetMaximum: meet.maximum,
          images: meet.imageUrls?.[0] ?? null,
          meetRole: meet.meetRole,
        }))
        .sort((a, b) => roleOrder[a.meetRole] - roleOrder[b.meetRole]);

      setMeetJoinList((prev) => {
          const combined = [...prev, ...formattedMeets];
          // 중복도 방지함
    const uniqueById = Array.from(new Map(combined.map(item => [item.meetId, item])).values());
    return uniqueById;
});
      setHasNextMeetPage(response.hasNext); // ✅ Slice의 hasNext
    } catch (error) {
      console.error("Error fetching meet join list:", error);
    }
  };

  fetchMeets();
}, [meetJoinPage]);
    // 마이페이지 모임 - E

    // 마이페이지 커뮤니티 - S
    const fetchPosts = async (page = 0, size = 10, sortOrder = 'desc') => {
        try {
            const response = await getMyCommunityList(page, size, sortOrder);

            if (!response || !Array.isArray(response.communities)) {
                setPosts([]);
                return;
            } else{
                setPosts(response.communities);
                setTotalPages(response.totalPage);
            }
            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchPostCount = async () => {
        try{
            const response = await getMyCommunityListCount();
            setTotalPostCount(response)

        } catch (error){
            console.error("Error fetching PostCount: ", error);
        }
    }

    useEffect(() => {
        fetchPostCount();
    }, [totalPostCount])

    useEffect(() => {
        if (currentPage > 0) {
            fetchPosts(currentPage - 1);
        }
    }, [currentPage]);
    // 마이페이지 커뮤니티 - E

    // 마이페이지 문의 - S
    const fetchInquirys = async (page = 0, size = 10, sortOrder = 'desc') => {
        try {
            const response = await getMyInquiryList(page, size, sortOrder);
            if (!response || !Array.isArray(response.contents)) {
                setInquirys([]);
                return;
            } else{
                setInquirys(response.contents);
                setInquiryTotalPages(response.totalPage);
            }            

        } catch (error) {
            console.error("Error fetching inquirys:", error);
        }
    };

    const fetchInquirysCount = async () => {
        try{
            const response = await getMyInquiryListCount();
            setTotalInquiryCount(response.totalQuestions);
            setTotalInquiryOkCount(response.completedReplies);
        } catch (error){
            console.error("Error fetching InquirysCount: ", error);
        }
    }

    useEffect(() => {
        if (inquiryCurrentPage > 0) {
            fetchInquirys(inquiryCurrentPage - 1);
        }
    }, [inquiryCurrentPage]);

    useEffect(() => {
        fetchInquirysCount();
    },[totalInquiryCount])
    // 마이페이지 문의 - E

    // 마이페이지 상품 - S
    const fetchOrders = async (page = 0, size = 10, sortOrder = 'desc') => {
        try {
            const response = await getMyOrderList(page, size, sortOrder);

            if (!response || !Array.isArray(response.contents)) {
                setMyOrderList([]);
                return;
            } else{
                setMyOrderList(response.contents);
                setMyOrdertotalPages(response.totalPage);
            }
            
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchOrderCount = async () => {
        try{
            const response = await getMyOrderCount();
            setMyOrderListCount(response)

        } catch (error){
            console.error("Error fetching OrderCount: ", error);
        }
    }

    useEffect(() => {
        if (myOrderCurrentPage > 0) {
            fetchOrders(myOrderCurrentPage - 1);
        }
    }, [myOrderCurrentPage]);

    useEffect(() => {
        fetchOrderCount();
    }, [myOrderListCount]);
    // 마이페이지 상품 - E

    return { 
        meetJoinList,
        posts, 
        currentPage,
        totalPages, 
        setCurrentPage,
        totalPostCount,
        setPosts,
        inquirys,
        totalInquiryCount,
        totalInquiryOkCount,
        setInquiryCurrentPage,
        inquiryTotalPages,
        myOrderList,
        myOrdertotalPages,
        myOrderCurrentPage,
        setMyOrderList,
        setMyOrderCurrentPage,
        fetchOrders
    };
};
