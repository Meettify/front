import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsXLg } from "react-icons/bs";

const ModalAddr = ({ addr, setModalAddr, setAddr }) => {
  const [newAddr, setNewAddr] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectAddr, setSelectAddr] = useState("변경할 주소 선택");
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8ntprl5zu0&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      const mapInstance = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(position.lat, position.lng),
        zoom: 15,
      });

      const markerInstance = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(position.lat, position.lng),
        map: mapInstance,
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchAddress = async () => {
    if (!newAddr) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/naver/${newAddr}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error(
        "주소 검색 실패 : ",
        err.response ? err.response.data : err
      );
    }
  };

  const handleSelectAddress = (addr) => {
    const newPos = { lat: parseFloat(addr.lat), lng: parseFloat(addr.lng) };
    setPosition(newPos);
    if (map && marker) {
      const newLatLng = new window.naver.maps.LatLng(newPos.lat, newPos.lng);
      map.setCenter(newLatLng);
      marker.setPosition(newLatLng);
    }
    setSelectAddr(addr.address);
  };

  useEffect(() => {
    setNewAddr(addr);
    fetchAddress();
    setSelectAddr(addr);
  }, [addr]);

  const handleChangeAddr = () => {
    if (selectAddr === "변경할 주소 선택") return;
    setAddr(selectAddr);
    setModalAddr(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">주소변경</span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300"
            onClick={() => setModalAddr(false)}
          >
            <BsXLg />
          </button>
        </div>
        <div className="p-4">
          <div className="flex gap-5">
            <div className="w-[360px] h-[360px] border rounded-lg bg-gray-100 overflow-hidden">
              <div id="map" className="w-full h-full"></div>
            </div>
            <div className="flex-1 flex flex-col h-[360px]">
              <div className="pb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newAddr}
                    onChange={(e) => setNewAddr(e.target.value)}
                    className="form-input w-full border rounded px-3 py-2"
                  />
                  <button
                    onClick={fetchAddress}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    검색
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto border rounded-t-lg p-2 mb-[-1px]">
                <ul>
                  {searchResults.length !== 0 ? (
                    searchResults.map((addr) => (
                      <li
                        key={addr.address}
                        onClick={() => handleSelectAddress(addr)}
                        className="p-2 border-b border-dashed border-gray-300 text-left cursor-pointer hover:bg-blue-100 active:bg-blue-300"
                      >
                        {addr.address}
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-gray-500 pointer-events-none">
                      검색 결과가 없습니다.
                    </li>
                  )}
                </ul>
              </div>
              <div className="pb-3">
                <input
                  type="text"
                  value={selectAddr}
                  readOnly
                  className="w-full border-t-2 border-blue-500 rounded-b-lg bg-gray-100 text-blue-800 px-3 py-2"
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                onClick={handleChangeAddr}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddr;
