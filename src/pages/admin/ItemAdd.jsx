import React, { useState } from 'react';
import RoundedButton from '../../components/button/RoundedButton';
import RoundedCancelButton from '../../components/button/RoundedCancelButton';
import useAdminStore from '../../stores/useAdminStore';
import { useNavigate } from 'react-router-dom';

const ItemAdd = () => {
  const [itemName, setItemName] = useState('');  // 상품 이름 상태
  const [itemPrice, setItemPrice] = useState(0); // 상품 가격 상태
  const [itemDetails, setItemDetails] = useState(''); // 상품 상세 상태
  const [itemCount, setItemCount] = useState(0); // 상품 수량 상태
  const [itemCategory, setItemCategory] = useState(''); // 상품 카테고리 상태
  const [itemStatus, setItemStatus] = useState('SELL'); // 상품 상태 초기값
  const [files, setFiles] = useState([]);  // 파일 상태
  const { addItem } = useAdminStore();  // Zustand에서 addItem 함수 불러오기
  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));  // 파일 배열로 변환하여 상태에 저장
  };

  // 상품 등록 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 상품 데이터 객체
      const newItemData = {
        itemName,
        itemPrice,
        itemDetails,
        itemCount,
        itemCategory,
        itemStatus,
      };
      await addItem(newItemData, files);  // 상품 추가
      navigate('/admin/itemList');  // 성공 시 아이템 목록 페이지로 이동
    } catch (error) {
      console.error('상품 등록 중 오류:', error);
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    setItemName('');  // 상품 이름 초기화
    setItemPrice(0);  // 상품 가격 초기화
    setItemDetails('');  // 상품 상세 초기화
    setItemCount(0);  // 상품 수량 초기화
    setItemCategory('');  // 상품 카테고리 초기화
    setItemStatus('SELL');  // 상품 상태 초기화
    setFiles([]);  // 파일 초기화
    navigate('/admin/itemList');  // 취소 시 아이템 목록 페이지로 이동
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 상품 이름 입력 */}
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md text-sm"
        placeholder="상품 이름을 입력하세요"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      {/* 상품 가격 입력 */}
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded-md text-sm"
        placeholder="상품 가격을 입력하세요"
        value={itemPrice}
        onChange={(e) => setItemPrice(Number(e.target.value))}
      />

      {/* 상품 상세 입력 */}
      <textarea
        className="w-full p-2 mb-4 border rounded-md text-sm"
        placeholder="상품 상세를 입력하세요"
        value={itemDetails}
        onChange={(e) => setItemDetails(e.target.value)}
      />

      {/* 상품 수량 입력 */}
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded-md text-sm"
        placeholder="상품 수량을 입력하세요"
        value={itemCount}
        onChange={(e) => setItemCount(Number(e.target.value))}
      />

      {/* 상품 카테고리 입력 */}
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md text-sm"
        placeholder="상품 카테고리를 입력하세요"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />

      {/* 상품 상태 선택 */}
      <select
        className="w-full p-2 mb-4 border rounded-md text-sm"
        value={itemStatus}
        onChange={(e) => setItemStatus(e.target.value)}
      >
        <option value="SELL">판매중</option>
        <option value="WAIT">검토중</option>
        <option value="SOLD_OUT">판매 완료</option>
      </select>

      {/* 파일 선택 입력 */}
      <input type="file" multiple onChange={handleFileChange} />

      {/* 등록 및 취소 버튼 */}
      <div className="flex space-x-4">
        <RoundedButton onClick={handleSubmit}>등록</RoundedButton>
        <RoundedCancelButton onClick={handleCancel}>취소</RoundedCancelButton>
      </div>
    </div>
  );
};

export default ItemAdd;
