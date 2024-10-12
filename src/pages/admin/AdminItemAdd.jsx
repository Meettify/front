import React from 'react';
import useAdminStore from '../../stores/useAdminStore';

const AdminItemAdd = () => {
    const { productData, setProductData, createProduct, loading, error } = useAdminStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(name, value); // 상태 업데이트
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct(); // 상품 등록 후 자동으로 products 상태에 추가됨
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">상품 등록</h2>
            {error && <p className="text-red-500 mb-4">오류: {error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">상품명</label>
                    <input
                        type="text"
                        name="itemName"
                        value={productData.itemName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">가격</label>
                    <input
                        type="number"
                        name="itemPrice"
                        value={productData.itemPrice}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">상품 설명</label>
                    <textarea
                        name="itemDetails"
                        value={productData.itemDetails}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">상품 상태</label>
                    <select
                        name="itemStatus"
                        value={productData.itemStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="SELL">판매 중</option>
                        <option value="SOLD_OUT">품절</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2">재고 수량</label>
                    <input
                        type="number"
                        name="itemCount"
                        value={productData.itemCount}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">카테고리</label>
                    <select
                        name="itemCategory"
                        value={productData.itemCategory}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="SPORTS">스포츠</option>
                        <option value="ELECTRONICS">전자기기</option>
                        <option value="FASHION">패션</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                >
                    {loading ? '등록 중...' : '상품 등록'}
                </button>
            </form>
        </div>
    );
};

export default AdminItemAdd;
