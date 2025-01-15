import { create } from 'zustand';
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
  getNotice,
} from '../api/noticeAPI';

const useNoticeStore = create((set, get) => ({
  notices: [], // 공지사항 목록
  loading: false, // 로딩 상태
  error: null, // 오류 상태
  page: 1, // 현재 페이지 (디폴트 1)

  //공지사항 전체 조회
  fetchNotices: async (page = 1, size = 10, sort = 'desc') => {
    set({ loading: true, error: null, notices: [] }); // 로딩 시작, 에러 및 기존 데이터를 초기화
    try {
      const response = await getNoticeList(page, size, sort); // API 호출
      const { communities, totalPage } = response; // 'communities' 배열을 notices에 설정
  
      console.log('API Response:', response);
  
      // 데이터를 상태에 저장
      set({
        notices: communities || [], // 'communities' 배열을 notices에 할당
        loading: false, // 로딩 끝
      });
  
      return totalPage; // 총 페이지 반환 (페이지네이션 용도)
    } catch (error) {
      console.error('공지사항 목록 로드 실패:', error);
      set({ error, loading: false }); // 오류 발생 시 에러 상태 설정
      throw error;
    }
  },

// 공지사항 상세 조회
fetchNoticeDetails: async (noticeId) => {
  console.log('Fetching notice details for ID:', noticeId); // 디버깅용
  try {
    const response = await getNotice(noticeId);
    return response;
  } catch (error) {
    console.error('공지사항 상세 조회 실패:', error);
    throw error;
  }
},

createNotice: async (title, content) => {
  console.log('Creating notice with title:', title, 'and content:', content); // 디버깅용
  try {
    await createNotice(title, content);
    alert('공지사항이 등록되었습니다.');
    await get().fetchNotices();
  } catch (error) {
    console.error('공지사항 등록 실패:', error);
  }
},

updateNotice: async (noticeId, title, content) => {
  console.log('Updating notice with ID:', noticeId, 'title:', title, 'content:', content); // 디버깅용
  try {
    await updateNotice(noticeId, title, content);
    alert('공지사항이 수정되었습니다.');
    await get().fetchNotices();
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
  }
},

deleteNotice: async (noticeId) => {
  console.log('Deleting notice with ID:', noticeId); // 디버깅용
  if (!window.confirm('정말 삭제하시겠습니까?')) return;

  try {
    await deleteNotice(noticeId);
    alert('공지사항이 삭제되었습니다.');
    await get().fetchNotices();
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
  }
},

  setPage: (page) => set({ page }),
}));

export default useNoticeStore;
