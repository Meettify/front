import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';

const ItemModify = () => {
    const { itemId } = useParams();  // URL에서 itemId를 가져옴
    const { itemDetails, fetchItemDetails, updateItem } = useAdminStore();  // Zustand에서 함수와 상태 가져옴
    const [formData, setFormData] = useState({
        itemName: '',
        itemPrice: '',
        itemDetails: '',
        itemCount: '',
        itemCategory: ''
    });

    // 상품 상세 정보 가져오기
    useEffect(() => {
        fetchItemDetails(itemId);
    }, [itemId]);

    // 상품 정보가 로드되면 formData 상태에 반영
    useEffect(() => {
        if (itemDetails) {
            setFormData({
                itemName: itemDetails.itemName,
                itemPrice: itemDetails.itemPrice,
                itemDetails: itemDetails.itemDetails,
                itemCount: itemDetails.itemCount,
                itemCategory: itemDetails.itemCategory
            });
        }
    }, [itemDetails]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        updateItem(itemId, data);  // 상품 업데이트 API 호출
    };

    if (!itemDetails) return <p>Loading...</p>;

    return (
        <div>
            <h1>상품 수정</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>상품명</label>
                    <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} />
                </div>
                <div>
                    <label>가격</label>
                    <input type="number" name="itemPrice" value={formData.itemPrice} onChange={handleChange} />
                </div>
                <div>
                    <label>상세 설명</label>
                    <textarea name="itemDetails" value={formData.itemDetails} onChange={handleChange} />
                </div>
                <div>
                    <label>재고</label>
                    <input type="number" name="itemCount" value={formData.itemCount} onChange={handleChange} />
                </div>
                <div>
                    <label>카테고리</label>
                    <select name="itemCategory" value={formData.itemCategory} onChange={handleChange}>
                        <option value="SPORTS">스포츠</option>
                        <option value="TRAVEL">여행</option>
                        <option value="MUSIC">음악</option>
                        <option value="ART">예술</option>
                        <option value="READING">독서</option>
                        <option value="HEALTH">건강</option>
                        <option value="FASHION">패션/뷰티</option>
                        <option value="PETS">반려동물</option>
                    </select>
                </div>
                <button type="submit">수정</button>
            </form>
        </div>
    );
};

export default ItemModify;
