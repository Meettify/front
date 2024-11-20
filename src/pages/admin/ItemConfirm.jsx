import React, { useEffect, useState } from 'react';
import { getPendingItems, confirmItem } from '../../api/adminAPI';
import useAdminStore from '../../stores/useAdminStore';

const ItemConfirm = () => {
    const [pendingItems, setPendingItems] = useState([]);
    const fetchItemList = useAdminStore((state) => state.fetchItemList);

    useEffect(() => {
        const fetchPendingItems = async () => {
            try {
                const items = await getPendingItems(); // 대기 중인 상품 목록 가져오기
                setPendingItems(items);
            } catch (error) {
                console.error('대기 중인 상품 목록을 불러오는 중 오류 발생:', error);
            }
        };

        fetchPendingItems();
    }, []);



    const handleConfirmItem = async (itemId) => {
        try {
            const response = await confirmItem(itemId); // 상품 상태를 'SELL'로 변경하는 API 호출
            console.log('Confirm response:', response); // 응답 확인
            setPendingItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId)); // 대기 중인 목록에서 제거
            await fetchItemList(); // 상태 변경 후 ItemList 갱신 (async 보장)
        } catch (error) {
            console.error('상품 상태 변경 중 오류 발생:', error);
        }
    };


    if (pendingItems.length === 0) {
        return <p>등록된 상품이 없습니다.</p>;
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-xl font-bold mb-4">상품 신청 내역</h2>
            <table className="w-full table-fixed border-t border-gray-300 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 text-center">번호</th>
                        <th className="p-2 text-center">카테고리</th>
                        <th className="p-2 text-center">가격</th>
                        <th className="p-2 text-center">상품명</th>
                        <th className="p-2 text-center">컨펌</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingItems.map((item, index) => (
                        <tr key={item.itemId} className="hover:bg-gray-100">
                            <td className="p-2 text-center">{index + 1}</td>
                            <td className="p-2 text-center">{item.itemCategory || 'N/A'}</td>
                            <td className="p-2 text-center">{item.itemPrice}</td>
                            <td className="p-2 text-center">{item.itemName}</td>
                            <td className="p-2 text-center">
                                <button
                                    onClick={() => handleConfirmItem(item.itemId)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    컨펌
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemConfirm;
