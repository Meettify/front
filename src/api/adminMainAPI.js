import request from './request';


// 관리자 모든 회원 /admin/members
export const getAllMemberLists = async (page = 1, size = 10, sort = 'desc') => {
    try {
        const response = await request.get({
            url: `/admin/members`,
            params: { page, size, sort},
        });
        return response.data;
    } catch (error) {
        console.error('getAllMemberLists Error', error);
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

// 관리자 모든 문의글 /admin/questions
export const getAllQuestionLists = async (page = 1, size = 10, sort = 'desc', replyStatus) => {
    try {
        const response = await request.get({
            url: `/admin/questions`,
            params: { page, size, sort, replyStatus },
        });
        return response.data;
    } catch (error) {
        console.error('getAllQuestionLists Error', error);
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

// 관리자 모든 문의글 수 /questions/count-questions
export const getAllQuestionsCount = async () => {
    try {
        const response = await request.get({
            url: `/questions/count-questions`,
        });
        return response.data;
    } catch (error) {
        console.error('getAllQuestionsCount Error', error);
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

// 관리자 모든 커뮤니티글 수 /community/count-community
export const getAllCommunityPostsCount = async () => {
    try {
        const response = await request.get({
            url: `/community/count-community`,
        });
        return response.data;
    } catch (error) {
        console.error('getAllCommunityPostsCount Error', error);
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

// 관리자 모든 주문 수 /orders/count-order
export const getAllOrdersCount = async () => {
    try {
        const response = await request.get({
            url: `/orders/count-order`,
        });
        return response.data;
    } catch (error) {
        console.error('getAllOrdersCount Error', error);
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

// 관리자 모든 상품 수 /items/count-items
export const getAllItemsCount = async () => {
    try {
        const response = await request.get({
            url: `/items/count-items`,
        });
        return response.data;
    } catch (error) {
        console.error('getAllItemsCount Error', error);
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

// 관리자 회원 추방 /admin/{memberId}
export const removeMember = async (memberId) => {
    try {
        const response = await request.del({
            url: `/admin/${memberId}`,
        });
        return response;
    } catch (error) {
        console.error('removeMember Error', error);
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
