import React, { useEffect, useState } from 'react';
import { getPendingItems } from '../../api/adminAPI';

const ItemConfirm = () => {
    const [pendingItems, setPendingItems] = useState([]);

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

    return (
        <div>
            <h2 className="text-xl font-bold">상품 신청 내역</h2>
            {pendingItems.length === 0 ? (
                <p>등록된 상품이 없습니다.</p>
            ) : (
                <ul>
                    {pendingItems.map((item) => (
                        <li key={item.itemId}>
                            <p>상품명: {item.itemName}</p>
                            <p>가격: {item.itemPrice}</p>
                            {/* 필요한 항목 추가 */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemConfirm;
