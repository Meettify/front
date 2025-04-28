import { useState, useEffect } from "react";
import axios from "axios";

function MapSearch({ onSelectPlace, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  // 카카오 맵 초기화
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const latlng = new window.kakao.maps.LatLng(lat, lng);
        setCurrentLocation({ lat, lng });

        const mapContainer = document.getElementById("mainMap");
        const kakaoMap = new window.kakao.maps.Map(mapContainer, {
          center: latlng,
          level: 3,
        });

        const userMarker = new window.kakao.maps.Marker({
          map: kakaoMap,
          position: latlng,
          title: "현재 위치",
        });

        setMarker(userMarker);
        setMap(kakaoMap);

        // 현재 위치로 기본 장소 설정
        setSelectedPlace({
          title: "현재 위치",
          address: "현재 위치",
          lat,
          lng,
        });
      },
      (err) => {
        alert("위치 정보를 가져올 수 없습니다.");
        console.error(err);
      }
    );
  }, []);

  // 검색 실행
  const handleSearch = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/naver`, {
        params: { query: searchQuery },
      });

      const cleaned = res.data.map((place) => ({
        ...place,
        title: place.title.replace(/<[^>]+>/g, ""),
        address: place.address.replace(/<[^>]+>/g, ""),
      }));

      setSearchResults(cleaned);
      if (cleaned[0]) updateMap(cleaned[0]);
    } catch (err) {
      alert("검색 실패");
      console.error(err);
    }
  };

  // 지도 업데이트
  const updateMap = (place) => {
    if (!map) return;

    const latlng = new window.kakao.maps.LatLng(place.lat, place.lng);
    map.setCenter(latlng);

    if (marker) marker.setMap(null);

    const newMarker = new window.kakao.maps.Marker({
      map,
      position: latlng,
      title: place.title,
    });

    setMarker(newMarker);
    setSelectedPlace(place);
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-30">
      {/* 왼쪽: 지도 영역 */}
      <div className="flex-1 bg-white">
        <div id="mainMap" className="w-full h-full" />
      </div>

      {/* 오른쪽: 검색 + 결과 + 공유 */}
      <div className="w-[460px] h-full bg-white shadow-xl p-4 flex flex-col">
        {/* 상단 검색창 */}
        <div className="border-b pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="검색어를 입력하세요"
              className="flex-grow border rounded px-3 py-2"
            />
            <button onClick={onClose} className="text-xl hover:text-gray-500">
              ✖
            </button>
          </div>
          <button
            onClick={handleSearch}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            🔍 검색
          </button>
        </div>

        {/* 검색 결과 목록 */}
        <div className="overflow-y-auto flex-1 py-4">
          <ul className="space-y-3">
            {searchResults.map((place, idx) => (
              <li
                key={idx}
                onClick={() => updateMap(place)}
                className={`cursor-pointer p-3 border rounded-md shadow-sm hover:shadow transition ${
                  selectedPlace?.title === place.title
                    ? "bg-blue-100 border-blue-300"
                    : "bg-white"
                }`}
              >
                <strong className="block font-medium mb-1">
                  {place.title}
                </strong>
                <p className="text-gray-600 text-sm">{place.address}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 공유 버튼 */}
        {selectedPlace && (
          <button
            onClick={() => {
              onSelectPlace(selectedPlace);
              onClose();
            }}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-lg"
          >
            📍 공유하기
          </button>
        )}
      </div>
    </div>
  );
}

export default MapSearch;
