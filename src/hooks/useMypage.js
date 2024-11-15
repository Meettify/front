import { useEffect } from 'react';
import useMypageStore from '../stores/useMypageStore';
import { getMeetJoinList, getMyCommunityList } from '../api/memberAPI';

export const useMyPage = () => {
    const { 
        meetJoinList,
        setMeetJoinList, 
        posts, 
        setPosts, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        setTotalPages,
        setTotalPostCount
    } = useMypageStore();

    let totalPostCount = 0;

    useEffect(() => {
        const fetchMeets = async () => {
            try {
                const response = await getMeetJoinList();

                if (response.length <= 0) {
                    return [];
                }

                if (Array.isArray(response) && response.length > 0) {
                    const roleOrder = {
                        'ADMIN': 1,
                        'MEMBER': 2,
                        'WAITING': 3,
                        'DORMANT': 4,
                        'EXPEL': 5,
                    };

                    const formattedMeets = response
                        .map(meet => ({
                            meetMemberId: meet.meetMemberId,
                            meetId: meet.meetId,
                            meetName: meet.meetName,
                            meetLocation: meet.location,
                            category: meet.category,
                            meetMaximum: meet.maximum,
                            images: meet.imageUrls.length > 0 ? meet.imageUrls[0] : null,
                            meetRole: meet.meetRole,
                        }))
                        .sort((a, b) => roleOrder[a.meetRole] - roleOrder[b.meetRole]);

                    setMeetJoinList(formattedMeets);
                }
            } catch (error) {
                console.error('Error fetching meet join list:', error);
            }
        };
        fetchMeets();
    }, []);

    const fetchPosts = async (page = 0, size = 10, sortOrder = 'desc') => {
        try {
            const response = await getMyCommunityList(page, size, sortOrder);
            if (page === 0) setPosts(response.communities);
            else setPosts((prevPosts) => [...prevPosts, ...response.communities]);

            setTotalPages(response.totalPage);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const calculateTotalPosts = async () => {
        try {
            const allPosts = [];
            for (let page = 0; page < totalPages; page++) {
                const response = await getMyCommunityList(page, 10, 'desc');
                allPosts.push(...response.communities);
            }
            const count = allPosts.length;
            setTotalPostCount(count); // 상태에 저장
            return count;
        } catch (error) {
            console.error("Error calculating total posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage - 1);
    }, [currentPage]);

    useEffect(() => {
        const updateTotalPostCount = async () => {
            if (totalPages > 0) {
                const count = await calculateTotalPosts();
                setTotalPostCount(count); // 상태에 저장
            }
        };
        updateTotalPostCount();
    }, [totalPages]);

    return { 
        meetJoinList,
        posts, 
        currentPage,
        totalPages, 
        setCurrentPage,
        fetchPosts,
        totalPostCount,
    };
};
