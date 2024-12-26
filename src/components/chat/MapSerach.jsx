import { useState, useEffect } from "react";
import axios from "axios";

function MapSearch({ onSelectPlace }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.5665, // 기본값: 서울 시청
    lng: 126.978,
  });

  // 사용자의 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("현재 위치를 가져오는데 실패했습니다:", error);
        }
      );
    }
  }, []);

  // 주소 검색
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/v1/naver/${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data); // 검색 결과 저장
      renderMap(response.data); // 지도 렌더링
    } catch (error) {
      alert("검색에 실패했습니다. 다시 시도해주세요."); // 사용자 알림
      console.error("검색 실패:", error);
    }
  };

  // 주소 화면
  const renderMap = (places) => {
    const kakao = window.kakao;
    const container = document.getElementById("map");
    const options = {
      center: places.length
        ? new kakao.maps.LatLng(places[0].lat, places[0].lng)
        : new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng), // 현재 위치를 지도 중심으로 설정
      level: places.length ? 3 : 11, // 검색 결과가 없으면 확대 수준 변경
    };
    const map = new kakao.maps.Map(container, options);

    places.forEach((place) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        title: place.title,
      });

      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${place.title}</div>`,
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        infoWindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        infoWindow.close();
      });

      kakao.maps.event.addListener(marker, "click", () => {
        setSelectedPlace(place); // 선택한 장소 상태 업데이트
        onSelectPlace(place); // 상위 컴포넌트에 선택된 장소 전달
      });

      // 강조된 마커
      const isSelected = selectedPlace && selectedPlace.title === place.title;
      if (isSelected) {
        marker.setImage(
          new kakao.maps.MarkerImage(
            "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 강조된 마커 이미지
            new kakao.maps.Size(24, 35)
          )
        );
      }
    });
  };

  return (
    <div className="flex">
      {/* 지도 영역 */}
      <div className="w-1/2">
        <div id="map" className="w-full h-64 mt-4"></div>
      </div>

      {/* 검색 결과 리스트 */}
      <div className="w-1/2 p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full border rounded p-2"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-primary text-white p-2 rounded w-full"
        >
          검색
        </button>
        <ul className="mt-4">
          {searchResults.map((place, index) => (
            <li
              key={index}
              className={`mb-2 p-2 rounded ${
                selectedPlace && selectedPlace.title === place.title
                  ? "bg-blue-100" // 선택된 장소 강조
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <strong>{place.title}</strong>
                  <p className="text-gray-500">{place.address}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlace(place); // 장소 선택
                    onSelectPlace(place); // 상위 컴포넌트에 전달
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  공유하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapSearch;
