import React, { useState } from 'react';
import { createItem } from '../../api/adminAPI';

const ItemAdd = () => {
    const [itemName, setItemName] = useState(''); // 빈 문자열로 초기화
    const [itemPrice, setItemPrice] = useState('0'); // 숫자도 문자열로 초기화하면 경고 방지
    const [itemCount, setItemCount] = useState(1); // 초기화된 값이 있는지 확인
    const [itemDetails, setItemDetails] = useState('');
    const [itemCategory, setItemCategory] = useState('SPORTS');
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        console.log('선택된 파일:', selectedFiles);
        setFiles(selectedFiles);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // files가 배열이 아닌 경우 빈 배열로 초기화
        const fileArray = Array.isArray(files) ? files : [];

        try {
            const response = await createItem(
                itemName,
                parseFloat(itemPrice),
                itemDetails,
                'WAIT', // 상태 고정
                parseInt(itemCount, 10),
                itemCategory,
                fileArray // 항상 배열로 전달
            );
            console.log('상품 등록 성공:', response);
            alert('상품이 등록되었습니다.');
            // 필요한 경우 상태 초기화
            setItemName('');
            setItemPrice('');
            setItemDetails('');
            setItemCount(1);
            setItemCategory('SPORTS');
            setFiles([]);
        } catch (error) {
            console.error('상품 등록 실패:', error);
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div>
                <h2 className="text-2xl font-bold text-center">상품 등록 신청하기</h2>
                <h6>등록한 상품 확인 후, 상품 서비스를 이용하실 수 있습니다.</h6>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-10">
                {[
                    { label: '상품명', value: itemName, onChange: setItemName, type: 'text' },
                    { label: '가격', value: itemPrice, onChange: setItemPrice, type: 'number' },
                    { label: '상세 설명', value: itemDetails, onChange: setItemDetails, type: 'textarea' },
                    { label: '수량', value: itemCount, onChange: setItemCount, type: 'number' },
                ].map(({ label, value, onChange, type }, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">{label}</label>
                        {type === 'textarea' ? (
                            <textarea
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                required
                                className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                            />
                        ) : (
                            <input
                                type={type}
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                required
                                className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                ))}
                <div className="flex flex-col items-center">
                    <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">카테고리</label>
                    <select
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="SPORTS">스포츠</option>
                        <option value="TRAVEL">여행</option>
                        <option value="MUSIC">음악</option>
                        <option value="ART">예술</option>
                        <option value="BOOKS">독서</option>
                        <option value="HEALTH">건강</option>
                        <option value="FASHION_BEAUTY">패션/뷰티</option>
                        <option value="PETS">반려동물</option>
                    </select>
                </div>
                <div className="flex flex-col items-center">
                    <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">상태</label>
                    <input
                        type="text"
                        value="대기중"
                        disabled
                        className="w-1/2 border border-gray-300 p-2 rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label className="block text-sm font-semibold text-gray-600 mb-1 w-1/2 text-left">파일 업로드</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemAdd;
