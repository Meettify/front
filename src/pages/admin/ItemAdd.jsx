import React, { useState } from 'react';
import useAdminStore from '../../stores/useAdminStore';
import { useNavigate } from 'react-router-dom';

const ItemAdd = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDetails, setItemDetails] = useState('');
  const [itemCount, setItemCount] = useState(0);
  const [itemCategory, setItemCategory] = useState('');
  const [files, setFiles] = useState([]);
  const { addItem } = useAdminStore();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { itemName, itemPrice, itemDetails, itemCount, itemCategory, itemStatus: 'SELL' };
    await addItem(newItem, files);
    navigate('/admin/itemList');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">상품 등록</h1>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md"
        placeholder="상품 이름"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded-md"
        placeholder="상품 가격"
        value={itemPrice}
        onChange={(e) => setItemPrice(Number(e.target.value))}
      />
      <textarea
        className="w-full p-2 mb-4 border rounded-md"
        placeholder="상품 상세"
        value={itemDetails}
        onChange={(e) => setItemDetails(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded-md"
        placeholder="상품 수량"
        value={itemCount}
        onChange={(e) => setItemCount(Number(e.target.value))}
      />
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md"
        placeholder="카테고리"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default ItemAdd;
