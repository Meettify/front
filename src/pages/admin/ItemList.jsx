import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';

const ItemList = () => {
    const { itemList, fetchAllItemsWithDetails, loading, error } = useAdminStore();  // 모든 상품의 상세 정보 가져오기 추가

    useEffect(() => {
        fetchAllItemsWithDetails();  // 컴포넌트 마운트 시 모든 상품의 상세 정보 가져옴
    }, [fetchAllItemsWithDetails]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>상품 목록</h1>
            <ul>
                {itemList && itemList.length > 0 ? (
                    itemList.map((item) => (
                        <li key={item.itemId}>
                            <strong>상품명:</strong> {item.itemName}<br />
                            <strong>가격:</strong> {item.itemPrice}원<br />
                            <strong>재고 수량:</strong> {item.itemCount}<br />
                            <strong>카테고리:</strong> {item.itemCategory}<br />
                            <strong>상세 설명:</strong> {item.itemDetails}<br />
                            <strong>상태:</strong> {item.itemStatus}<br />
                            <strong>이미지:</strong> {item.images.length > 0 ? item.images.join(', ') : '없음'}<br />  {/* 이미지 목록 */}
                            <hr />
                        </li>
                    ))
                ) : (
                    <p>상품이 없습니다.</p>
                )}
            </ul>

            <Link to="/admin/itemAdd">
                <button>상품 등록</button>
            </Link>
        </div>
    );
};

export default ItemList;
