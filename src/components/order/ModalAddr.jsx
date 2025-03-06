import React, { useEffect, useState } from 'react';
import './ModalAddr.css';
import axios from "axios";
import { BsXLg } from "react-icons/bs";

const ModalAddr = ({addr, setModalAddr, setAddr}) => {
    const [newAddr, setNewAddr] = useState("");

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [selectAddr, setSelectAddr] = useState("변경할 주소 선택");
    const [position, setPosition] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)

    //네이버 지도 api 불러오기
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
    
      // 🔍 주소 검색 요청
      const fetchAddress = async () => {
        if (!newAddr) return;
        
        console.log("실행됨");
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/naver/${newAddr}`, // URL
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(response.data);
            setSearchResults(response.data);
        } catch (err) {
            console.error("주소 검색 실패 : ", err.response ? err.response.data : err);
        }
      };

    

    // 📍 주소 선택 시 지도 이동
    const handleSelectAddress = (addr) => {
        console.log(addr);
        const newPos = { lat: parseFloat(addr.lat), lng: parseFloat(addr.lng) };
        setPosition(newPos);

        if (map && marker) {
        const newLatLng = new window.naver.maps.LatLng(newPos.lat, newPos.lng);
        map.setCenter(newLatLng);
        marker.setPosition(newLatLng);
        }
        setSelectAddr(addr.address);
        
    };

    useEffect(()=>{
        setNewAddr(addr);
        fetchAddress();
        setSelectAddr(addr);
    }, [addr]);

    //변경하기 
    const handleChangeAddr = (e) => {
        if(selectAddr == "변경할 주소 선택") {
          
        };
        setAddr(selectAddr);
        setModalAddr(false);
    }

    return (
        <>
            <div className="ModalAddr modal">
                <div className="modal-dialog">
                    <div className='modal-header'>
                        <span className="modal-title">주소변경</span>
                        <button 
                        className="btn btn-ico btn-close"
                        onClick={()=>setModalAddr(false)}
                        >
                            <BsXLg />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="map-content-wrap">
                            <div className="map-wrap">
                                <div id="map"></div>
                            </div>
                            <div className="change-addr-area">
                                <div className="form-group change-form-group">
                                    <div className="input-group">
                                        <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={newAddr}
                                        onChange={e=>setNewAddr(e.target.value)}
                                        className='form-control'
                                        />
                                        <label htmlFor="">변경할 주소</label>
                                        <button className="btn" onClick={fetchAddress}>검색</button>
                                    </div>
                                </div>
                                <div className="addr-list">
                                    <ul>
                                        {searchResults.length !== 0? 
                                        searchResults.map(addr => (
                                            <li key={addr.address} onClick={() => handleSelectAddress(addr)}>
                                                <span>{addr.address}</span>
                                            </li>
                                            ))
                                        :
                                        <li className='nodata'>검색 결과가 없습니다.</li>}
                                    </ul>
                                </div>
                                <div className="form-group selected-form-group">
                                    <div className="input-group">
                                        <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={selectAddr}
                                        className='form-control'
                                        readOnly
                                        />
                                    </div>
                                </div>
                                <div className="btns-wrap">
                                    <button className="btn btn-primary" onClick={handleChangeAddr}>변경</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddr;