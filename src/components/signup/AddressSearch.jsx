import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const AddressSearch = ({ onComplete }) => {
  // Daum 주소 검색 API 스크립트 URL
  const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  
  // DaumPostcode 팝업을 열기 위한 훅
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  // 주소 선택 후 처리하는 함수
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    // 참고항목이 있을 경우 추가
    if (data.addressType === "R") { // 주소 유형이 도로명 주소인 경우
      if (data.bname !== "") { // 법정동 이름이 있는 경우
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") { // 건물 이름이 있는 경우
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // 추가적인 주소 정보가 있다면 전체 주소에 포함
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 선택한 주소와 우편번호를 부모 컴포넌트로 전달
    onComplete({
      postalCode: data.zonecode, // 우편번호
      address: fullAddress, // 전체 주소
    });
  };

  // 팝업을 열기 위한 함수
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="m-auto">
      <button 
        type="button"
        onClick={handleClick}>
        주소검색
      </button>
    </div>
  );
};

export default AddressSearch;
