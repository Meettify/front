import request from './request';

const BASE_URL = '/notice';

// 공지사항 등록
export const createNotice = async (title, content) => {
  try {
    const response = await request.post({
      url: BASE_URL,
      data: { title, content },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 등록 중 오류 발생:', error);
    throw error;
  }
};

// 공지사항 수정
export const updateNotice = async (noticeId, title, content, remainImgId = []) => {
  try {
    const response = await request.put({
      url: `${BASE_URL}/${noticeId}`,
      data: { title, content, remainImgId },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 수정 중 오류 발생:', error);
    throw error;
  }
};

// 공지사항 삭제
export const deleteNotice = async (noticeId) => {
  try {
    const response = await request.del({
      url: `${BASE_URL}/${noticeId}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, // 인증 토큰
      },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 삭제 중 오류 발생:', error);
    throw error;
  }
};

// 공지사항 상세 조회
export const getNotice = async (noticeId) => {
  try {
    const response = await request.get({ url: `${BASE_URL}/${noticeId}` });
    return response.data;
  } catch (error) {
    console.error('공지사항 상세 조회 중 오류 발생:', error);
    throw error;
  }
};

// 공지사항 목록 조회 (페이징)
export const getNoticeList = async (page = 0, size = 1, sort = []) => {
  try {
    const response = await request.get({
      url: `${BASE_URL}List`,
      params: { page, size, sort },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 목록 조회 중 오류 발생:', error);
    throw error;
  }
};
