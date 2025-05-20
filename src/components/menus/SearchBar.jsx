// ✅ SearchBar.jsx (비회원도 최근 검색 가능하도록 개선)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { getSearchLogs, deleteSearchLog } from "../../api/searchAPI";
import { useAuth } from "../../hooks/useAuth"; // ✅ 로그인 상태 hook

const SearchBar = ({ searchTerm, setSearchTerm, closeSearch }) => {
  const [input, setInput] = useState(searchTerm);
  const [recentLogs, setRecentLogs] = useState([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // 여기서 상태를 가져옴
  const isLoggedIn = isAuthenticated;
  const LOCAL_LOG_KEY = "guestSearchLogs";

  useEffect(() => {
    setInput(searchTerm); // 부모로부터 받은 searchTerm을 입력에 반영
  }, [searchTerm]);

  useEffect(() => {
    console.log("로그인 확인 : ", isLoggedIn);
  }, [isLoggedIn]);

  // 비로그인 사용자 최근 검색어 저장
  const saveGuestSearch = (keyword) => {
    // 키 값으로 localStorage 조회
    let logs = JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)) || [];
    logs = logs.filter((item) => item !== keyword); // 중복 제거
    logs.unshift(keyword); // 맨 앞에 추가
    if (logs.length > 10) logs.pop(); // 10개 까지만 유지
    localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(logs));
  };

  // 비로그인 사용자 최근 검색 가져오기
  const getGuestLogs = () => {
    return JSON.parse(localStorage.getItem(LOCAL_LOG_KEY)) || [];
  };

  // 비로그인 사용자 최근 검색 삭제
  const deleteGuestLog = (name) => {
    // 받아온 name과 다른 것들만 logs에 담아줌
    const logs = getGuestLogs().filter((item) => item !== name);
    // logs를 다시 localStorage에 담아줌
    localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(logs));
  };

  // 최근 검색어 가져오기
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if (isLoggedIn) {
          const logs = await getSearchLogs();
          console.log("최근 검색어 : ", logs);
          setRecentLogs(logs.map((log) => log.name));
        } else {
          setRecentLogs(getGuestLogs()); // ✅ 여기서 프론트 저장된 검색 기록 가져옴
        }
      } catch (err) {
        console.error("최근 검색어 로딩 실패", err);
      }
    };
    fetchLogs();
  }, [isLoggedIn]);

  // 검색 입력칸 글씨 부분
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  // 검색 동작
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (isLoggedIn) {
        navigate(`/search?totalKeyword=${encodeURIComponent(input.trim())}`);
      } else {
        saveGuestSearch(input.trim());
      }
      closeSearch();
    }
  };

  // 최근 검색 클릭시 검색됨
  const handleLogClick = (keyword) => {
    console.log("최근 검색 크릭 값 확인 : ", keyword);
    setInput(keyword);
    setSearchTerm(keyword);

    // 검색어 저장
    if (!isLoggedIn) saveGuestSearch(keyword);

    // 검색 페이지로 이동
    navigate(
      `/search?totalKeyword=${encodeURIComponent(keyword)}&t=${Date.now()}`
    );

    // UI 닫기 (딜레이 주면 더 안정적일 수 있음)
    setTimeout(() => {
      closeSearch();
    }, 100);
  };

  // 최근 검색 삭제
  const handleLogDelete = async (name) => {
    try {
      if (isLoggedIn) {
        await deleteSearchLog(name);
      } else {
        deleteGuestLog(name);
      }
      setRecentLogs((prev) => prev.filter((log) => log !== name));
    } catch (err) {
      console.error("검색어 삭제 실패", err);
    }
  };

  const filteredLogs = recentLogs
    .filter((name) => name.trim() !== "") // ✅ 빈 문자열 제거
    .filter((name) => name.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[600px] bg-gray-100 p-4 rounded-lg shadow-md relative">
        {/* 검색 입력 영역 */}
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="검색어를 입력하세요..."
            className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md transition"
          >
            <LuSearch size={20} />
          </button>
        </form>

        {/* 최근 검색어 */}
        {focused && (
          <div className="mt-3 bg-white border border-gray-200 rounded-md shadow-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              최근 검색어
            </h4>

            {filteredLogs.length > 0 ? (
              <ul className="space-y-2">
                {filteredLogs.map((name) => (
                  <li
                    key={name}
                    onClick={() => handleLogClick(name)} // ✅ li 자체에 onClick
                    className="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded hover:bg-blue-100 transition cursor-pointer"
                  >
                    <span className="text-blue-600 hover:underline text-sm truncate">
                      {name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // ✨ 삭제 버튼 클릭 시 부모(li)의 클릭 방지
                        handleLogDelete(name);
                      }}
                      className="text-gray-400 hover:text-red-500 text-xs transition"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 text-left">
                최근 검색 기록이 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
