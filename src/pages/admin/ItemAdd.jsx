import React, { useState } from 'react';
import useAdminStore from '../../stores/useAdminStore';

const ItemAdd = () => {
  const { addItem } = useAdminStore();
  const [form, setForm] = useState({
    itemName: '',
    itemPrice: '',
    itemDetails: '',
    itemCount: '',
    itemCategory: '',
    itemStatus: 'SELL',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(form);
    alert('상품이 등록되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>상품 등록</h1>
      <label>상품명: <input type="text" name="itemName" value={form.itemName} onChange={handleChange} /></label>
      <label>가격: <input type="number" name="itemPrice" value={form.itemPrice} onChange={handleChange} /></label>
      <label>설명: <input type="text" name="itemDetails" value={form.itemDetails} onChange={handleChange} /></label>
      <label>수량: <input type="number" name="itemCount" value={form.itemCount} onChange={handleChange} /></label>
      <label>카테고리: <input type="text" name="itemCategory" value={form.itemCategory} onChange={handleChange} /></label>
      <button type="submit">등록</button>
    </form>
  );
};

export default ItemAdd;
