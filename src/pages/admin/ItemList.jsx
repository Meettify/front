import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';
import useAuthStore from '../../stores/useAuthStore';

const ItemList = () => {
    const { user } = useAuthStore();  // 현재 사용자 정보 가져오기
    const { itemList, fetchAllItemsWithDetails, loading, error, addItem } = useAdminStore(); // 상태와 메서드 가져오기

    useEffect(() => {
        fetchAllItemsWithDetails();  // 컴포넌트 마운트 시 전체 상품 정보 가져오기
    }, [fetchAllItemsWithDetails]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!itemList || itemList.length === 0) return <p>등록된 상품이 없습니다.</p>;

    // 상품 등록 핸들러
    const handleAddItem = async () => {
        const newItemData = {
            itemName: '새로운 상품',
            itemPrice: 50000,
            itemDetails: '고품질 상품입니다.',
            itemCategory: 'SPORTS',
        };

        const files = []; // 필요한 경우 파일 배열 정의

        try {
            await addItem(newItemData, files);  // 상품 추가
            fetchAllItemsWithDetails();  // 상품 목록 새로 고침
        } catch (error) {
            console.error('상품 등록 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <h1>상품 목록</h1>

            {/* 상품 목록 테이블 */}
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">상품 번호</th>
                        <th className="border p-2">상품 카테고리</th>
                        <th className="border p-2">상품 가격</th>
                        <th className="border p-2">상품 이름</th>
                        <th className="border p-2">상품 수</th>
                        <th className="border p-2">상품 상태</th>
                        {user.role === 'ADMIN' && <th className="border p-2">작업</th>}
                    </tr>
                </thead>
                <tbody>
                    {itemList.map((item) => (
                        <tr key={item.itemId}>
                            <td className="border p-2">{item.itemId}</td>
                            <td className="border p-2">{item.itemCategory}</td>
                            <td className="border p-2">{item.itemPrice}</td>
                            <td className="border p-2">{item.itemName}</td>
                            <td className="border p-2">{item.itemCount}</td>
                            <td className="border p-2">{item.itemStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 상품 등록 버튼 */}
            {user.role === 'ADMIN' && (
                <button onClick={handleAddItem} className="mt-4">
                    상품 등록
                </button>
            )}
        </div>
    );
};

export default ItemList;
