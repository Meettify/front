import { useEffect } from "react";
import useAdminMainStore from "../stores/useAdminMainStore";
import { 
    getAllMemberLists,
    getAllQuestionLists,
    getAllQuestionsCount,
    getAllCommunityPostsCount,
    getAllOrdersCount,
    getAllItemsCount,
 } from "../api/adminMainAPI";

 export const useAdminMain = () => {

    const{
        allMemberLists,
        allMembersCount,
        allQuestionLists,
        totalQuestions,
        completedReplies,
        pendingReplies,
        allCommunityPostsCount,
        allOrdersCount,
        allItemsCount,
        setAllMemberLists,
        setAllMembersCount,
        setAllQuestionLists,
        setTotalQuestions,
        setCompletedReplies,
        setPendingReplies,
        setAllCommunityPostsCount,
        setAllOrdersCount,
        setAllItemsCount,
    } = useAdminMainStore();

    const fetchQuestionsCount = async () => {
        try{
            const response = await getAllQuestionsCount();
            setTotalQuestions(response.totalQuestions);
            setCompletedReplies(response.completedReplies);
            setPendingReplies(response.pendingReplies);
        } catch (error){
            console.error("getAllQuestionsCount ERROR", error);
        }
    }

    useEffect(() => {
        fetchQuestionsCount();
    },[totalQuestions, completedReplies, pendingReplies])

    return{
        allMemberLists,
        allMembersCount,
        allQuestionLists,
        totalQuestions,
        completedReplies,
        pendingReplies,
        allCommunityPostsCount,
        allOrdersCount,
        allItemsCount,
        setAllMemberLists,
        setAllMembersCount,
        setAllQuestionLists,
        setTotalQuestions,
        setCompletedReplies,
        setPendingReplies,
        setAllCommunityPostsCount,
        setAllOrdersCount,
        setAllItemsCount,
    };
 }