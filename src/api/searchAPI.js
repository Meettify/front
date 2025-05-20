const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
import axios from 'axios';
import request from './request';

// 전체 검색 
export const searchAll = async (totalKeyword) => {
  const token = sessionStorage.getItem("accessToken");

  const response = await axios.get(`${BASE_URL}/search`, {
    params: { totalKeyword: totalKeyword.trim() },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("검색 결과 확인 : ", response.data);
  return response.data;
};


// 레디스 최근 검색
export const getSearchLogs = async () => {
  const token = sessionStorage.getItem("accessToken");
  const response = await axios.get(`${BASE_URL}/search/searchLogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("최근 검색 10개 가져오기 : ", response.data);
  return response.data;
};

// 레디스 최근 검색 삭제
export const deleteSearchLog = async (name) => {
  const token = sessionStorage.getItem('accessToken');

  await axios.delete(`${BASE_URL}/search/searchLog`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: { name : name }, // ✅ DELETE 요청에서 body에 담을 경우 data 필드 필요
  });
};