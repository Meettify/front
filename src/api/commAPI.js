// src/api/commAPI.js
import request from './request/index'; // 공통 axios 설정 사용

// 글 등록 (POST)
export const createCommunityPost = async (title, content, files = []) => {
    try {
        const response = await request.post({
            url: '/comm',
            data: {
                community: {
                    title,
                    content,
                },
                files
            }
        });
        return response.data;
    } catch (error) {
        console.error('글 생성 중 오류 발생:', error);
        throw error;
    }
};

// 글 수정 (PUT)
export const updateCommunityPost = async (communityId, title, content, files = []) => {
    try {
        const response = await request.put({
            url: `/comm/${communityId}`,
            data: {
                community: {
                    title,
                    content,
                },
                files
            }
        });
        return response.data;
    } catch (error) {
        console.error('글 수정 중 오류 발생:', error);
        throw error;
    }
};
